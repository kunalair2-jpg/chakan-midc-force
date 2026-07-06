"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Building2, Menu, UserRound, Heart, Warehouse, Building, ShieldCheck } from "lucide-react";
import { useWishlist } from "@/lib/WishlistContext";

const workspaces = [
  { label: "Owner workspace", href: "/owner", icon: Warehouse },
  { label: "Company workspace", href: "/company", icon: Building },
  { label: "Admin console", href: "/admin", icon: ShieldCheck },
];

export function Header() {
  const { wishlistSlugs } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="topbar">
      <div className="container nav">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <Building2 size={21} />
          </span>
          <span>Chakan MIDC Force</span>
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
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              className="icon-btn"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Menu size={20} />
            </button>
            {menuOpen && (
              <div className="nav-dropdown">
                {workspaces.map(({ label, href, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                    <Icon size={16} />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link className="icon-btn" href="/owner/settings" aria-label="Account settings">
            <UserRound size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
