"use client";
import Link from "next/link";
import { Building2, Menu, Search, UserRound, Heart } from "lucide-react";
import { useWishlist } from "@/lib/WishlistContext";

export function Header() {
  const { wishlistSlugs } = useWishlist();

  return (
    <header className="topbar">
      <div className="container nav">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <Building2 size={21} />
          </span>
          <span>Chakan MIDC Force</span>
        </Link>

        <Link className="nav-search" href="/warehouses">
          <span>Search city, storage type, area</span>
          <span className="search-btn" aria-label="Search warehouses">
            <Search size={18} />
          </span>
        </Link>

        <nav className="nav-actions">
          <Link className="ghost" href="/owner">
            List space
          </Link>
          <Link className="secondary" href="/company">
            Dashboard
          </Link>
          <Link className="icon-btn" href="/wishlist" aria-label="Wishlist" style={{ position: 'relative' }}>
            <Heart size={20} fill={wishlistSlugs.length > 0 ? "var(--accent)" : "none"} color={wishlistSlugs.length > 0 ? "var(--accent)" : "currentColor"} />
            {wishlistSlugs.length > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--accent)', color: 'white', fontSize: '10px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold' }}>
                {wishlistSlugs.length}
              </span>
            )}
          </Link>
          <button className="icon-btn" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <button className="icon-btn" aria-label="User profile">
            <UserRound size={20} />
          </button>
        </nav>
      </div>
    </header>
  );
}
