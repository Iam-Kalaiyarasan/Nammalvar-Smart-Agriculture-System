from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializer


@api_view(["GET"])
def get_products(request):

    products = Product.objects.all().order_by("-created_at")

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(["POST"])
def add_product(request):

    print("========== REQUEST DATA ==========")
    print(request.data)

    print("========== REQUEST FILES ==========")
    print(request.FILES)

    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    print(serializer.errors)

    return Response(serializer.errors, status=400)