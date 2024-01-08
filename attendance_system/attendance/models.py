from django.db import models
from django_mysql.models import ListCharField
# Create your models here.

class Student(models.Model):
    name = models.CharField(blank=True , null=True, max_length=50)
    age = models.IntegerField(blank = True , null = True)
    student_class = models.IntegerField(blank = True , null = True)
    image = models.CharField(blank=True , null=True, max_length=500)
    email = models.CharField(blank=True , null=True, max_length=50)
    phone  = models.CharField(blank=True , null=True, max_length=50)

    def __str__(self):
        return self.name
 

class Period(models.Model):
    teacher_name = models.CharField(blank=True , null=True, max_length=50)
    period_name = models.CharField(blank=True , null=True, max_length=50)
    time_start = models.DateTimeField(null = True)
    time_end = models.DateTimeField(null = True)

class Attendance(models.Model):
    period = models.ForeignKey(Period,  on_delete=models.CASCADE)
    student = models.ForeignKey(Student,  on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add = True)
