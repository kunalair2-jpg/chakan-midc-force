"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for Leaflet default icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});
import { Warehouse } from "@/lib/warehouses";

interface WarehouseMapProps {
  warehouse: Warehouse;
}

export default function WarehouseMap({ warehouse }: WarehouseMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "16px" }} />;

  const position: [number, number] = [warehouse.lat, warehouse.lng];

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div style={{ padding: "4px" }}>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "bold" }}>{warehouse.title}</h4>
              <p style={{ margin: "0", fontSize: "12px", color: "#64748b" }}>{warehouse.city}, {warehouse.state}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
