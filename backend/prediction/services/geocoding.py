import requests


class GeocodingService:

    @staticmethod
    def get_coordinates(city):

        url = "https://nominatim.openstreetmap.org/search"

        params = {
            "q": city,
            "format": "json",
            "limit": 1
        }

        headers = {
            "User-Agent": "Nammalvar-AI/1.0"
        }

        response = requests.get(
            url,
            params=params,
            headers=headers,
            timeout=10
        )

        if response.status_code != 200:
            return None

        data = response.json()

        if not data:
            return None

        return {
            "latitude": float(data[0]["lat"]),
            "longitude": float(data[0]["lon"])
        }