from rest_framework import serializers
from .models import Farmer, Customer


class FarmerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farmer
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
            "phone": {"required": False, "allow_blank": True},
            "address": {"required": False, "allow_blank": True},
        }


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True},
            "phone": {"required": False, "allow_blank": True},
            "address": {"required": False, "allow_blank": True},
        }