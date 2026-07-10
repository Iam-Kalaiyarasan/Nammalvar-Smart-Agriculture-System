from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services.geocoding import GeocodingService
from .services.weather import WeatherService
from .services.gemini_service import GeminiService


@api_view(["POST"])
def crop_prediction(request):

    city = request.data.get("city")

    if not city:
        return Response(
            {"error": "City is required"},
            status=400
        )

    coordinates = GeocodingService.get_coordinates(city)

    if coordinates is None:
        return Response(
            {"error": "City not found"},
            status=404
        )

    weather = WeatherService.get_weather(
        coordinates["latitude"],
        coordinates["longitude"]
    )

    if weather is None:
        return Response(
            {"error": "Unable to fetch weather"},
            status=500
        )

    try:
        ai_result = GeminiService.recommend(
            city,
            weather
        )

    except Exception as e:
        return Response(
            {
                "error": "Gemini AI Error",
                "details": str(e)
            },
            status=500
        )

    return Response({
    "city": city.title(),
    "latitude": coordinates["latitude"],
    "longitude": coordinates["longitude"],
    **weather,
    **ai_result
})