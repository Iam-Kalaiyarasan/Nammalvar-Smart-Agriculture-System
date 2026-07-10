from rest_framework import serializers
from .models import Cart
from marketplace.models import Product
from marketplace.serializers import ProductSerializer


class CartSerializer(serializers.ModelSerializer):

    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True
    )

    product_details = ProductSerializer(
        source="product",
        read_only=True
    )

    class Meta:

        model = Cart

        fields = [
            "id",
            "customer",
            "product",
            "product_details",
            "quantity",
            "added_at"
        ]