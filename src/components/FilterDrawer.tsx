"use client";

import { useState, useEffect } from "react";
import { 
  Filter, X, ChevronDown, Shield, Info, MapPin, Ruler, Star, IndianRupee, FileText, Zap, Flame, Building, ShieldCheck,
  Box, ThermometerSnowflake, Pill, Car, ShoppingCart, Network, GitMerge, AlertTriangle, Thermometer, Apple, Map
} from "lucide-react";
import { FiltersState, defaultFilters } from "@/lib/filters";

export function FilterDrawer({
  filters,
  onFiltersChange
}: {
  filters: FiltersState;
  onFiltersChange: (newFilters: FiltersState) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const updateFilter = <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayItem = (key: keyof FiltersState, item: string) => {
    const arr = filters[key] as string[];
    if (arr.includes(item)) {
      updateFilter(key, arr.filter(i => i !== item) as any);
    } else {
      updateFilter(key, [...arr, item] as any);
    }
  };

  const getActiveCount = (keys: (keyof FiltersState)[]) => {
    let count = 0;
    keys.forEach(k => {
      const val = filters[k];
      const def = defaultFilters[k];
      if (Array.isArray(val) && val.length > 0) count++;
      else if (typeof val === 'boolean' && val !== def) count++;
      else if (!Array.isArray(val) && typeof val !== 'boolean' && val !== def) count++;
    });
    return count;
  };

  const totalActive = getActiveCount(Object.keys(filters) as (keyof FiltersState)[]);

  const sec1Count = getActiveCount(['microMarkets', 'highwayDistance', 'puneDistance', 'midcZoneOnly', 'airportDistance', 'railwayDistance', 'landmarks', 'pinCode', 'roadWidth', 'containerAccess']);
  const sec2Count = getActiveCount(['clearHeight']);
  const sec3Count = getActiveCount(['grades', 'flooring', 'floorLoad']);
  const sec4Count = getActiveCount(['rentPerSqftMin', 'rentPerSqftMax', 'monthlyRentMin', 'monthlyRentMax']);
  const sec5Count = getActiveCount(['leasePeriods', 'availableFrom']);
  const sec6Count = getActiveCount(['powerLoad', 'powerBackup']);
  const sec7Count = getActiveCount(['fireSafety', 'fireNocConfirmed']);
  const sec8Count = getActiveCount(['warehouseTypes']);
  const sec9Count = getActiveCount(['verifiedOnly']);

  const clearAll = () => {
    onFiltersChange(defaultFilters);
  };

  return (
    <>
      <style>{`
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(16, 32, 51, 0.55);
          backdrop-filter: blur(10px);
          z-index: 100;
          display: flex;
          justify-content: flex-start;
          animation: fadeIn 0.3s ease;
        }
        @media (max-width: 768px) {
          .drawer-overlay {
            align-items: flex-end;
          }
        }
        .drawer-panel {
          background: #ffffff;
          width: 100%;
          max-width: 480px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 24px 0 84px rgba(16, 32, 51, 0.25);
          animation: slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 768px) {
          .drawer-panel {
            max-width: 100%;
            height: 90%;
            border-radius: 20px 20px 0 0;
            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }

        .filter-content {
          overflow-y: auto;
          flex: 1;
          padding-bottom: 80px;
        }

        details {
          border-bottom: 1px solid #e2e8f0;
        }
        summary {
          list-style: none;
          padding: 20px 24px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          user-select: none;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        .summary-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .summary-count {
          background: #eff6ff;
          color: #1f6feb;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 700;
        }
        .summary-icon {
          transition: transform 0.3s ease;
          color: #64748b;
        }
        details[open] .summary-icon {
          transform: rotate(180deg);
        }
        .details-body {
          padding: 0 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .filter-group > label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }

        /* Inputs */
        .modern-input, .modern-select {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          color: #0f172a;
          background: #ffffff;
        }
        .modern-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
        }

        /* Checkboxes (Multi-select) */
        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 14px;
          color: #334155;
        }
        .checkbox-item input {
          width: 18px;
          height: 18px;
          accent-color: #1f6feb;
          cursor: pointer;
        }
        .checkbox-item .badge {
          background: #dcfce7;
          color: #166534;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          margin-left: auto;
        }

        /* Range Slider (Single) */
        .slider-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .slider-val {
          font-size: 14px;
          font-weight: 600;
          color: #1f6feb;
        }
        .slider-helper {
          font-size: 12px;
          color: #64748b;
          margin-top: 4px;
        }
        input[type=range] {
          width: 100%;
          accent-color: #1f6feb;
        }

        /* Dual Slider Native Workaround */
        .dual-slider-wrapper {
          position: relative;
          height: 24px;
          width: 100%;
          margin-top: 10px;
        }
        .dual-slider-track {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          transform: translateY(-50%);
        }
        .dual-slider-market {
          position: absolute;
          top: 50%;
          left: 36%; /* roughly 21/30 of distance from 10 */
          width: 33%; /* roughly 10/30 */
          height: 4px;
          background: #bfdbfe;
          transform: translateY(-50%);
          pointer-events: none;
        }
        .dual-input {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          width: 100%;
          pointer-events: none;
          appearance: none;
          background: transparent;
        }
        .dual-input::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1f6feb;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        /* Toggles */
        .toggle-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
        .toggle-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }
        .toggle-switch {
          position: relative;
          width: 44px;
          height: 24px;
          background: #e2e8f0;
          border-radius: 12px;
          transition: 0.3s;
        }
        .toggle-switch::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .toggle-input:checked + .toggle-switch {
          background: #1f6feb;
        }
        .toggle-input:checked + .toggle-switch::after {
          transform: translateX(20px);
        }

        /* Mobile Trigger */
        .mobile-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          color: #0f172a;
          cursor: pointer;
          position: relative;
        }
        .mobile-trigger .badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          font-weight: 800;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        /* Tooltip */
        .tooltip-icon {
          position: relative;
          color: #64748b;
          cursor: help;
        }
        .tooltip-icon:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #1e293b;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          white-space: nowrap;
          margin-bottom: 4px;
          z-index: 10;
        }

        .sticky-footer {
          position: sticky;
          bottom: 0;
          background: white;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>

      <button className="mobile-trigger" onClick={() => setIsOpen(true)}>
        <Filter size={16} />
        Filters
        {totalActive > 0 && <span className="badge">{totalActive}</span>}
      </button>

      {isOpen && (
        <div className="drawer-overlay" onClick={() => setIsOpen(false)}>
          <div className="drawer-panel" onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Filters</h2>
              <button className="icon-btn" onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={20} color="#0f172a" />
              </button>
            </div>

            <div className="filter-content">
              {/* SECTION 1 - Location */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <MapPin size={18} /> Location
                    {sec1Count > 0 && <span className="summary-count">{sec1Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group">
                    <label>Area / micro-market</label>
                    <div className="checkbox-list">
                      {["Chakan", "Talegaon", "Ranjangaon", "Pimpri Chinchwad", "Hinjewadi", "Sanaswadi", "Kuruli", "Shikrapur"].map(loc => (
                        <label key={loc} className="checkbox-item">
                          <input type="checkbox" checked={filters.microMarkets.includes(loc)} onChange={() => toggleArrayItem('microMarkets', loc)} />
                          {loc}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <label>Distance from highway</label>
                    <select className="modern-select" value={filters.highwayDistance} onChange={(e) => updateFilter('highwayDistance', e.target.value)}>
                      <option>Any</option>
                      <option>Within 1 km</option>
                      <option>Within 2 km</option>
                      <option>Within 5 km</option>
                      <option>Within 10 km</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Distance from Pune city <span className="slider-val">({filters.puneDistance} km)</span></label>
                    <input type="range" min="0" max="60" step="1" value={filters.puneDistance} onChange={(e) => updateFilter('puneDistance', Number(e.target.value))} />
                  </div>

                  <label className="toggle-wrapper">
                    <span className="toggle-label">MIDC zone only</span>
                    <div>
                      <input type="checkbox" hidden className="toggle-input" checked={filters.midcZoneOnly} onChange={(e) => updateFilter('midcZoneOnly', e.target.checked)} />
                      <div className="toggle-switch"></div>
                    </div>
                  </label>

                  <div className="filter-group">
                    <label>Distance from Pune airport</label>
                    <select className="modern-select" value={filters.airportDistance} onChange={(e) => updateFilter('airportDistance', e.target.value)}>
                      <option>Any</option>
                      <option>Under 20 km</option>
                      <option>20–40 km</option>
                      <option>40–60 km</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Distance from railway station</label>
                    <select className="modern-select" value={filters.railwayDistance} onChange={(e) => updateFilter('railwayDistance', e.target.value)}>
                      <option>Any</option>
                      <option>Under 5 km</option>
                      <option>5–15 km</option>
                      <option>15–30 km</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Near landmark / OEM plant</label>
                    <div className="checkbox-list">
                      {["Volkswagen", "Bajaj Auto", "Mahindra", "Mercedes-Benz", "Tata Motors", "IndoSpace Chakan"].map(lm => (
                        <label key={lm} className="checkbox-item">
                          <input type="checkbox" checked={filters.landmarks.includes(lm)} onChange={() => toggleArrayItem('landmarks', lm)} />
                          {lm}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <label>Pin code search</label>
                    <input type="text" className="modern-input" placeholder="e.g. 410501" value={filters.pinCode} onChange={(e) => updateFilter('pinCode', e.target.value)} />
                  </div>

                  <div className="filter-group">
                    <label>Road access width</label>
                    <select className="modern-select" value={filters.roadWidth} onChange={(e) => updateFilter('roadWidth', e.target.value)}>
                      <option>Any</option>
                      <option>9 m road</option>
                      <option>12 m road</option>
                      <option>18 m+ road</option>
                    </select>
                  </div>

                  <label className="toggle-wrapper">
                    <span className="toggle-label">40-ft container accessible only</span>
                    <div>
                      <input type="checkbox" hidden className="toggle-input" checked={filters.containerAccess} onChange={(e) => updateFilter('containerAccess', e.target.checked)} />
                      <div className="toggle-switch"></div>
                    </div>
                  </label>
                </div>
              </details>

              {/* SECTION 2 - Ceiling height */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <Ruler size={18} /> Ceiling height
                    {sec2Count > 0 && <span className="summary-count">{sec2Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group slider-container">
                    <label>Clear height at centre <span className="slider-val">({filters.clearHeight} m)</span></label>
                    <input type="range" min="6" max="16" step="0.5" value={filters.clearHeight} onChange={(e) => updateFilter('clearHeight', Number(e.target.value))} />
                    <span className="slider-helper">Grade A = 12–13 m · Grade B = 7–9 m</span>
                  </div>
                </div>
              </details>

              {/* SECTION 3 - Grade & Quality */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <Star size={18} /> Grade and quality
                    {sec3Count > 0 && <span className="summary-count">{sec3Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group">
                    <label>Warehouse grade</label>
                    <div className="checkbox-list">
                      {[
                        { g: "Grade A", t: "Top tier, highest specs" }, 
                        { g: "Grade B", t: "Standard specs" }, 
                        { g: "Grade C", t: "Basic sheds" }
                      ].map(grade => (
                        <label key={grade.g} className="checkbox-item">
                          <input type="checkbox" checked={filters.grades.includes(grade.g)} onChange={() => toggleArrayItem('grades', grade.g)} />
                          {grade.g}
                          <Info size={14} className="tooltip-icon" data-tooltip={grade.t} />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <label>Flooring type</label>
                    <div className="checkbox-list">
                      {["Trimix", "Tremix", "VDF", "Epoxy-coated", "Plain concrete"].map(floor => (
                        <label key={floor} className="checkbox-item">
                          <input type="checkbox" checked={filters.flooring.includes(floor)} onChange={() => toggleArrayItem('flooring', floor)} />
                          {floor}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group slider-container">
                    <label>Floor load capacity <span className="slider-val">({filters.floorLoad} MT/sqm)</span></label>
                    <input type="range" min="2" max="10" step="1" value={filters.floorLoad} onChange={(e) => updateFilter('floorLoad', Number(e.target.value))} />
                  </div>
                </div>
              </details>

              {/* SECTION 4 - Pricing */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <IndianRupee size={18} /> Pricing
                    {sec4Count > 0 && <span className="summary-count">{sec4Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group slider-container">
                    <label>Rent per sqft/month <span className="slider-val">(₹{filters.rentPerSqftMin} - ₹{filters.rentPerSqftMax}/sqft)</span></label>
                    <div className="dual-slider-wrapper">
                      <div className="dual-slider-track"></div>
                      <div className="dual-slider-market"></div>
                      <input type="range" className="dual-input" min="10" max="40" step="1" value={filters.rentPerSqftMin} onChange={(e) => {
                        const val = Math.min(Number(e.target.value), filters.rentPerSqftMax - 1);
                        updateFilter('rentPerSqftMin', val);
                      }} />
                      <input type="range" className="dual-input" min="10" max="40" step="1" value={filters.rentPerSqftMax} onChange={(e) => {
                        const val = Math.max(Number(e.target.value), filters.rentPerSqftMin + 1);
                        updateFilter('rentPerSqftMax', val);
                      }} />
                    </div>
                    <span className="slider-helper" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ width: 10, height: 10, background: '#bfdbfe', display: 'inline-block', borderRadius: 2 }}></span> market range (₹21–₹31)
                    </span>
                  </div>

                  <div className="filter-group slider-container" style={{ marginTop: '16px' }}>
                    <label>Total monthly rent <span className="slider-val">(₹{filters.monthlyRentMin / 100000} - ₹{filters.monthlyRentMax / 100000} lakh/month)</span></label>
                    <div className="dual-slider-wrapper">
                      <div className="dual-slider-track"></div>
                      <input type="range" className="dual-input" min="50000" max="10000000" step="50000" value={filters.monthlyRentMin} onChange={(e) => {
                        const val = Math.min(Number(e.target.value), filters.monthlyRentMax - 50000);
                        updateFilter('monthlyRentMin', val);
                      }} />
                      <input type="range" className="dual-input" min="50000" max="10000000" step="50000" value={filters.monthlyRentMax} onChange={(e) => {
                        const val = Math.max(Number(e.target.value), filters.monthlyRentMin + 50000);
                        updateFilter('monthlyRentMax', val);
                      }} />
                    </div>
                  </div>
                </div>
              </details>

              {/* SECTION 5 - Lease Terms */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <FileText size={18} /> Lease terms
                    {sec5Count > 0 && <span className="summary-count">{sec5Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group">
                    <label>Minimum lease period</label>
                    <div className="checkbox-list">
                      {["1–3 months", "3–6 months", "6–12 months", "1–3 years", "3+ years"].map(period => {
                        const isFlexible = ["1–3 months", "3–6 months", "6–12 months"].includes(period);
                        return (
                          <label key={period} className="checkbox-item">
                            <input type="checkbox" checked={filters.leasePeriods.includes(period)} onChange={() => toggleArrayItem('leasePeriods', period)} />
                            {period}
                            {isFlexible && <span className="badge">Flexible</span>}
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="filter-group">
                    <label>Available from</label>
                    <select className="modern-select" value={filters.availableFrom} onChange={(e) => updateFilter('availableFrom', e.target.value)}>
                      <option>Any</option>
                      <option>Immediately</option>
                      <option>Within 1 month</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                    </select>
                  </div>
                </div>
              </details>

              {/* SECTION 6 - Power & Utilities */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <Zap size={18} /> Power and utilities
                    {sec6Count > 0 && <span className="summary-count">{sec6Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group slider-container">
                    <label>Sanctioned power load <span className="slider-val">({filters.powerLoad} KVA)</span></label>
                    <input type="range" min="50" max="2000" step="50" value={filters.powerLoad} onChange={(e) => updateFilter('powerLoad', Number(e.target.value))} />
                  </div>

                  <div className="filter-group">
                    <label>Power backup</label>
                    <div className="checkbox-list">
                      {["Full DG backup", "Partial backup", "No backup"].map(bkp => (
                        <label key={bkp} className="checkbox-item">
                          <input type="checkbox" checked={filters.powerBackup.includes(bkp)} onChange={() => toggleArrayItem('powerBackup', bkp)} />
                          {bkp}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </details>

              {/* SECTION 7 - Safety & compliance */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <Flame size={18} /> Safety and compliance
                    {sec7Count > 0 && <span className="summary-count">{sec7Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group">
                    <label>Fire safety system</label>
                    <div className="checkbox-list">
                      {["Fire sprinkler", "Fire hydrant", "Extinguishers only", "None"].map(sys => (
                        <label key={sys} className="checkbox-item">
                          <input type="checkbox" checked={filters.fireSafety.includes(sys)} onChange={() => toggleArrayItem('fireSafety', sys)} />
                          {sys}
                        </label>
                      ))}
                    </div>
                  </div>

                  <label className="toggle-wrapper" style={{ marginTop: '16px' }}>
                    <span className="toggle-label">Fire NOC confirmed only</span>
                    <div>
                      <input type="checkbox" hidden className="toggle-input" checked={filters.fireNocConfirmed} onChange={(e) => updateFilter('fireNocConfirmed', e.target.checked)} />
                      <div className="toggle-switch"></div>
                    </div>
                  </label>
                </div>
              </details>

              {/* SECTION 8 - Warehouse type */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <Building size={18} /> Warehouse type
                    {sec8Count > 0 && <span className="summary-count">{sec8Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <div className="filter-group">
                    <div className="checkbox-list">
                      {[
                        { l: "General / Dry storage", i: Box },
                        { l: "Cold storage", i: ThermometerSnowflake },
                        { l: "Climate-controlled", i: Thermometer },
                        { l: "E-commerce fulfillment", i: ShoppingCart },
                        { l: "3PL", i: Network },
                        { l: "Cross-docking", i: GitMerge },
                        { l: "Hazmat", i: AlertTriangle },
                        { l: "Pharma-grade", i: Pill },
                        { l: "Food grade", i: Apple },
                        { l: "Bonded / SEZ", i: Shield },
                        { l: "Auto parts", i: Car },
                        { l: "Open yard", i: Map }
                      ].map(type => (
                        <label key={type.l} className="checkbox-item">
                          <input type="checkbox" checked={filters.warehouseTypes.includes(type.l)} onChange={() => toggleArrayItem('warehouseTypes', type.l)} />
                          <type.i size={16} color="#64748b" /> {type.l}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </details>

              {/* SECTION 9 - Platform trust */}
              <details open>
                <summary>
                  <div className="summary-title">
                    <ShieldCheck size={18} /> Platform trust
                    {sec9Count > 0 && <span className="summary-count">{sec9Count}</span>}
                  </div>
                  <ChevronDown size={18} className="summary-icon" />
                </summary>
                <div className="details-body">
                  <label className="toggle-wrapper">
                    <span className="toggle-label"><Shield size={16} color="#1f6feb" fill="#e0f2fe" /> Physically verified by our team</span>
                    <div>
                      <input type="checkbox" hidden className="toggle-input" checked={filters.verifiedOnly} onChange={(e) => updateFilter('verifiedOnly', e.target.checked)} />
                      <div className="toggle-switch"></div>
                    </div>
                  </label>
                </div>
              </details>
            </div>

            <div className="sticky-footer">
              <button className="secondary" style={{ flex: '1', padding: '12px' }} onClick={clearAll}>Clear all</button>
              <button className="primary" style={{ flex: '2', padding: '12px' }} onClick={() => setIsOpen(false)}>Apply filters</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
