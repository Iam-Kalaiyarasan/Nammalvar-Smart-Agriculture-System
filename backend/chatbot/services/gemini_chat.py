import os

from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Read API Key
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise Exception("GEMINI_API_KEY not found in .env file")

# Configure Gemini
genai.configure(api_key=API_KEY)

# Create Gemini Model
model = genai.GenerativeModel("gemini-2.5-flash")


class GeminiChatService:

    @staticmethod
    def ask(city, weather, crop, question):

        prompt = f"""
You are Nammalvar AI Assistant.

You are an agricultural expert.

Current Location:
{city}

Current Weather:
Temperature: {weather.get("temperature")} °C
Humidity: {weather.get("humidity")} %
Rainfall: {weather.get("rainfall")} mm
Wind Speed: {weather.get("wind_speed")} km/h
Pressure: {weather.get("pressure")} hPa

Recommended Crop:
{crop}

Farmer Question:
{question}

Instructions:
- Answer only agriculture-related questions.
- Use the weather and recommended crop as context.
- Keep the answer simple and practical.
- Do NOT use Markdown.
- Use plain English.

"""

        try:

            response = model.generate_content(prompt)

            if hasattr(response, "text") and response.text:
                return response.text.strip()

            return "Sorry, I couldn't generate an answer."

        except Exception as e:
            print("Gemini Error:", e)
            raise