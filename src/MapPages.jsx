import React, { useState } from 'react';
import { MoreHorizontal, Plus, Minus } from 'lucide-react';
import SafeMap from './MapComponent';

const MapsTest = () => {
    const [source, setSource] = useState({ lat: 19.1551, lng: 72.9982 });
  const [destination, setDestination] = useState({ lat: 19.2183, lng: 72.9781 });
  const [safetyData, setSafetyData] = useState([{ safetyScore: 1}, { safetyScore: 10}]);
//   const heatmapData = [
//     { lat: 19.0760, lng: 72.8777, intensity: 5 },  // Mumbai city center
//     { lat: 19.0896, lng: 72.8656, intensity: 7 },  // Andheri
//     { lat: 19.0176, lng: 72.8562, intensity: 3 },  // Dadar
//     { lat: 19.2288, lng: 72.8546, intensity: 6 },  // Borivali
//     { lat: 18.9647, lng: 72.8258, intensity: 4 },  // Colaba
//     { lat: 19.2086, lng: 72.8347, intensity: 8 },  // Malad
//     { lat: 19.1867, lng: 72.8484, intensity: 5 },  // Goregaon
//     { lat: 19.1230, lng: 72.8370, intensity: 2 },  // Juhu
//     { lat: 19.0428, lng: 72.8206, intensity: 6 },  // Worli
//     { lat: 18.9894, lng: 72.8235, intensity: 3 }   // Cuffe Parade
//   ];
  

  return (
    <div className='h-screen w-screen'>
        <div className="h-full w-full" style={{zIndex: 1}}>
            <SafeMap source={source} destination={destination}/>
        </div>

        <div className="absolute p-8 top-0 right-0 w-1/3 h-screen z-10">
            <div className="bg-white h-full w-full rounded-lg shadow border-2">
              
            </div>
        </div>
    </div>
  );
};

export default MapsTest;