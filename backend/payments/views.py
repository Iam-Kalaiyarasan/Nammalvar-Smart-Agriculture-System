import uuid

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Payment
from .serializers import PaymentSerializer


@api_view(["POST"])
def make_payment(request):

    data = request.data.copy()

    data["transaction_id"] = str(uuid.uuid4())

    serializer = PaymentSerializer(data=data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)
