import os
import json
from PIL import Image
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


class DiseaseDetectionService:

    @staticmethod
    def detect(image_path):

        image = Image.open(image_path)

        prompt = """
You are an expert agricultural scientist.

Analyze this crop leaf image.

Identify:

1. Crop Name
2. Disease Name (or Healthy)
3. Confidence (High/Medium/Low)
4. Symptoms
5. Causes
6. Treatment
7. Organic Treatment
8. Prevention

Return ONLY valid JSON.

{
  "crop":"",
  "disease":"",
  "confidence":"",
  "symptoms":"",
  "causes":"",
  "treatment":"",
  "organic_treatment":"",
  "prevention":""
}
"""

        response = model.generate_content(
            [prompt, image]
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        return json.loads(text)