import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  CalendarDays, Check, MapPin, MessageSquare, Ruler, ShieldCheck, Star, Truck,
  Maximize, Zap, Flame, Building, Network, Box, AlertTriangle
} from "lucide-react";
import { Header } from "@/components/Header";
import { BookingForm } from "@/components/BookingForm";
import { DynamicWarehouseMap } from "@/components/DynamicWarehouseMap";
import { categories } from "@/lib/warehouses";
import { getWarehouse, getWarehouses } from "@/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const warehouses = await getWarehouses();
  return warehouses.map((warehouse) => ({ slug: warehouse.slug }));
}

export default async function WarehouseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const warehouse = await getWarehouse(slug);

  if (!warehouse) {
    notFound();
  }

  const specs = warehouse.specs;

  return (
    <div className="shell">
      <Header />
      
      <style>{`
        .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 24px;
        }
        @media (max-width: 768px) {
          .specs-grid { grid-template-columns: 1fr; }
        }
        .spec-group {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
        }
        .spec-group h3 {
          margin: 0 0 16px 0;
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .spec-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          border-bottom: 1px dashed #cbd5e1;
          padding-bottom: 8px;
        }
        .spec-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .spec-label {
          color: #64748b;
          font-weight: 600;
        }
        .spec-value {
          color: #0f172a;
          font-weight: 700;
          text-align: right;
        }
        .badge-green {
          background: #dcfce7;
          color: #166534;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
        }
        .badge-red {
          background: #fee2e2;
          color: #991b1b;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
        }

        /* Enhanced Booking Form */
        .modern-booking {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 60px rgba(17, 54, 99, 0.08), 0 0 0 1px rgba(17, 54, 99, 0.02);
        }
        .booking-price {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.5px;
        }
        .booking-price span {
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
        }
        .input-group {
          position: relative;
          margin-bottom: 16px;
        }
        .input-group label {
          position: absolute;
          left: 14px;
          top: 10px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
          letter-spacing: 0.5px;
          pointer-events: none;
        }
        .float-input, .float-select, .float-textarea {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 28px 14px 10px;
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          transition: all 0.2s ease;
          appearance: none;
        }
        .float-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        .float-input:focus, .float-select:focus, .float-textarea:focus {
          background: #ffffff;
          border-color: #1f6feb;
          box-shadow: 0 0 0 4px #eaf2ff;
          outline: none;
        }
        .float-textarea {
          resize: vertical;
          min-height: 120px;
        }
        .btn-gradient {
          width: 100%;
          background: linear-gradient(135deg, #1f6feb 0%, #0c4a6e 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(31, 111, 235, 0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-bottom: 12px;
        }
        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(31, 111, 235, 0.4);
        }
        .btn-outline {
          width: 100%;
          background: white;
          border: 2px solid #e2e8f0;
          color: #334155;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
      `}</style>

      <main className="container section">
        <div className="detail-title">
          <h1>{warehouse.title}</h1>
          <p className="rating" style={{ fontSize: '15px' }}>
            <Star size={18} fill="currentColor" /> <strong>{warehouse.rating}</strong> ({warehouse.reviews} verified reviews) ·{" "}
            <MapPin size={16} style={{ marginLeft: 4 }}/> {warehouse.city}, {warehouse.state}
          </p>
        </div>

        <div className="photo-grid">
          <div className="photo-main" style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image 
              src={warehouse.image} 
              alt={warehouse.title} 
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 66vw"
              priority 
            />
          </div>
          <div className="photo-stack" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '8px' }}>
            {warehouse.images.slice(1).map((image) => (
              <div key={image} style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image 
                  src={image} 
                  alt={`${warehouse.title} view`} 
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="split" style={{ marginTop: 32 }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} /> Verified Space
              </span>
              <span className="muted" style={{ fontWeight: 600 }}>Listed by Premium Owner</span>
            </div>
            
            <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>{warehouse.category} space in {warehouse.city}</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#334155', marginBottom: '32px' }}>{warehouse.description}</p>

            <div className="facts" style={{ marginBottom: '40px' }}>
              <div className="fact">
                <Maximize size={22} color="#1f6feb" />
                <strong style={{ fontSize: '18px', marginTop: '8px' }}>{warehouse.area.toLocaleString()} sq ft</strong>
                <span>Total facility</span>
              </div>
              <div className="fact">
                <Truck size={22} color="#1f6feb" />
                <strong style={{ fontSize: '18px', marginTop: '8px' }}>{warehouse.available.toLocaleString()} sq ft</strong>
                <span>Available now</span>
              </div>
              <div className="fact">
                <Box size={22} color="#1f6feb" />
                <strong style={{ fontSize: '18px', marginTop: '8px' }}>{specs.clearHeight} m</strong>
                <span>Clear height</span>
              </div>
              <div className="fact">
                <Network size={22} color="#1f6feb" />
                <strong style={{ fontSize: '18px', marginTop: '8px' }}>{specs.powerLoad} KVA</strong>
                <span>Power load</span>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '24px' }}>Technical Specifications</h2>
            
            <div className="specs-grid">
              {/* Infrastructure */}
              <div className="spec-group">
                <h3><Building size={18} color="#64748b"/> Infrastructure & Quality</h3>
                <div className="spec-list">
                  <div className="spec-item"><span className="spec-label">Warehouse Grade</span><span className="spec-value">{specs.grade}</span></div>
                  <div className="spec-item"><span className="spec-label">Flooring Type</span><span className="spec-value">{specs.flooring}</span></div>
                  <div className="spec-item"><span className="spec-label">Floor Load</span><span className="spec-value">{specs.floorLoad} MT/sqm</span></div>
                  <div className="spec-item"><span className="spec-label">Clear Height</span><span className="spec-value">{specs.clearHeight} m</span></div>
                </div>
              </div>

              {/* Location & Access */}
              <div className="spec-group">
                <h3><MapPin size={18} color="#64748b"/> Location & Access</h3>
                <div className="spec-list">
                  <div className="spec-item"><span className="spec-label">Micro-market</span><span className="spec-value">{specs.microMarket}</span></div>
                  <div className="spec-item"><span className="spec-label">Highway Access</span><span className="spec-value">{specs.highwayDistance}</span></div>
                  <div className="spec-item"><span className="spec-label">Road Width</span><span className="spec-value">{specs.roadWidth}</span></div>
                  <div className="spec-item"><span className="spec-label">40ft Container</span><span className="spec-value">{specs.containerAccess ? <span className="badge-green">Accessible</span> : <span className="badge-red">No Access</span>}</span></div>
                </div>
              </div>

              {/* Utilities & Safety */}
              <div className="spec-group">
                <h3><Zap size={18} color="#64748b"/> Utilities & Safety</h3>
                <div className="spec-list">
                  <div className="spec-item"><span className="spec-label">Power Load</span><span className="spec-value">{specs.powerLoad} KVA</span></div>
                  <div className="spec-item"><span className="spec-label">Power Backup</span><span className="spec-value">{specs.powerBackup}</span></div>
                  <div className="spec-item"><span className="spec-label">Fire System</span><span className="spec-value">{specs.fireSafety}</span></div>
                  <div className="spec-item"><span className="spec-label">Fire NOC</span><span className="spec-value">{specs.fireNoc ? <span className="badge-green">Confirmed</span> : <span className="badge-red">Pending</span>}</span></div>
                </div>
              </div>

              {/* Leasing Terms */}
              <div className="spec-group">
                <h3><CalendarDays size={18} color="#64748b"/> Leasing Terms</h3>
                <div className="spec-list">
                  <div className="spec-item"><span className="spec-label">Min. Lease Period</span><span className="spec-value">{specs.minLease}</span></div>
                  <div className="spec-item"><span className="spec-label">Available From</span><span className="spec-value">{specs.availableFrom}</span></div>
                  <div className="spec-item"><span className="spec-label">Asking Rent</span><span className="spec-value">₹{warehouse.price}/sqft</span></div>
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', margin: '40px 0 24px' }}>On-site Facilities</h2>
            <div className="feature-list" style={{ marginBottom: '40px' }}>
              {warehouse.facilities.map((facility) => (
                <div className="feature" key={facility} style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', fontWeight: 600 }}>
                  <Check size={20} color="#0f766e" />
                  {facility}
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', margin: '40px 0 24px' }}>Location Map</h2>
            <div style={{ marginBottom: '40px' }}>
              <DynamicWarehouseMap warehouse={warehouse} />
            </div>
          </section>

          <aside className="sticky">
            <div className="modern-booking">
              <div style={{ marginBottom: '24px' }}>
                <div className="booking-price">₹{warehouse.price}<span> / sq ft / month</span></div>
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontSize: '13px', fontWeight: 700 }}>
                  <ShieldCheck size={16} /> Best price guarantee
                </div>
              </div>

              <BookingForm warehouse={warehouse} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
