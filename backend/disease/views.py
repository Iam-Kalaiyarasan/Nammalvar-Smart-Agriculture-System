import tempfile

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services.gemini_disease import DiseaseDetectionService


@api_view(["POST"])
def detect_disease(request):

    image = request.FILES.get("image")

    if not image:
        return Response(
            {
                "error": "No image uploaded"
            },
            status=400
        )

    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp:

        for chunk in image.chunks():
            temp.write(chunk)

        temp_path = temp.name

    try:

        result = DiseaseDetectionService.detect(temp_path)

        return Response(result)

    except Exception as e:

        return Response(
            {
                "error": str(e)
            },
            status=500
        )