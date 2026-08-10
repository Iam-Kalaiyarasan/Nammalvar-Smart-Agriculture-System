from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Farmer, Customer
from .serializers import FarmerSerializer, CustomerSerializer


@api_view(["POST"])
def farmer_register(request):

    data = request.data.copy()
    if "name" in data and "full_name" not in data:
        data["full_name"] = data["name"]
    if "phone" not in data or not data["phone"]:
        data["phone"] = "N/A"
    if "address" not in data or not data["address"]:
        data["address"] = "N/A"

    serializer = FarmerSerializer(data=data)

    if serializer.is_valid():
        farmer = serializer.save()
        return Response({
            "message": "Registration Successful",
            "id": farmer.id,
            "name": farmer.full_name
        }, status=201)

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def customer_register(request):

    data = request.data.copy()
    if "name" in data and "full_name" not in data:
        data["full_name"] = data["name"]
    if "phone" not in data or not data["phone"]:
        data["phone"] = "N/A"
    if "address" not in data or not data["address"]:
        data["address"] = "N/A"

    serializer = CustomerSerializer(data=data)

    if serializer.is_valid():
        customer = serializer.save()
        return Response({
            "message": "Registration Successful",
            "id": customer.id,
            "name": customer.full_name
        }, status=201)

    return Response(serializer.errors, status=400)



@api_view(["POST"])
def farmer_login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:

        farmer = Farmer.objects.get(
            email=email,
            password=password
        )

        return Response({
            "message": "Login Successful",
            "id": farmer.id,
            "name": farmer.full_name
        })

    except Farmer.DoesNotExist:

        return Response(
            {
                "error": "Invalid Credentials"
            },
            status=401
        )


@api_view(["POST"])
def customer_login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:

        customer = Customer.objects.get(
            email=email,
            password=password
        )

        return Response({
            "message": "Login Successful",
            "id": customer.id,
            "name": customer.full_name
        })

    except Customer.DoesNotExist:

        return Response(
            {
                "error": "Invalid Credentials"
            },
            status=401
        )


@api_view(["GET"])
def farmer_profile(request, pk):

    try:

        farmer = Farmer.objects.get(id=pk)

        serializer = FarmerSerializer(farmer)

        return Response(serializer.data)

    except Farmer.DoesNotExist:

        return Response(
            {"error": "Farmer not found"},
            status=404
        )


@api_view(["PUT"])
def update_farmer(request, pk):

    try:

        farmer = Farmer.objects.get(id=pk)

    except Farmer.DoesNotExist:

        return Response(
            {"error": "Farmer not found"},
            status=404
        )

    serializer = FarmerSerializer(
        farmer,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@api_view(["GET"])
def customer_profile(request, pk):

    try:

        customer = Customer.objects.get(id=pk)

        serializer = CustomerSerializer(customer)

        return Response(serializer.data)

    except Customer.DoesNotExist:

        return Response(
            {"error": "Customer not found"},
            status=404
        )


@api_view(["PUT"])
def update_customer(request, pk):

    try:

        customer = Customer.objects.get(id=pk)

    except Customer.DoesNotExist:

        return Response(
            {"error": "Customer not found"},
            status=404
        )

    serializer = CustomerSerializer(
        customer,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)