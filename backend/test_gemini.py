from prediction.services.gemini_service import GeminiService

weather = {
    "temperature": 31,
    "humidity": 76,
    "rainfall": 10,
    "wind_speed": 15,
    "pressure": 1012,
    "weather": "Clear Sky"
}

soil = {
    "soil_type": "Red Loamy Soil",
    "soil_ph": 6.8,
    "nitrogen": "Medium",
    "phosphorus": "Medium",
    "potassium": "High"
}

result = GeminiService.recommend(weather, soil)

print(result)