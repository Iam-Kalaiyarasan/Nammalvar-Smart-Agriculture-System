from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services.gemini_chat import GeminiChatService


@api_view(["POST"])
def ask_chatbot(request):

    question = request.data.get("question")

    if not question:
        return Response(
            {"error": "Question is required"},
            status=400
        )

    try:

        answer = GeminiChatService.ask(question)

        return Response({
            "answer": answer
        })

    except Exception as e:

        return Response(
            {
                "error": str(e)
            },
            status=500
        )