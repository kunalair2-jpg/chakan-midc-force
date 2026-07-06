"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Building2, ClipboardList, CreditCard, FileCheck, Home, MessageSquare, Settings } from "lucide-react";

const items = [
  { label: "Overview", icon: Home, href: "/owner" },
  { label: "Warehouses", icon: Building2, href: "/owner/warehouses" },
  { label: "Requests", icon: ClipboardList, href: "/owner/requests" },
  { label: "Quotes", icon: FileCheck, href: "/owner/quotes" },
  { label: "Payments", icon: CreditCard, href: "/owner/payments" },
  { label: "Messages", icon: MessageSquare, href: "/owner/messages" },
  { label: "Analytics", icon: BarChart3, href: "/owner/analytics" },
  { label: "Settings", icon: Settings, href: "/owner/settings" },
];

export function DashboardShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        {items.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href || pathname?.startsWith(href + '/');
          const finalActive = isActive && (href !== "/owner" || pathname === "/owner");
          
          return (
            <Link className={finalActive ? "active" : ""} href={href} key={label}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </aside>
      <main className="dashboard-main">
        <p className="muted">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
      </main>
    </div>
  );
}
