from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel
from typing import List, Optional

# Define user-agent headers globally
headers = {
    'User-Agent': 'TravelSafetyApp/1.0 (sakshi@example.com)'  # Replace with your email or project name
}

app = FastAPI()

class SafePlace(BaseModel):
    place: str
    name: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    message: Optional[str] = None

def get_city_coordinates(city: str):
    # Use Nominatim Geocoding API to get coordinates of the city
    url = f"https://nominatim.openstreetmap.org/search?format=json&q={city}"
    
    response = requests.get(url, headers=headers)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()

        if data:
            # Get the first result's latitude and longitude
            latitude = float(data[0]["lat"])
            longitude = float(data[0]["lon"])
            return latitude, longitude
        else:
            return None, None
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch city coordinates")

@app.get("/safe_places/{city}", response_model=List[SafePlace])
def get_safe_places(city: str):
    safe_places = [
        "police station", "fire station", "hospital", "ambulance", 
        "clinic", "pharmacy", "bus stop", "train station"
    ]
    
    # Get city coordinates dynamically
    latitude, longitude = get_city_coordinates(city)
    
    if latitude is None or longitude is None:
        raise HTTPException(status_code=404, detail=f"City {city} not found.")
    
    # Define the bounding box (a small area around the city)
    bounding_box = (longitude - 0.05, latitude - 0.05, longitude + 0.05, latitude + 0.05)
    
    result = []
    
    for place in safe_places:
        # Nominatim API request
        url = f"https://nominatim.openstreetmap.org/search?format=json&q={place}+{city}&bounded=1&viewbox={bounding_box[0]},{bounding_box[1]},{bounding_box[2]},{bounding_box[3]}"
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            data = response.json()

            if data:
                result.append(SafePlace(
                    place=place,
                    name=data[0].get("display_name"),
                    latitude=float(data[0].get("lat")),
                    longitude=float(data[0].get("lon"))
                ))
            else:
                result.append(SafePlace(
                    place=place,
                    message="No nearby location found"
                ))
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to fetch {place}")
    
    return result
