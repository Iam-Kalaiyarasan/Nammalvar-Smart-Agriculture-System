from django.urls import path
from .views import farmer_dashboard

urlpatterns = [

    path(
        "farmer/<int:pk>/",
        farmer_dashboard
    ),

]