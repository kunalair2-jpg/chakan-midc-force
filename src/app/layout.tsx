import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { WishlistProvider } from "@/lib/WishlistContext";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chakan MIDC Force",
  description: "Find, compare, request, and book verified warehouse space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
