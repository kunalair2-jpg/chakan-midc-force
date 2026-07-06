import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import { TrendingUp, Users, MousePointerClick } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="Analytics & Performance">
        <div className="stat-grid" style={{ marginBottom: '32px' }}>
          <div className="stat">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={16} /> Total Profile Views</span>
            <strong>3,402</strong>
            <span style={{ color: '#0f766e', fontSize: '12px', marginTop: '4px' }}>+12% this month</span>
          </div>
          <div className="stat">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MousePointerClick size={16} /> Lead Conversion</span>
            <strong>4.2%</strong>
            <span style={{ color: '#0f766e', fontSize: '12px', marginTop: '4px' }}>+0.8% this month</span>
          </div>
          <div className="stat">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={16} /> Avg Market Rate</span>
            <strong>₹28/sqft</strong>
            <span style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>Pune Region</span>
          </div>
        </div>

        <div className="panel" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--muted)' }}>
          <TrendingUp size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <h3>Detailed Analytics Chart</h3>
          <p>Traffic and conversion metrics will appear here.</p>
        </div>
      </DashboardShell>
    </div>
  );
}
