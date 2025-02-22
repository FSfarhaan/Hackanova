import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

const HeatmapLayer = ({ heatmapData }) => {
  const map = useMap(); // Get Leaflet map instance

  useEffect(() => {
    if (!map || !heatmapData || heatmapData.length === 0) return;

    // Convert heatmapData to [[lat, lng, intensity], ...]
    const heatPoints = heatmapData.map(({ latitude, longitude, safety_score }) => [latitude, longitude, (safety_score / 100) || 0.0]);
    console.log(heatPoints);

    // Create the heatmap layer
    const heatLayer = L.heatLayer(heatPoints, {
      radius: 25,  // Adjust heat intensity radius
      blur: 30,
      maxZoom: 0,
      gradient: {
        0.2: "blue",   // Low intensity (safe areas)
        0.4: "green",  // Moderate intensity
        0.6: "yellow", // Medium risk
        0.8: "orange", // High risk
        1.0: "red"     // Very high risk (dangerous areas)
      }
    }).addTo(map);;

    map.addLayer(heatLayer);

    return () => {
      map.removeLayer(heatLayer); // Cleanup when component unmounts
    };
  }, [map, heatmapData]);

  return null; // No UI element needed
};

export default HeatmapLayer;
