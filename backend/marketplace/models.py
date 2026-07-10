from django.db import models
from accounts.models import Farmer


class Product(models.Model):

    CATEGORY_CHOICES = [

        ("Cereals", "Cereals"),
        ("Vegetables", "Vegetables"),
        ("Fruits", "Fruits"),
        ("Pulses", "Pulses"),
        ("Oil Seeds", "Oil Seeds"),

    ]

    farmer = models.ForeignKey(
        Farmer,
        on_delete=models.CASCADE
    )

    crop_name = models.CharField(max_length=100)

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES
    )

    description = models.TextField()

    quantity = models.IntegerField()

    unit = models.CharField(
        max_length=20,
        default="Kg"
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    location = models.CharField(max_length=100)

    image = models.ImageField(
        upload_to="products/",
        blank=True,
        null=True
    )

    available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.crop_name