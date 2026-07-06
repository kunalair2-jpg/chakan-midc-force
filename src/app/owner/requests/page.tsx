import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import { Check, X, FileText } from "lucide-react";

export default function RequestsPage() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="Booking Requests">
        <p className="muted" style={{ marginBottom: '24px' }}>Review incoming inquiries from verified B2B companies.</p>

        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-scroll">
            <table className="table" style={{ margin: 0, border: 'none' }}>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Requirement</th>
                  <th>Move-in Date</th>
                  <th>Lead Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["FreshCart Foods", "18,000 sq ft Cold Storage", "Aug 1, 2026", "High"],
                  ["UrbanKart", "32,000 sq ft E-commerce", "Sep 15, 2026", "Medium"],
                  ["Medline Supply", "12,000 sq ft Pharma Grade", "Oct 1, 2026", "High"],
                ].map((row, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{row[0]}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Verified Business</div>
                    </td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>
                      <span className={`status ${row[3] === 'High' ? 'green' : 'gold'}`}>{row[3]}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="primary" style={{ padding: '6px 12px', fontSize: '12px' }}><FileText size={14} style={{ marginRight: '4px' }}/> Send Quote</button>
                        <button className="secondary" style={{ padding: '6px' }}><X size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}
