import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import { Receipt } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="Payments & Invoices">
        <div className="stat-grid" style={{ marginBottom: '32px' }}>
          <div className="stat">
            <span>Next Payout</span>
            <strong>₹4.2L</strong>
          </div>
          <div className="stat">
            <span>Outstanding</span>
            <strong>₹0.00</strong>
          </div>
          <div className="stat">
            <span>YTD Revenue</span>
            <strong>₹1.2Cr</strong>
          </div>
        </div>

        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="table" style={{ margin: 0, border: 'none' }}>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Tenant</th>
                <th>Amount</th>
                <th>Date Issued</th>
                <th>Status</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["INV-2026-089", "Apex Retail", "₹4,20,000", "Jul 01, 2026", "Paid"],
                ["INV-2026-088", "Global Logistics", "₹8,50,000", "Jun 01, 2026", "Paid"],
                ["INV-2026-087", "MegaMart", "₹2,10,000", "May 01, 2026", "Paid"],
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row[0]}</td>
                  <td style={{ fontWeight: 600 }}>{row[1]}</td>
                  <td style={{ fontWeight: 700 }}>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td><span className="status green">{row[4]}</span></td>
                  <td>
                    <button className="secondary" style={{ padding: '6px' }}><Receipt size={16} /></button>
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
