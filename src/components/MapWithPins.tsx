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

interface MapWithPinsProps {
  warehouses: Warehouse[];
  onFilter: (slugs: string[] | null) => void;
}

export default function MapWithPins({ warehouses, onFilter }: MapWithPinsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Since we're replacing the polygon drawing with a standard map for now,
    // we can reset the filter when the map loads or keep it as null.
    onFilter(null);
  }, [onFilter]);

  if (!mounted) return <div style={{ height: "500px", width: "100%", background: "#f1f5f9", borderRadius: "24px" }} />;

  // Center of India roughly
  const defaultCenter: [number, number] = [20.5937, 78.9629];
  const zoom = 5;

  return (
    <div style={{ height: "500px", width: "100%", borderRadius: "24px", overflow: "hidden", border: "1px solid #dbe6f4", boxShadow: "0 12px 34px rgba(17,54,99,0.06)", position: "relative" }}>
      <MapContainer center={defaultCenter} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {warehouses.map((warehouse) => (
          <Marker key={warehouse.slug} position={[warehouse.lat, warehouse.lng]}>
            <Popup>
              <div style={{ padding: "4px" }}>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "bold" }}>{warehouse.title}</h4>
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#64748b" }}>{warehouse.city}, {warehouse.state}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", color: "#0f766e" }}>${warehouse.price}/sqft</span>
                  <a href={`/warehouses/${warehouse.slug}`} style={{ fontSize: "12px", color: "#1f6feb", textDecoration: "none", fontWeight: "bold" }}>View Details</a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
