"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapMarker {
  lat: number;
  lon: number;
}

export interface NearbyMapProps {
  user: { lat: number; lon: number };
  airport: { latitude: number; longitude: number; city: string; name: string };
  interactive?: boolean;
  className?: string;
}

const userIcon = L.divIcon({
  className: '',
  html: '<div style="background:#2563eb;color:white;border-radius:999px;padding:4px 8px;font-size:11px;font-weight:700;border:2px solid white;box-shadow:0 6px 20px rgba(15,23,42,0.2)">YOU</div>',
  iconSize: [38, 20],
  iconAnchor: [19, 10],
});

const airportIcon = L.divIcon({
  className: '',
  html: '<div style="background:white;color:#0f172a;border-radius:999px;padding:4px 8px;font-size:11px;font-weight:700;border:2px solid #f43f5e;box-shadow:0 6px 20px rgba(244,63,94,0.25)">AIRPORT</div>',
  iconSize: [54, 20],
  iconAnchor: [27, 10],
});

const polylineOptions = { color: '#0ea5e9', weight: 3, dashArray: '6 6' } as const;

function FitBounds({ user, airport }: { user: MapMarker; airport: { latitude: number; longitude: number } }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(
      [user.lat, user.lon],
      [airport.latitude, airport.longitude]
    );
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [user, airport, map]);
  return null;
}

export default function NearbyMap({ user, airport, interactive = false, className }: NearbyMapProps) {
  return (
    <div className={className}>
      <MapContainer
        center={[user.lat, user.lon]}
        zoom={10}
        scrollWheelZoom={interactive}
        dragging={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        attributionControl
        touchZoom={interactive}
        keyboard={interactive}
        boxZoom={interactive}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <FitBounds user={user} airport={airport} />
        <Marker position={[user.lat, user.lon]} icon={userIcon} interactive={false} />
        <Marker position={[airport.latitude, airport.longitude]} icon={airportIcon} interactive={false} />
        <Polyline
          pathOptions={polylineOptions}
          positions={[
            [user.lat, user.lon],
            [airport.latitude, airport.longitude],
          ]}
        />
      </MapContainer>
    </div>
  );
}
