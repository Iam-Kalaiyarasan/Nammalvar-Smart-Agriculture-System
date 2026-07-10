from django.urls import path

from .views import (
    farmer_register,
    customer_register,
    farmer_login,
    customer_login,
    farmer_profile,
    customer_profile,
    update_farmer,
    update_customer,
)

urlpatterns = [

    # Register
    path(
        "farmer/register/",
        farmer_register
    ),

    path(
        "customer/register/",
        customer_register
    ),

    # Login
    path(
        "farmer/login/",
        farmer_login
    ),

    path(
        "customer/login/",
        customer_login
    ),

    # Profile
    path(
        "farmer/<int:pk>/",
        farmer_profile
    ),

    path(
        "customer/<int:pk>/",
        customer_profile
    ),

    # Update Profile
    path(
        "farmer/update/<int:pk>/",
        update_farmer
    ),

    path(
        "customer/update/<int:pk>/",
        update_customer
    ),

]