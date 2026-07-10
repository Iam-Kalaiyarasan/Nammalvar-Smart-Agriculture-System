from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services.gemini_chat import GeminiChatService
import traceback


@api_view(["POST"])
def ask_chatbot(request):

    try:
        city = request.data.get("city")
        weather = request.data.get("weather", {})
        recommended_crop = request.data.get("recommended_crop")
        question = request.data.get("question")

        answer = GeminiChatService.ask(
            city,
            weather,
            recommended_crop,
            question
        )

        return Response({
            "answer": answer
        })

    except Exception as e:

        traceback.print_exc()   # <-- IMPORTANT

        return Response({
            "error": str(e)
        }, status=500)