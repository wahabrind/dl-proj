
import os
import random
import shutil

def custom_train_test_split(data_folder, test_size=0.2, random_seed=42):
    random.seed(random_seed)
    
    classes = os.listdir(data_folder)
    
    for class_name in classes:
        class_folder = os.path.join(data_folder, class_name)
        if os.path.isdir(class_folder):
            images = [f for f in os.listdir(class_folder) if f.endswith(('.jpg', '.jpeg', '.png'))]
            
            # Shuffle the images randomly
            random.shuffle(images)
            
            # Calculate the number of images for the test set
            num_test_images = int(len(images) * test_size)
            
            # Create train and test folders
            train_folder = os.path.join(data_folder, 'train', class_name)
            test_folder = os.path.join(data_folder, 'test', class_name)
            
            os.makedirs(train_folder, exist_ok=True)
            os.makedirs(test_folder, exist_ok=True)
            
            # Move images to their respective folders
            for i, image in enumerate(images):
                src_path = os.path.join(class_folder, image)
                if i < num_test_images:
                    dest_path = os.path.join(test_folder, image)
                else:
                    dest_path = os.path.join(train_folder, image)
                shutil.move(src_path, dest_path)

if __name__ == "__main__":
    data_folder =  "C:/Users/Pc/Downloads/face_dataset/img_align_celeba_new"
    custom_train_test_split(data_folder)
