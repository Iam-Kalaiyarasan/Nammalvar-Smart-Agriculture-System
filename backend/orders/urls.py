from django.urls import path

from .views import *

urlpatterns = [

    path(
        "create/",
        create_order
    ),

    path(
        "customer/<int:customer_id>/",
        customer_orders
    ),

    path(
        "farmer/<int:farmer_id>/",
        farmer_orders
    ),

    path(
        "update/<int:order_id>/",
        update_order_status
    ),

]