import React, { useEffect, useState } from 'react';
import SafeMap from './MapComponent';

const MapPage = () => {
    const [source, setSource] = useState({ });
    const [destination, setDestination] = useState({ });

    useEffect(() => {
        const source = JSON.parse(localStorage.getItem("source"));
        const dest = JSON.parse(localStorage.getItem("dest"));
        if(source && dest) {
            setSource({lat: source.lat, lng: source.lng});
            setDestination({lat: dest.lat, lng: dest.lng});
        }
    }, [])
    
  const [safetyData, setSafetyData] = useState([{ safetyScore: 1}, { safetyScore: 10}]);

  return (
    <div className='h-screen w-screen'>
        <div className="h-full w-full" style={{zIndex: 1}}>
            {source && destination && <SafeMap source={source} destination={destination} safetyData={safetyData}/>}
        </div>

        <div className="absolute p-8 top-0 right-0 w-1/3 h-screen z-10">
            <div className="bg-white h-full w-full rounded-lg shadow border-2"></div>
        </div>
    </div>
  );
};

export default MapPage;