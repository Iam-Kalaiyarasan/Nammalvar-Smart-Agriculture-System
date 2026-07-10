import os
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


class GeminiService:

    @staticmethod
    def recommend(city, weather):

        prompt = f"""
You are an experienced agricultural expert.

Location:
{city}

Current Weather
---------------
Temperature: {weather.get("temperature")} °C
Humidity: {weather.get("humidity")} %
Rainfall: {weather.get("rainfall")} mm
Wind Speed: {weather.get("wind_speed")} km/h
Pressure: {weather.get("pressure")} hPa
Weather Condition: {weather.get("weather")}

Using the location and weather, estimate the most likely soil characteristics and recommend crops suitable for Indian agriculture.

Return ONLY valid JSON in exactly this format:

{{
    "soil_type": "",
    "soil_ph": "",
    "nitrogen": "",
    "phosphorus": "",
    "potassium": "",
    "recommended_crop": "",
    "alternative_crops": [],
    "fertilizer": "",
    "irrigation": "",
    "expected_yield": "",
    "disease_risk": "",
    "confidence": "",
    "reason": ""
}}
"""

        response = model.generate_content(prompt)

        text = response.text.strip()

        # Remove Markdown code fences if Gemini returns them
        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        try:
            return json.loads(text)

        except json.JSONDecodeError:
            return {
                "soil_type": "Unknown",
                "soil_ph": "Unknown",
                "nitrogen": "Unknown",
                "phosphorus": "Unknown",
                "potassium": "Unknown",
                "recommended_crop": "Unknown",
                "alternative_crops": [],
                "fertilizer": "Unknown",
                "irrigation": "Unknown",
                "expected_yield": "Unknown",
                "disease_risk": "Unknown",
                "confidence": "0",
                "reason": text
            }