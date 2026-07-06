"use client";

import { X } from "lucide-react";
import { FiltersState, defaultFilters } from "@/lib/filters";

export function FilterChips({
  filters,
  onFiltersChange
}: {
  filters: FiltersState;
  onFiltersChange: (newFilters: FiltersState) => void;
}) {
  const chips: { key: keyof FiltersState; label: string; value: string; isArrayItem?: boolean; arrayValue?: string }[] = [];

  const addChip = (key: keyof FiltersState, label: string, value: string, isArrayItem = false, arrayValue?: string) => {
    chips.push({ key, label, value, isArrayItem, arrayValue });
  };

  // Section 1
  if (filters.microMarkets.length > 0) {
    filters.microMarkets.forEach(m => addChip('microMarkets', 'Micro-market', m, true, m));
  }
  if (filters.highwayDistance !== defaultFilters.highwayDistance) addChip('highwayDistance', 'Highway dist.', filters.highwayDistance);
  if (filters.puneDistance !== defaultFilters.puneDistance) addChip('puneDistance', 'Pune dist.', `${filters.puneDistance} km`);
  if (filters.midcZoneOnly !== defaultFilters.midcZoneOnly) addChip('midcZoneOnly', 'MIDC Zone Only', 'Yes');
  if (filters.airportDistance !== defaultFilters.airportDistance) addChip('airportDistance', 'Airport dist.', filters.airportDistance);
  if (filters.railwayDistance !== defaultFilters.railwayDistance) addChip('railwayDistance', 'Railway dist.', filters.railwayDistance);
  if (filters.landmarks.length > 0) {
    filters.landmarks.forEach(l => addChip('landmarks', 'Landmark', l, true, l));
  }
  if (filters.pinCode !== defaultFilters.pinCode) addChip('pinCode', 'Pin Code', filters.pinCode);
  if (filters.roadWidth !== defaultFilters.roadWidth) addChip('roadWidth', 'Road width', filters.roadWidth);
  if (filters.containerAccess !== defaultFilters.containerAccess) addChip('containerAccess', '40-ft container only', 'Yes');

  // Section 2
  if (filters.clearHeight !== defaultFilters.clearHeight) addChip('clearHeight', 'Clear height', `${filters.clearHeight} m`);

  // Section 3
  if (filters.grades.length > 0) {
    filters.grades.forEach(g => addChip('grades', 'Grade', g, true, g));
  }
  if (filters.flooring.length > 0) {
    filters.flooring.forEach(f => addChip('flooring', 'Flooring', f, true, f));
  }
  if (filters.floorLoad !== defaultFilters.floorLoad) addChip('floorLoad', 'Floor load', `${filters.floorLoad} MT/sqm`);

  // Section 4
  if (filters.rentPerSqftMin !== defaultFilters.rentPerSqftMin || filters.rentPerSqftMax !== defaultFilters.rentPerSqftMax) {
    addChip('rentPerSqftMin', 'Rent/sqft', `₹${filters.rentPerSqftMin} - ₹${filters.rentPerSqftMax}`);
  }
  if (filters.monthlyRentMin !== defaultFilters.monthlyRentMin || filters.monthlyRentMax !== defaultFilters.monthlyRentMax) {
    addChip('monthlyRentMin', 'Total rent', `₹${filters.monthlyRentMin / 100000}L - ₹${filters.monthlyRentMax / 100000}L`);
  }

  // Section 5
  if (filters.leasePeriods.length > 0) {
    filters.leasePeriods.forEach(p => addChip('leasePeriods', 'Lease period', p, true, p));
  }
  if (filters.availableFrom !== defaultFilters.availableFrom) addChip('availableFrom', 'Available', filters.availableFrom);

  // Section 6
  if (filters.powerLoad !== defaultFilters.powerLoad) addChip('powerLoad', 'Power load', `${filters.powerLoad} KVA`);
  if (filters.powerBackup.length > 0) {
    filters.powerBackup.forEach(b => addChip('powerBackup', 'Backup', b, true, b));
  }

  // Section 7
  if (filters.fireSafety.length > 0) {
    filters.fireSafety.forEach(f => addChip('fireSafety', 'Fire safety', f, true, f));
  }
  if (filters.fireNocConfirmed !== defaultFilters.fireNocConfirmed) addChip('fireNocConfirmed', 'Fire NOC Confirmed', 'Yes'); // default is true actually, so if false it will show? The prompt said "default ON". Wait, if it's default ON, if user turns it OFF it means any. If it's turned off, we don't necessarily show a chip, or we can. Let's show it if it changes.
  
  // Section 8
  if (filters.warehouseTypes.length > 0) {
    filters.warehouseTypes.forEach(t => addChip('warehouseTypes', 'Type', t, true, t));
  }

  // Section 9
  if (filters.verifiedOnly !== defaultFilters.verifiedOnly) addChip('verifiedOnly', 'Verified only', 'Yes'); // default ON

  const removeChip = (chip: typeof chips[0]) => {
    if (chip.isArrayItem && chip.arrayValue) {
      const arr = filters[chip.key] as string[];
      onFiltersChange({
        ...filters,
        [chip.key]: arr.filter(i => i !== chip.arrayValue)
      });
    } else {
      // It's a range/min/max combo or simple primitive
      if (chip.key === 'rentPerSqftMin') {
        onFiltersChange({ ...filters, rentPerSqftMin: defaultFilters.rentPerSqftMin, rentPerSqftMax: defaultFilters.rentPerSqftMax });
      } else if (chip.key === 'monthlyRentMin') {
        onFiltersChange({ ...filters, monthlyRentMin: defaultFilters.monthlyRentMin, monthlyRentMax: defaultFilters.monthlyRentMax });
      } else {
        onFiltersChange({
          ...filters,
          [chip.key]: defaultFilters[chip.key]
        });
      }
    }
  };

  if (chips.length === 0) return null;

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
      {chips.map((chip, idx) => (
        <div key={idx} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          background: '#f1f5f9', 
          padding: '6px 12px', 
          borderRadius: '20px',
          border: '1px solid #cbd5e1',
          fontSize: '12px',
          fontWeight: 600,
          color: '#334155'
        }}>
          <span style={{ color: '#64748b' }}>{chip.label}:</span>
          <span>{chip.value}</span>
          <button 
            onClick={() => removeChip(chip)}
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: 0, 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              color: '#94a3b8'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      {chips.length > 1 && (
        <button 
          onClick={() => onFiltersChange(defaultFilters)}
          style={{ 
            background: 'none',
            border: 'none',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#1f6feb',
            cursor: 'pointer'
          }}
        >
          Clear all
        </button>
      )}
    </div>
  );
}
