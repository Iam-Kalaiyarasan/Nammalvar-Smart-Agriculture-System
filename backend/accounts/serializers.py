from rest_framework import serializers
from .models import Farmer, Customer


class FarmerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farmer
        exclude = ["password"]


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        exclude = ["password"]