from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Cart
from .serializers import CartSerializer


@api_view(["POST"])
def add_to_cart(request):

    customer = request.data.get("customer")
    product = request.data.get("product")
    quantity = int(request.data.get("quantity", 1))

    # Check if the product is already in the cart
    cart_item = Cart.objects.filter(
        customer_id=customer,
        product_id=product
    ).first()

    if cart_item:

        cart_item.quantity += quantity
        cart_item.save()

        serializer = CartSerializer(cart_item)

        return Response(serializer.data)

    serializer = CartSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@api_view(["GET"])
def get_cart(request):

    customer = request.GET.get("customer")

    cart = Cart.objects.filter(customer_id=customer)

    serializer = CartSerializer(cart, many=True)

    return Response(serializer.data)


@api_view(["DELETE"])
def remove_cart(request, pk):

    Cart.objects.filter(id=pk).delete()

    return Response(
        {
            "message": "Removed Successfully"
        }
    )