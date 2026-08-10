from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.models import Farmer
from marketplace.models import Product
from orders.models import Order


@api_view(["GET"])
def farmer_dashboard(request, pk):

    try:
        farmer = Farmer.objects.get(id=pk)
    except Farmer.DoesNotExist:
        return Response({
            "farmer_name": "Farmer",
            "total_products": Product.objects.count(),
            "total_orders": Order.objects.count(),
            "pending_orders": Order.objects.filter(status="Pending").count(),
            "delivered_orders": Order.objects.filter(status="Delivered").count(),
            "total_sales": Order.objects.aggregate(total=Sum("total_price"))["total"] or 0
        })


    products = Product.objects.filter(
        farmer=farmer
    )

    orders = Order.objects.filter(
        product__farmer=farmer
    )

    total_sales = orders.aggregate(
        total=Sum("total_price")
    )["total"] or 0

    return Response({

        "farmer_name": farmer.full_name,

        "total_products": products.count(),

        "total_orders": orders.count(),

        "pending_orders": orders.filter(
            status="Pending"
        ).count(),

        "delivered_orders": orders.filter(
            status="Delivered"
        ).count(),

        "total_sales": total_sales

    })