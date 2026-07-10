from django.urls import path
from .views import *

urlpatterns = [

    path(
        "add/",
        add_to_cart
    ),

    path(
        "list/",
        get_cart
    ),

    path(
        "delete/<int:pk>/",
        remove_cart
    )

]