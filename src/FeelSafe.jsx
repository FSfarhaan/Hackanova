import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Phone, Bell, Shield, Users, Clock, AlertTriangle, Heart, Map, X } from 'lucide-react';
import axios from 'axios';

const FeelSafe = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const getCoordinates = async (place) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
      const data = await response.data;
      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      } else {
        console.error("Location not found:", place);
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const convertPlacesToCoords = async (start, end) => {
    console.log('Planning route from', start, 'to', end);
  
    const startCoords = await getCoordinates(start);
    const endCoords = await getCoordinates(end);
  
    if (startCoords && endCoords) {
      console.log(`Start Coordinates: Lat ${startCoords.latitude}, Lon ${startCoords.longitude}`);
      console.log(`End Coordinates: Lat ${endCoords.latitude}, Lon ${endCoords.longitude}`);

      localStorage.setItem("source", JSON.stringify({lat: startCoords.latitude, lng: startCoords.longitude}))
      localStorage.setItem("dest", JSON.stringify({lat: endCoords.latitude, lng: endCoords.longitude}))

      navigate('/maps');
      
    } else {
      console.log("Could not retrieve coordinates for one or both locations.");
    }
  };

  const handleSubmit = () => {
    // Handle route planning logic here
    console.log('Planning route from', start, 'to', end);
    convertPlacesToCoords(start, end);
    setIsOpen(false);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Fetch city name from Nominatim API
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              setCity(data.address.city || data.address.town || data.address.village || "Unknown Location");
            })
            .catch((error) => console.error("Error fetching city:", error));
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-8">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FeelSafe</h1>
                <p className="text-sm text-gray-600">Your Safety Companion</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/sos')}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency SOS</span>
              </button>
              <button
                onClick={handleGoBack}
                className="bg-gray-50 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-md"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
       {/* Main Action Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Share Location Card */}
  <button className="group relative flex flex-col items-center p-8 bg-white rounded-2xl hover:bg-blue-50 transition-all duration-300 border-2 border-transparent hover:border-blue-200 shadow-lg hover:shadow-xl">
    <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 p-2 rounded-full">
      <MapPin className="w-5 h-5" />
    </div>
    <div className="w-54 h-54 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
      <img src="/sharelocation.png" alt="Current Location" className="w-full h-full object-cover" />
    </div>
    <h2 className="text-xl font-semibold mt-4 text-gray-900">Check Current Location</h2>
    <p className="text-gray-600 text-center mt-2">Share your real-time location with trusted contacts</p>
  </button>

  {/* Plan Safe Travel Card */}
  <button
    onClick={() => setIsOpen(true)}
    className="group relative flex flex-col items-center p-8 bg-white rounded-2xl hover:bg-green-50 transition-all duration-300 border-2 border-transparent hover:border-green-200 shadow-lg hover:shadow-xl"
  >
    <div className="absolute top-4 right-4 bg-green-100 text-green-600 p-2 rounded-full">
      <Map className="w-5 h-5" />
    </div>
    <div className="w-200 h-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
      <img src="/image2.png" alt="Plan Safe Travel" className="w-full h-full object-cover" />
    </div>
    <h2 className="text-xl font-semibold mt-4 text-gray-900">Plan Safe Travel</h2>
    <p className="text-gray-600 text-center mt-2">Get safe route recommendations and travel tips</p>
  </button>
</div>
      


        {/* Safety Features Section */}
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Shield className="w-6 h-6 text-blue-600 mr-2" />
            Safety Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-md transition-shadow">
              <Shield className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Live Tracking</h3>
              <p className="text-sm text-gray-600">Real-time location sharing with trusted contacts</p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl hover:shadow-md transition-shadow">
              <Bell className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Safety Alerts</h3>
              <p className="text-sm text-gray-600">Get notified about nearby incidents</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-xl hover:shadow-md transition-shadow">
              <Map className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Safe Areas</h3>
              <p className="text-sm text-gray-600">Discover safe zones and emergency points</p>
            </div>
          </div>
        </section>

       
        {/* Route Planning Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Plan Your Route</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Location</label>
                  <input
                    type="text"
                    placeholder="Enter starting point"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Find Safe Routes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FeelSafe;