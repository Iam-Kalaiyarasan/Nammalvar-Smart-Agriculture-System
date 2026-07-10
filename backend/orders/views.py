from django.db.models import F
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer

from marketplace.models import Product


@api_view(["POST"])
def create_order(request):

    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():

        order = serializer.save()

        product = order.product

        if product.quantity < order.quantity:

            return Response(
                {
                    "error": "Not enough stock"
                },
                status=400
            )

        product.quantity = F("quantity") - order.quantity

        product.save()

        product.refresh_from_db()

        if product.quantity == 0:

            product.available = False

            product.save()

        return Response({

            "message": "Order Created Successfully",

            "order": OrderSerializer(order).data

        })

    return Response(serializer.errors, status=400)


@api_view(["GET"])
def customer_orders(request, customer_id):

    orders = Order.objects.filter(
        customer_id=customer_id
    ).order_by("-ordered_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def farmer_orders(request, farmer_id):

    orders = Order.objects.filter(
        product__farmer_id=farmer_id
    ).order_by("-ordered_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)


@api_view(["PUT"])
def update_order_status(request, order_id):

    try:

        order = Order.objects.get(id=order_id)

    except Order.DoesNotExist:

        return Response(
            {
                "error": "Order Not Found"
            },
            status=404
        )

    order.status = request.data.get(
        "status",
        order.status
    )

    order.save()

    return Response(
        OrderSerializer(order).data
    )