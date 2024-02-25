import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center: L.LatLngExpression = [28.6139, 77.209]; // Delhi's location
const zoom: number = 15; // Increased zoom level
const LocationPicker: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<L.LatLng | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);

  const mapRef = useRef<L.Map | null>(null); // Changed to hold reference to the map instance

  const fetchAddress = async (lat: any, lng: any) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data.display_name;
    } catch (error) {
      console.error("Failed to fetch address:", error);
      return null;
    }
  };

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized yet
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(center, zoom); // Use 'map' as the id for the container

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      const marker = L.marker(center, { draggable: true }).addTo(
        mapRef.current
      );

      marker.on("dragend", function (event) {
        const marker = event.target;
        const position = marker.getLatLng();
        setSelectedLocation(position);
        console.log("Selected Location:", position);
        setSelectedLocation(position);
        fetchAddress(position.lat, position.lng).then((data) =>
          setAddress(data)
        );
      });

      mapRef.current.on("click", function (mapEvent) {
        marker.setLatLng(mapEvent.latlng);
        setSelectedLocation(mapEvent.latlng);
        console.log("Selected Location:", mapEvent.latlng);
        const clickedPosition = mapEvent.latlng;
        setSelectedLocation(clickedPosition);
        fetchAddress(clickedPosition.lat, clickedPosition.lng).then((e) =>
          setAddress(e)
        );
      });
    }

    // Clean up the map when the component is unmounted or before re-initializing
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Empty dependency array to ensure effect runs once

  return <div id="map" style={mapContainerStyle}></div>;
};

export default LocationPicker;
