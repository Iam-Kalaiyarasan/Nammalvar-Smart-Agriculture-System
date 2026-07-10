from django.urls import path
from .views import crop_prediction

urlpatterns = [
    path("crop/", crop_prediction),
]