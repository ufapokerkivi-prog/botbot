"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const position: [number, number] = [55.7558, 37.6173];

const markerIcon = L.icon({
  iconUrl: '/icons/map-marker.png',
  iconRetinaUrl: '/icons/map-marker.png',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

export default function ClinicMap() {
  useEffect(() => {
    L.Marker.prototype.options.icon = markerIcon;
  }, []);

  return (
    <div style={{ width: '100%', height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        aria-label="Карта с расположением клиники"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Наркологическая служба <br /> ул. Примерная, д. 123
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
