import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, Search, ShieldCheck, SlidersHorizontal, Warehouse } from "lucide-react";
import { Header } from "@/components/Header";
import { WarehouseCard } from "@/components/WarehouseCard";
import { categories } from "@/lib/warehouses";
import { getWarehouses } from "@/lib/queries";

// ISR: Supabase gets hit at most once per minute instead of on every
// request; addWarehouseAction already calls revalidatePath("/") so new
// listings still show up immediately without waiting for this window.
export const revalidate = 60;

export default async function Home() {
  const warehouses = await getWarehouses();
  return (
    <div className="shell">
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="kicker">Verified warehouse marketplace</span>
              <h1>Find warehouse space that fits your business.</h1>
              <p>
                Search by city, storage type, size, price, and availability. Compare verified spaces,
                request quotes, and move faster from inquiry to booking.
              </p>
              <div className="nav-actions">
                <Link className="primary" href="/warehouses">
                  <Search size={18} />
                  Find space
                </Link>
                <Link className="secondary" href="/owner">
                  <Warehouse size={18} />
                  List warehouse
                </Link>
              </div>
            </div>

            <div className="hero-media">
              <Image
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1400&q=80"
                alt="Endless warehouse racks"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 50vw"
              />
              <div className="hero-float">
                <div className="metric">
                  <strong>420K</strong>
                  <span>sq ft live</span>
                </div>
                <div className="metric">
                  <strong>28</strong>
                  <span>cities</span>
                </div>
                <div className="metric">
                  <strong>4.8</strong>
                  <span>avg rating</span>
                </div>
              </div>
            </div>
          </div>

          <Form className="container search-panel" action="/warehouses">
            <div className="field">
              <label>Location</label>
              <input name="location" placeholder="Mumbai, Delhi, Bengaluru" />
            </div>
            <div className="field">
              <label>Storage</label>
              <select name="category" defaultValue="">
                <option value="" disabled>
                  Select type
                </option>
                {categories.filter(c => c !== "All").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Area</label>
              <input name="area" placeholder="20,000 sq ft" />
            </div>
            <div className="field">
              <label>Move-in</label>
              <input name="date" type="date" />
            </div>
            <button className="primary" type="submit">
              Search
            </button>
          </Form>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Explore by storage need</h2>
                <p>Quick filters for the highest-demand warehouse categories.</p>
              </div>
              <Link className="secondary" href="/warehouses">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="category-row">
              {categories.map((category, index) => (
                <Link
                  className={`category ${index === 0 ? "active" : ""}`}
                  href={category === "All" ? "/warehouses" : `/warehouses?category=${encodeURIComponent(category)}`}
                  key={category}
                >
                  {index === 0 ? <SlidersHorizontal size={17} /> : <Warehouse size={17} />}
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Simple booking journey</h2>
                <p>A clear flow for companies and warehouse owners.</p>
              </div>
            </div>
            <div className="simple-steps">
              {[
                ["Search", "Filter verified warehouses by city, size, storage type, and budget."],
                ["Request", "Send your requirement and receive a custom quote from the owner."],
                ["Book", "Confirm the space, manage documents, payments, and booking status."],
              ].map(([title, body]) => (
                <div className="step" key={title}>
                  <CheckCircle2 size={22} color="#1f6feb" />
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Featured verified spaces</h2>
                <p>High-quality listings with rich capacity, compliance, and pricing information.</p>
              </div>
            </div>
            <div className="listing-grid">
              {warehouses.map((warehouse) => (
                <WarehouseCard warehouse={warehouse} key={warehouse.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container split">
            <div>
              <h2>Built for serious B2B warehouse decisions</h2>
              <p>
                The platform supports inquiry-led booking, owner quotes, admin approval, payment readiness,
                document verification, and capacity tracking.
              </p>
            </div>
            <div className="panel">
              <div className="feature-list">
                {[
                  [MapPin, "Location and distance search"],
                  [ShieldCheck, "Verified owners and documents"],
                  [CalendarDays, "Availability and quote workflow"],
                  [Warehouse, "Capacity ledger for reservations"],
                ].map(([Icon, label]) => (
                  <div className="feature" key={label as string}>
                    <Icon size={19} />
                    <span>{label as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
