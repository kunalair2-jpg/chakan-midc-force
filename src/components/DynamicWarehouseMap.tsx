"use client";

import dynamic from "next/dynamic";
import { Warehouse } from "@/lib/warehouses";

const WarehouseMap = dynamic(() => import("./WarehouseMap"), {
  ssr: false,
  loading: () => <div style={{ height: "400px", width: "100%", background: "#f1f5f9", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>Loading map...</div>
});

export function DynamicWarehouseMap({ warehouse }: { warehouse: Warehouse }) {
  return <WarehouseMap warehouse={warehouse} />;
}
