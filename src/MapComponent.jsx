import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import axios from "axios";
import HeatmapLayer from "./HeatmapLayers";

// Component to adjust the map to fit the route
const AdjustMapView = ({ routes }) => {
  const map = useMap();
  useEffect(() => {
    if (routes?.length > 0) {
      const allCoords = routes.flatMap(route =>
        route.geometry.coordinates.map(coord => [coord[1], coord[0]])
      );
      map.fitBounds(allCoords);
    }
  }, [routes, map]);
  return null;
};

export default function SafeMap({ source, destination }) {
  const [routes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [avgScores, setAvgScores] = useState([]);

  const getRouteColor = (index) => {
    const score = avgScores[index]?.safetyScore;
    if (score >= 8) return "green"; // Safe
    if (score >= 5) return "orange"; // Moderate
    return "red"; // Unsafe
  };

  useEffect(() => {
    if (!source || !destination) return;

    const getRoute = async (src, dest) => {
      try {
        const url = `https://router.project-osrm.org/route/v1/walking/${src.lng},${src.lat};${dest.lng},${dest.lat}?alternatives=true&overview=simplified&geometries=geojson`;
        const response = await axios.get(url);

        const length = response.data.routes[0].geometry.coordinates.length;
        let newArr = [];
        let step = Math.floor(length / 10);
        for (let i = 0; i < 10; i++) {
          let index = i * step;
          if (index < length) newArr.push(response.data.routes[0].geometry.coordinates[index]);
        }
        setSelectedRoutes(newArr);
        console.log(response.data);

        return response.data.routes;
      } catch (error) {
        console.error("Error fetching route:", error);
        return [];
      }
    };

    const fetchRoutes = async () => {
      const fetchedRoutes = await getRoute(source, destination);
      if (fetchedRoutes.length <= 1) {
        console.warn("No alternative routes found. Using fallback.");
        const modifiedDestination = { lat: destination.lat + 0.01, lng: destination.lng + 0.01 };
        const fallbackRoutes = await getRoute(source, modifiedDestination);
        setRoutes([...fetchedRoutes, ...fallbackRoutes]);
      } else {
        setRoutes(fetchedRoutes);
      }
    };

    fetchRoutes();
  }, [source, destination]);

  useEffect(() => {
    if (selectedRoutes.length === 0) return;
    const getScores = async () => {
      try {
        const response = await axios.post("http://localhost:8000/route-safety-score", { coordinates: selectedRoutes });
        setHeatmapData(response.data.route_safety_scores);
        console.log(response.data.route_safety_scores);
        console.log(response.data.average_safety_score);
        setAvgScores((prev) =>  [...prev, response.data.average_safety_score]);
      } catch (error) {
        console.error("Error fetching safety scores:", error);
      }
    };
    getScores();
  }, [selectedRoutes]);

  const midpoint = routes.length > 0
    ? [routes[0].geometry.coordinates[Math.floor(routes[0].geometry.coordinates.length / 2)][1],
       routes[0].geometry.coordinates[Math.floor(routes[0].geometry.coordinates.length / 2)][0]]
    : [source.lat, source.lng];

  return (
    <MapContainer center={midpoint} zoom={15} style={{ height: "100vh", width: "100vw", zIndex: 1 }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <AdjustMapView routes={routes} />
      <HeatmapLayer heatmapData={heatmapData} />

      <Marker position={[source.lat, source.lng]}><Popup>Source Location</Popup></Marker>
      <Marker position={[destination.lat, destination.lng]}><Popup>Destination Location</Popup></Marker>

      {routes.map((route, index) => (
        <Polyline key={index} positions={route.geometry.coordinates.map(coord => [coord[1], coord[0]])} color={getRouteColor(index)} />
      ))}
    </MapContainer>
  );
}
