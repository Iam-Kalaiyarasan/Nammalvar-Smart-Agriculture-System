from django.db import models
from accounts.models import Customer
from marketplace.models import Product


class Order(models.Model):

    ORDER_STATUS = [

        ("Pending", "Pending"),
        ("Accepted", "Accepted"),
        ("Packed", "Packed"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),
        ("Cancelled", "Cancelled"),

    ]

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=ORDER_STATUS,
        default="Pending"
    )

    ordered_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"Order #{self.id} - {self.product.crop_name}"