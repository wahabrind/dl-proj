from django.contrib import admin
from .models import Student , Attendance , Period
# Register your models here.

admin.site.register((Student , Attendance , Period))