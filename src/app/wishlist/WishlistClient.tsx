"use client";

import { Header } from "@/components/Header";
import { WarehouseCard } from "@/components/WarehouseCard";
import { useWishlist } from "@/lib/WishlistContext";
import { HeartCrack, Search } from "lucide-react";
import Link from "next/link";
import { Warehouse } from "@/lib/warehouses";

export default function WishlistClient({ warehouses }: { warehouses: Warehouse[] }) {
  const { wishlistSlugs } = useWishlist();
  
  const savedWarehouses = warehouses.filter((w) => wishlistSlugs.includes(w.slug));

  return (
    <div className="shell">
      <Header />
      <main className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">Your favorites</span>
              <h1>Saved Warehouses</h1>
              <p>Compare your shortlisted spaces and request official quotes when you are ready.</p>
            </div>
          </div>

          {savedWarehouses.length > 0 ? (
            <div className="listing-grid">
              {savedWarehouses.map((warehouse) => (
                <WarehouseCard warehouse={warehouse} key={warehouse.slug} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'var(--accent-soft)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <HeartCrack size={40} color="var(--accent)" />
              </div>
              <h2 style={{ fontSize: '24px', margin: '0 0 12px 0' }}>Your wishlist is empty</h2>
              <p style={{ color: 'var(--muted)', maxWidth: '400px', marginBottom: '32px' }}>
                You haven't saved any warehouses yet. Browse the marketplace and click the heart icon on any space to add it here.
              </p>
              <Link href="/warehouses" className="primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} /> Browse Spaces
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
