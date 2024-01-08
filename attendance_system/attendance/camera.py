from imutils.video import VideoStream
import imutils
import cv2,os,urllib.request
import numpy as np
from django.conf import settings
# import tensorflow as tf
import time
# import face_recognition
import glob
from .models import  Student , Period , Attendance
from django.db.models import Q

import cv2
import matplotlib.pyplot as plt
import os
import random
from transformers import AutoFeatureExtractor, AutoModel
import torchvision.transforms as T
from PIL import Image
import torch

# model = tf.keras.models.load_model('../model_traing/custom_face_mask.h5')
color_label = {0: (0,255,0),1 : (0,0,255)}
cascade = cv2.CascadeClassifier("static/haarcascade_frontalface_default.xml")

known_face_encodings = []
known_face_names=[]

# for filename in glob.glob

print(known_face_names)

model_ckpt = "D:\\work\\vit_training\\vit-base-patch16-224-in21k-finetuned-eurosat\\checkpoint-12886-finetuned-eurosat\\checkpoint-12885"
model_ckpt = "D:\\work\\vit_training\\vit-base-patch16-224-in21k-finetuned-eurosat\\checkpoint-12886"
extractor = AutoFeatureExtractor.from_pretrained(model_ckpt)
model = AutoModel.from_pretrained(model_ckpt)
hidden_dim = model.config.hidden_size

device = "cuda" if torch.cuda.is_available() else "cpu"
model = model.to(device)



transformation_chain = T.Compose(
        [
            # We first resize the input image to 256x256 and then we take center crop.

            T.Resize((extractor.size['height'], extractor.size['width'])),
            T.CenterCrop(extractor.size["height"]),
            T.Grayscale(num_output_channels=3),
            T.ToTensor(),
            T.Lambda(lambda x: x[:3, :, :]),
            T.Normalize(mean=extractor.image_mean[:3], std=extractor.image_std[:3]),
        ]
    )

def compute_scores(emb_one, emb_two):
    """Computes cosine similarity between two vectors."""
    scores = torch.nn.functional.cosine_similarity(emb_one, emb_two)
    # print(scores)
    return scores.numpy().tolist()[0]

def create_embeddings(image):
    """Fetches the `top_k` similar images with `image` as the query."""
    # Prepare the input query image for embedding computation.
    image_transformed = transformation_chain(image).unsqueeze(0)
    new_batch = {"pixel_values": image_transformed.to(device)}

    # Comute the embedding.
    with torch.no_grad():
        query_embeddings = model(**new_batch).last_hidden_state[:, 0].cpu()
    return query_embeddings


def compare_two_embeddings(embedding1 , embedding2):
    return compute_scores(embedding1, embedding2)


def fetch_similar( all_embeddings , query_embeddings):

    index_of_similar_images =[]
    for i,initial_embedding in enumerate(all_embeddings):
        # print(initial_embedding.shape, query_embeddings.unsqueeze(0).shape)
        sim_scores = compute_scores(initial_embedding, query_embeddings.unsqueeze(0))
        print(sim_scores , )
        if sim_scores > 0.45:
            # index_of_similar_images.append(sim_scores)
            index_of_similar_images.append(True)
        else:
            index_of_similar_images.append(False)
    return index_of_similar_images


class VideoCamera(object):
    def __init__(self  , id):
        self.video = cv2.VideoCapture(0 ,  cv2.CAP_DSHOW)
        self.frames=0
        self.face_check_count = 0
        self.period = Period.objects.get(id=id)

        self.known_face_encodings = []
        self.known_face_names=[]


        for filename in glob.glob('media/students/*'): #assuming gif
            image = cv2.imread(filename)
            image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
            embeddings = create_embeddings(image)
            self.known_face_encodings.append(embeddings)
            self.known_face_names.append(filename.split('\\')[1].split('.')[0])


    def __del__(self):
        self.video.release()


    def get_frame(self):    
        success,image = self.video.read()
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # cv2.imshow('a' , gray)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
        faces = cascade.detectMultiScale(gray,1.3,10)
        name= ''

        for x,y,w,h in faces:
            face_image = image[y:y+h,x:x+w]

            final_image = Image.fromarray(cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB))
            cv2.rectangle(image,(x,y),(x+w,y+h),color_label[0],3)
            # face_encodings = face_recognition.face_encodings(image, [(y,x+w,y+h,x)])
            face_encodings = create_embeddings(final_image)
            face_names = []
            font = cv2.FONT_HERSHEY_DUPLEX


            for face_encoding in face_encodings:
                # matches = face_recognition.compare_faces(self.known_face_encodings, face_encoding)
                matches = fetch_similar(self.known_face_encodings, face_encoding)
                name = "Unknown"
            
                if True in matches:
                    first_match_index = matches.index(True)
                    name = self.known_face_names[first_match_index]
                    self.face_check_count += 1
                if True in matches and self.face_check_count ==5 :
                    if not Attendance.objects.filter(Q(student__name = self.known_face_names[first_match_index]) & Q(period = self.period) ).exists():
                        obj = Attendance()
                        obj.student = Student.objects.get(name= self.known_face_names[first_match_index])
                        obj.period = self.period
                        obj.save()    
                    cv2.putText(image, 'attendance marked', ( 6, 100), font, 1.0, (0, 255, 255), 1)
                    self.face_check_count = 0
                face_names.append(name)

                cv2.putText(image, name, (x + 6, y+h - 6), font, 1.0, (255, 255, 255), 1)
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

