from django.views.generic import TemplateView

from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [

        path('', views.index, name="all_students"),
        path('video_feed', views.video_feed, name="video_feed"),
        path('menu', views.menu, name="menu"),
        path('register_student', views.register_student, name="register_student"),
        path('periods', views.periods, name="periods"),
        path('add_period', views.add_period, name="add_period"),
        path('end_period', views.end_period, name="end_period"),
        path('mark_attendance', views.mark_attendance, name="mark_attendance"),
        path('all_attendances/<str:id>', views.all_attendances, name="all_attendances"),
        
]
