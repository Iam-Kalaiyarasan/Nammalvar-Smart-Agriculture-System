import requests

from .weather_codes import WEATHER_CODES


class WeatherService:

    URL = "https://api.open-meteo.com/v1/forecast"

    @staticmethod
    def get_weather(latitude, longitude):

        params = {

            "latitude": latitude,

            "longitude": longitude,

            "current": ",".join([

                "temperature_2m",

                "relative_humidity_2m",

                "rain",

                "precipitation",

                "wind_speed_10m",

                "surface_pressure",

                "weather_code"

            ])

        }

        try:

            response = requests.get(
                WeatherService.URL,
                params=params,
                timeout=10
            )

            response.raise_for_status()

            current = response.json()["current"]

            return {

                "temperature": current.get("temperature_2m"),

                "humidity": current.get("relative_humidity_2m"),

                "rainfall": current.get("rain"),

                "precipitation": current.get("precipitation"),

                "wind_speed": current.get("wind_speed_10m"),

                "pressure": current.get("surface_pressure"),

                "weather": WEATHER_CODES.get(
                    current.get("weather_code"),
                    "Unknown"
                )

            }

        except Exception as e:

            print("Weather Error:", e)

            return None