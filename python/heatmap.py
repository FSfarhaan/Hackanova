from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import requests
from geopy.geocoders import Nominatim

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:5173"] for better security
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Define input schema
class RouteCoordinates(BaseModel):
    coordinates: List[List[float]]  # List of [longitude, latitude] pairs

# API Keys
GNEWS_API_KEY = "2818fe5d6e46d3e33a22533749316266"
OWM_API_KEY = "50977b5ae7d4544fa2fabd537b49c328"

def get_location_name(lat, lon):
    try:
        geolocator = Nominatim(user_agent="your_app_name")
        location = geolocator.reverse((lat, lon), exactly_one=True)
        if location and "address" in location.raw:
            return location.raw["address"].get("city", "Unknown")
        return "Unknown"
    except Exception as e:
        print(f"Error fetching location: {e}")
        return "Unknown"


def get_crime_data(lat, lon):
    location = get_location_name(lat, lon)
    url = f"https://gnews.io/api/v4/search?q={location}%20AND%20(crime)&lang=en&token={GNEWS_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an error if the request fails
        data = response.json()
        return min(data.get("totalArticles", 0), 100) / 100  # Normalize to 0-1 scale
    except Exception as e:
        print(f"Error fetching crime data: {e}")
        return 0  # Default to 0 risk if API fails


def get_weather_risk(lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OWM_API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if "weather" in data and data["weather"]:
            condition = data["weather"][0]["main"].lower()
            return 0.7 if condition in ["thunderstorm", "snow", "fog", "rain"] else (0.4 if condition in ["clouds", "mist"] else 0.1)
        return 0.2  # Default risk
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        return 0.2  # Default to 0.2 risk if API fails


@app.post("/route-safety-score")
def get_route_safety_score(route: RouteCoordinates):
    try:
        total_score = 0  
        scores = []
        for lon, lat in route.coordinates:
            crime_risk = get_crime_data(lat, lon)
            weather_risk = get_weather_risk(lat, lon)
            risk_score = (crime_risk * 0.6) + (weather_risk * 0.4)
            safety_score = round((1 - risk_score) * 100, 2)
            scores.append({"latitude": lat, "longitude": lon, "safety_score": safety_score})
            total_score += safety_score  
        
        average_safety_score = round(total_score / len(route.coordinates), 2) if route.coordinates else 0  

        return {
            "route_safety_scores": scores,
            "average_safety_score": average_safety_score
        }
    except Exception as e:
        print(f"Error processing request: {e}")
        return {"error": "Internal Server Error"}, 500
