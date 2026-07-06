"use client";

import dynamic from "next/dynamic";
import { Warehouse } from "@/lib/warehouses";

const MapWithPins = dynamic(() => import("./MapWithPins"), {
  ssr: false,
  loading: () => <div style={{ height: "500px", width: "100%", background: "#f1f5f9", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>Loading map...</div>
});

export function InteractiveMap({ 
  warehouses, 
  onFilter 
}: { 
  warehouses: Warehouse[],
  onFilter: (slugs: string[] | null) => void 
}) {
  return <MapWithPins warehouses={warehouses} onFilter={onFilter} />;
}
