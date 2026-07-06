"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import type { Warehouse } from "@/lib/warehouses";
import { useWishlist } from "@/lib/WishlistContext";

export function WarehouseCard({ warehouse }: { warehouse: Warehouse }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const saved = isInWishlist(warehouse.slug);
  return (
    <Link className="listing-card" href={`/warehouses/${warehouse.slug}`}>
      <div className="listing-image">
        <Image src={warehouse.image} alt={warehouse.title} fill sizes="(max-width: 680px) 100vw, 25vw" />
        <span className="tag">{warehouse.tag}</span>
        <button 
          className="heart" 
          aria-label="Save warehouse"
          style={{ background: saved ? "var(--accent)" : "white", border: 'none', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(warehouse.slug);
          }}
        >
          <Heart size={18} fill={saved ? "white" : "none"} color={saved ? "white" : "var(--muted)"} />
        </button>
      </div>
      <div className="listing-info">
        <div className="listing-title">
          <span>{warehouse.title}</span>
          <span className="rating">
            <Star size={14} fill="currentColor" />
            {warehouse.rating}
          </span>
        </div>
        <div className="muted">
          {warehouse.city}, {warehouse.state}
        </div>
        <div className="muted">
          {warehouse.available.toLocaleString()} sq ft available
        </div>
        <div className="price">
          <strong>₹{warehouse.price}</strong> <span className="muted">/ sq ft / month</span>
        </div>
      </div>
    </Link>
  );
}
