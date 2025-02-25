import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import axios from "axios";
import HeatmapLayer from "./HeatmapLayers";

// Component to adjust the map to fit all routes
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

export default function MapComponent() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [avgScores, setAvgScores] = useState([]);

  const getRouteColor = (score) => {
    if (score >= 8) return "green";
    if (score >= 5) return "orange";
    return "red";
  };

  useEffect(() => {
    const storedSource = JSON.parse(localStorage.getItem("source"));
    const storedDest = JSON.parse(localStorage.getItem("dest"));
    setSource(storedSource);
    setDestination(storedDest);
  }, []);

  useEffect(() => {
    if (!source || !destination) return;

    const getRoute = async (src, dest) => {
      try {
        const url = `https://router.project-osrm.org/route/v1/walking/${src.lng},${src.lat};${dest.lng},${dest.lat}?alternatives=true&overview=simplified&geometries=geojson`;
        const response = await axios.get(url);
        return response.data.routes;
      } catch (error) {
        console.error("Error fetching route:", error);
        return [];
      }
    };

    const fetchRoutes = async () => {
      const fetchedRoutes = await getRoute(source, destination);
      if (fetchedRoutes.length === 0) {
        console.warn("No alternative routes found. Using fallback.");
        const modifiedDestination = { lat: destination.lat + 0.01, lng: destination.lng + 0.01 };
        const fallbackRoutes = await getRoute(source, modifiedDestination);
        setRoutes(fallbackRoutes);
      } else {
        setRoutes(fetchedRoutes);
      }
    };

    fetchRoutes();
  }, [source, destination]);

  useEffect(() => {
    if (routes.length === 0) return;

    const fetchSafetyScores = async () => {
      const routeHeatmapData = [];
      const routeAvgScores = [];

      for (const route of routes) {
        try {
          const step = Math.floor(route.geometry.coordinates.length / 10);
          const selectedCoords = route.geometry.coordinates.filter((_, index) => index % step === 0);
          const response = await axios.post("http://localhost:8000/route-safety-score", { coordinates: selectedCoords });
          routeHeatmapData.push(response.data.route_safety_scores);
          routeAvgScores.push(response.data.average_safety_score);
        } catch (error) {
          console.error("Error fetching safety scores:", error);
          routeHeatmapData.push([]);
          routeAvgScores.push({ safetyScore: 0 });
        }
      }
      setHeatmapData(routeHeatmapData);
      setAvgScores(routeAvgScores);
    };

    fetchSafetyScores();
  }, [routes]);

  const midpoint = (routes.length > 0 && routes[0].geometry.coordinates.length > 0)
    ? [
        routes[0].geometry.coordinates[Math.floor(routes[0].geometry.coordinates.length / 2)][1],
        routes[0].geometry.coordinates[Math.floor(routes[0].geometry.coordinates.length / 2)][0]
      ]
    : [source?.lat || 0, source?.lng || 0];

  return (
    <MapContainer center={midpoint} zoom={15} style={{ height: "100vh", width: "100vw", zIndex: 1 }}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <AdjustMapView routes={routes} />
      {heatmapData.map((data, index) => (
        <HeatmapLayer key={index} heatmapData={data} />
      ))}

      {source && <Marker position={[source.lat, source.lng]}><Popup>Source Location</Popup></Marker>}
      {destination && <Marker position={[destination.lat, destination.lng]}><Popup>Destination Location</Popup></Marker>}

      {routes.map((route, index) => (
        <Polyline
          key={index}
          positions={route.geometry.coordinates.map(coord => [coord[1], coord[0]])}
          color={getRouteColor(avgScores[index]?.safetyScore || 0)}
        />
      ))}
    </MapContainer>
  );
}
