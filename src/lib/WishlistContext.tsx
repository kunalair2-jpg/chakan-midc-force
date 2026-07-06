"use client";

import { createContext, useContext, useEffect, useState } from "react";

type WishlistContextType = {
  wishlistSlugs: string[];
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlistSlugs: [],
  toggleWishlist: () => {},
  isInWishlist: () => false,
});

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("warehouse_wishlist");
    if (saved) {
      try {
        setWishlistSlugs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleWishlist = (slug: string) => {
    setWishlistSlugs((prev) => {
      const isPresent = prev.includes(slug);
      const updated = isPresent ? prev.filter(s => s !== slug) : [...prev, slug];
      localStorage.setItem("warehouse_wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (slug: string) => wishlistSlugs.includes(slug);

  return (
    <WishlistContext.Provider value={{ wishlistSlugs: isLoaded ? wishlistSlugs : [], toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
