import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import { CheckCircle2, Download } from "lucide-react";

export default function QuotesPage() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="Active Quotes">
        <p className="muted" style={{ marginBottom: '24px' }}>Track the status of quotes sent to prospective tenants.</p>
        
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="table" style={{ margin: 0, border: 'none' }}>
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Company</th>
                <th>Warehouse</th>
                <th>Monthly Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["#QT-2026-001", "FreshCart Foods", "Cold Chain Hub", "₹12.5L", "Sent"],
                ["#QT-2026-002", "LogiTech Solutions", "Pune East Hub", "₹8.2L", "Accepted"],
                ["#QT-2026-003", "AutoParts India", "Chakan Industrial", "₹4.8L", "Negotiating"],
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1f6feb' }}>{row[0]}</td>
                  <td style={{ fontWeight: 600 }}>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td style={{ fontWeight: 700 }}>{row[3]}</td>
                  <td>
                    <span className={`status ${row[4] === 'Accepted' ? 'green' : row[4] === 'Sent' ? 'blue' : 'gold'}`}>{row[4]}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="secondary" style={{ padding: '6px' }}><Download size={14} /></button>
                      {row[4] === 'Accepted' && <button className="primary" style={{ padding: '6px 12px', fontSize: '12px' }}><CheckCircle2 size={14} style={{ marginRight: '4px' }}/> Convert to Lease</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardShell>
    </div>
  );
}
