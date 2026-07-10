from prediction.services.geocoding import GeocodingService

result = GeocodingService.get_coordinates("Chennai")

print(result)