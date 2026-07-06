"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Filter, Map, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { WarehouseCard } from "@/components/WarehouseCard";
import { FilterDrawer } from "@/components/FilterDrawer";
import { FilterChips } from "@/components/FilterChips";
import { InteractiveMap } from "@/components/InteractiveMap";
import { categories, Warehouse } from "@/lib/warehouses";
import { FiltersState, defaultFilters } from "@/lib/filters";

function WarehousesContent({ initialWarehouses }: { initialWarehouses: Warehouse[] }) {
  const searchParams = useSearchParams();
  const searchLocation = searchParams.get("location")?.toLowerCase() || "";
  const searchCategory = searchParams.get("category");

  const [filters, setFilters] = useState<FiltersState>(() => {
    if (searchCategory && searchCategory !== "All") {
      return { ...defaultFilters, warehouseTypes: [searchCategory] };
    }
    return defaultFilters;
  });
  const [mapMode, setMapMode] = useState(false);
  const [mapFilteredSlugs, setMapFilteredSlugs] = useState<string[] | null>(null);

  const filteredWarehouses = initialWarehouses.filter((w) => {
    let matches = true;
    
    if (searchLocation) {
      if (!w.city.toLowerCase().includes(searchLocation) && !w.state.toLowerCase().includes(searchLocation)) {
        matches = false;
      }
    }

    if (filters.warehouseTypes.length > 0) {
      if (!filters.warehouseTypes.includes(w.category)) matches = false;
    }

    if (filters.monthlyRentMin > defaultFilters.monthlyRentMin || filters.monthlyRentMax < defaultFilters.monthlyRentMax) {
      if (w.price < filters.monthlyRentMin || w.price > filters.monthlyRentMax) matches = false;
    }

    if (mapFilteredSlugs !== null) {
      if (!mapFilteredSlugs.includes(w.slug)) matches = false;
    }
    
    return matches;
  });

  const results = filteredWarehouses.length > 0 ? filteredWarehouses : [];

  return (
    <div className="shell">
      <Header />
      <main className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Browse spaces</span>
              <h1>Find the right warehouse faster</h1>
              <p>Use simple filters to compare verified spaces by city, storage type, price, and area.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className={mapMode ? "primary" : "secondary"} 
                onClick={() => setMapMode(!mapMode)}
              >
                <Map size={18} />
                {mapMode ? "List view" : "Map view"}
              </button>
            </div>
          </div>

          <div className="filter-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <Link
              href="/warehouses"
              className={`filter-chip ${filters.warehouseTypes.length === 0 ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setFilters({ ...filters, warehouseTypes: [] });
              }}
            >
              <SlidersHorizontal size={17} />
              All
            </Link>
            
            <FilterDrawer filters={filters} onFiltersChange={setFilters} />

            {categories.filter(c => c !== "All").map((c) => {
              const isActive = filters.warehouseTypes.includes(c);
              return (
                <Link
                  href="#"
                  className={`filter-chip ${isActive ? "active" : ""}`}
                  key={c}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isActive) {
                      setFilters({ ...filters, warehouseTypes: filters.warehouseTypes.filter(t => t !== c) });
                    } else {
                      setFilters({ ...filters, warehouseTypes: [...filters.warehouseTypes, c] });
                    }
                  }}
                >
                  <Filter size={17} />
                  {c}
                </Link>
              );
            })}
          </div>

          <FilterChips filters={filters} onFiltersChange={setFilters} />

          {mapMode ? (
            <div style={{ marginTop: '24px' }}>
              <InteractiveMap 
                warehouses={initialWarehouses} 
                onFilter={(slugs) => setMapFilteredSlugs(slugs)} 
              />
            </div>
          ) : results.length > 0 ? (
            <div className="listing-grid">
              {results.map((warehouse, index) => (
                <WarehouseCard warehouse={warehouse} key={`${warehouse.slug}-${index}`} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-tertiary)' }}>
              <h3>No warehouses found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function WarehousesClient({ initialWarehouses }: { initialWarehouses: Warehouse[] }) {
  return (
    <Suspense fallback={<div style={{ padding: "48px", textAlign: "center" }}>Loading warehouses...</div>}>
      <WarehousesContent initialWarehouses={initialWarehouses} />
    </Suspense>
  );
}
