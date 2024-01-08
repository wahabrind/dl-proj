from cv2 import data
from django.shortcuts import render
import cv2
import numpy as np
from django.http import StreamingHttpResponse
from attendance.camera import VideoCamera
import cv2
from PIL import Image
import numpy as np
# import face_recognition
from django.core.files.storage import default_storage
from .models import Student , Period , Attendance
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt




cascade = cv2.CascadeClassifier("../model_traing/haarcascade_frontalface_default.xml")

def index(request):
	data = {}
	students = Student.objects.all().order_by('id')

	data['data'] = students
	return render(request , 'all_students.html' , data)

def gen(camera):
	while True:
		frame = camera.get_frame()
		yield (b'--frame\r\n'
				b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

def video_feed(request):
	id = request.session['period_id']
	return StreamingHttpResponse(gen(VideoCamera(id)),content_type='multipart/x-mixed-replace; boundary=frame')

def menu(request):
    return render(request , 'menu.html')


def register_student(request):
	# print(request.session['name'] ,'nameee')
	if request.method =="POST":
		name = request.POST.get('name')
		student_class = request.POST.get('class')
		age = request.POST.get('age')
		image = request.FILES['image']
		img = Image.open(image)
		img = np.array(img)
		img = cv2.resize(img,(224,224))
		# img = cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)

		gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

		fs = default_storage
		filename = fs.save('students/' + f'{name}.{student_class}_age_{age}.jpg', image)
		uploaded_file_url = fs.url(filename)

		print(uploaded_file_url)
		faces = cascade.detectMultiScale(gray,1.3,10)
		print(faces)
		try:
			a= faces[0]
			print('face detected')
		except:
			print('face not detected')

		obj = Student(name = name , student_class=  student_class , age = age , image = uploaded_file_url)
		obj.save()
		print(name , age , student_class)
	return render(request , 'register_student.html')

def periods(request):
	data={}
	periods = Period.objects.all().order_by('time_start')

	data['periods'] = periods

	return render(request , 'all_periods.html' , data)

@csrf_exempt
def mark_attendance(request):
	data = {}
	if request.method == "POST":
		period = request.POST.get('period')
		name = request.POST.get('name')

		obj = Period()
		obj.period_name = period
		obj.teacher_name = name
		obj.time_start = timezone.now()

		obj.save()

		request.session['period_id'] = obj.id
		data['time'] = timezone.now()
		data['period'] = period
		data['name'] = name
		data['id'] = obj.id
		print(obj.id , 'hereeeee')
		return render(request , 'mark_attendance.html' , data)


    # return render(request , 'menu.html')


def add_period(request):
	
    return render(request , 'add_period.html')

@csrf_exempt
def end_period(request):
	data = {}
	if request.method == "POST":
		id = request.POST.get('id')
		print(id , 'hereeeee')
		obj = Period.objects.get(id=id)
		obj.end_time = timezone.now()
		obj.save()

		attendances = Attendance.objects.filter(period_id = obj.id)
		print(attendances)

		data['attendances']	= 	attendances
		return render(request , 'end_period.html' , data)


@csrf_exempt
def all_attendances(request , id):
	data = {}
	attendances = Attendance.objects.filter(period_id = id)
	print(attendances)

	data['attendances']	= 	attendances
	return render(request , 'all_attendances.html' , data)
