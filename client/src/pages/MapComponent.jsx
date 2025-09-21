import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords(e.latlng);
    },
  });
  return null;
}

function MapComponent({ onLocationSelect }) {
  const [coords, setCoords] = useState(null);

  React.useEffect(() => {
    if (coords) {
      onLocationSelect(coords.lat, coords.lon);
    }
  }, [coords, onLocationSelect]);

  return (
    <div>
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setCoords={setCoords} />
        {coords && <Marker position={coords} />}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
