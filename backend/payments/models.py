from django.db import models
from accounts.models import Customer


class Payment(models.Model):

    PAYMENT_METHODS = [
        ("UPI", "UPI"),
        ("CARD", "Card"),
        ("COD", "Cash On Delivery"),
    ]

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS
    )

    payment_status = models.CharField(
        max_length=20,
        default="Success"
    )

    transaction_id = models.CharField(
        max_length=100,
        unique=True
    )

    paid_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.transaction_id