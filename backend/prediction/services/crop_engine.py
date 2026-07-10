def recommend_crop(weather, soil):

    humidity = weather["humidity"]
    rainfall = weather["rainfall"]
    temperature = weather["temperature"]

    soil_type = soil["soil_type"]

    if soil_type == "Red Loamy Soil":

        if humidity >= 65 and temperature <= 35:

            return {

                "crop": "Rice",

                "fertilizer": "NPK 10:26:26",

                "irrigation": "Medium",

                "expected_yield": "6 Tons/Hectare"

            }

        return {

            "crop": "Groundnut",

            "fertilizer": "DAP",

            "irrigation": "Low",

            "expected_yield": "3 Tons/Hectare"

        }

    elif soil_type == "Black Cotton Soil":

        return {

            "crop": "Cotton",

            "fertilizer": "Urea",

            "irrigation": "Medium",

            "expected_yield": "4 Tons/Hectare"

        }

    elif soil_type == "Alluvial Soil":

        return {

            "crop": "Sugarcane",

            "fertilizer": "NPK",

            "irrigation": "High",

            "expected_yield": "40 Tons/Hectare"

        }

    return {

        "crop": "Millet",

        "fertilizer": "Organic Compost",

        "irrigation": "Low",

        "expected_yield": "2 Tons/Hectare"

    }