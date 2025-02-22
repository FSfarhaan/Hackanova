import React, { useState, useEffect } from 'react';
import { Phone, AlertTriangle, MapPin, Shield, Plus, Trash, Navigation, Share2 } from 'lucide-react';

const EmergencySOS = () => {
  const [isEmergency, setIsEmergency] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    getCurrentLocation();
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Error getting place name:', error);
      return 'Unknown location';
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const address = await getPlaceName(position.coords.latitude, position.coords.longitude);
        setPlaceName(address);
        
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
          address: address,
          googleMapsUrl: `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
        });
        setLocationError('');
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        console.error('Error getting location:', error);
      }
    );
  };

  const shareLocationViaWhatsApp = async (contact, location) => {
    const message = `🆘 My current location:\n📍 ${location.address}\n🔗 Track me here: ${location.googleMapsUrl}`;
    const whatsappUrl = `https://wa.me/${contact.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const startLocationSharing = () => {
    if (contacts.length === 0) {
      alert('Please add at least one emergency contact first');
      return;
    }

    locationWatchId = navigator.geolocation.watchPosition(
      async (position) => {
        const address = await getPlaceName(position.coords.latitude, position.coords.longitude);
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
          address: address,
          googleMapsUrl: `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
        };
        setCurrentLocation(newLocation);
        
        // Share with all contacts via WhatsApp
        contacts.forEach(contact => shareLocationViaWhatsApp(contact, newLocation));
      },
      (error) => {
        setLocationError('Error tracking location');
        console.error('Location tracking error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  let locationWatchId = null;

  const stopLocationSharing = () => {
    if (locationWatchId) {
      navigator.geolocation.clearWatch(locationWatchId);
      setIsSharing(false);
    }
  };

  const handleEmergencyActivation = () => {
    setIsEmergency(true);
    if (currentLocation) {
      contacts.forEach(contact => shareLocationViaWhatsApp(contact, currentLocation));
    }
    startLocationSharing();
  };

  const addContact = () => {
    if (newContactName.trim() && newContactNumber.trim()) {
      // Format number for WhatsApp (remove spaces, dashes, etc.)
      const formattedNumber = newContactNumber.replace(/[^0-9+]/g, '');
      setContacts([...contacts, { name: newContactName, number: formattedNumber }]);
      setNewContactName('');
      setNewContactNumber('');
    }
  };

  const removeContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const handleShareCurrentLocation = async () => {
    if (currentLocation) {
      contacts.forEach(contact => shareLocationViaWhatsApp(contact, currentLocation));
    } else {
      alert('Waiting for location data...');
      getCurrentLocation();
    }
  };

  // Handle page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isSharing) {
        stopLocationSharing();
      } else if (!document.hidden && isSharing) {
        startLocationSharing();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopLocationSharing();
    };
  }, [isSharing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <header className="bg-white-600 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Emergency SOS</h1>
          <button
            onClick={() => window.history.back()}
            className="bg-white text-white-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-center mb-12">
          <button
            onClick={handleEmergencyActivation}
            className={`w-3/4 md:w-1/2 p-6 rounded-xl transition-all ${
              isEmergency ? 'bg-red-700 animate-pulse text-white' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="w-16 h-16" />
              <h2 className="text-2xl font-bold">{isEmergency ? 'Emergency Activated!' : 'Tap for Emergency'}</h2>
              <p className="opacity-80">{isEmergency ? 'Help is on the way!' : 'Instantly alert emergency contacts'}</p>
            </div>
          </button>
        </div>

        <div className="mt-12 bg-white p-6 rounded-xl">
          <h3 className="text-2xl font-semibold flex items-center mb-4">
            <Phone className="w-6 h-6 text-red-600 mr-2" />
            Emergency Contacts
          </h3>

          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Contact Name"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone Number (with country code)"
              value={newContactNumber}
              onChange={(e) => setNewContactNumber(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <button onClick={addContact} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus />
            </button>
          </div>

          {contacts.length > 0 ? (
            <div className="space-y-2">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.number}</p>
                  </div>
                  <button onClick={() => removeContact(index)} className="text-red-600 hover:text-red-800">
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No emergency contacts added yet.</p>
          )}
        </div>

        <div className="mt-12 bg-white p-6 rounded-xl">
          <h3 className="text-2xl font-semibold flex items-center mb-4">
            <MapPin className="w-6 h-6 text-green-600 mr-2" />
            Location Services
          </h3>
          
          {locationError ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
              {locationError}
            </div>
          ) : currentLocation ? (
            <div className="p-4 bg-green-50 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">Current Location</p>
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">
                📍 {currentLocation.address}
              </p>
              <p className="text-sm text-gray-600">
                Last updated: {new Date(currentLocation.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p>Fetching location...</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <button 
              onClick={handleShareCurrentLocation}
              className="p-4 rounded-lg flex items-center justify-center space-x-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share on WhatsApp</span>
            </button>

            <button 
              onClick={() => {
                if (isSharing) {
                  stopLocationSharing();
                } else {
                  startLocationSharing();
                  setIsSharing(true);
                }
              }}
              className={`p-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                isSharing 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Navigation className="w-5 h-5" />
              <span>{isSharing ? 'Stop Live Sharing' : 'Start Live Sharing'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySOS;