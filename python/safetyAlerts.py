from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()

# GNews API Key (Replace with your actual API key)
GNEWS_API_KEY = "2818fe5d6e46d3e33a22533749316266"

# Request models
class LocationRequest(BaseModel):
    location: str

class CoordinatesRequest(BaseModel):
    latitude: float
    longitude: float

# Fetch recent incident from GNews API
@app.post("/get_incident")
async def get_incident(request: LocationRequest):
    location = request.location
    url = f"https://gnews.io/api/v4/search?q={location}&lang=en&token={GNEWS_API_KEY}"
    
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch news")

    news_data = response.json().get("articles", [])
    
    if not news_data:
        raise HTTPException(status_code=404, detail="No recent incidents found")

    latest_incident = news_data[0]  # First article is the most recent one

    return {
        "title": latest_incident["title"],
        "description": latest_incident["description"],
        "source": latest_incident["source"]["name"],
        "url": latest_incident["url"],
        "published_at": latest_incident["publishedAt"]
    }

# Run the FastAPI server
if __name__ == "_main_":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)