import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader"; // Import the Library type

const libraries: Library[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const LocationSelector: React.FC = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.LatLng | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
      });

      const marker = new window.google.maps.Marker({
        map: map,
        draggable: true,
      });

      marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
        setSelectedLocation(event.latLng);
      });
    }
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation(event.latLng);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLocation || { lat: 37.7749, lng: -122.4194 }}
        zoom={12}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationSelector;
