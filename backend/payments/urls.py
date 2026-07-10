from django.urls import path
from .views import make_payment

urlpatterns = [
    path("pay/", make_payment),
]