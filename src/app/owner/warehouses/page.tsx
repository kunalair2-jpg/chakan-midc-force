import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import Link from "next/link";
import { Edit, Eye, MoreHorizontal, TrendingUp } from "lucide-react";

export default function WarehousesPage() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="My Warehouses">
        <div className="section-head">
          <div>
            <p>Manage your active listings, view views, and update availability.</p>
          </div>
          <Link className="primary" href="/owner/new">
            Add warehouse
          </Link>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Location</th>
              <th>Area Available</th>
              <th>Status</th>
              <th>Views (30d)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Navi Mumbai Cold Chain Hub", "Navi Mumbai", "26,000 sq ft", "Live", "1,204"],
              ["Fulfillment Park Gurugram", "Gurugram", "45,000 sq ft", "Live", "856"],
              ["Tech Logistics Campus", "Bengaluru", "18,500 sq ft", "Draft", "0"],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>
                  <span className={`status ${row[3] === 'Live' ? 'green' : 'gray'}`}>
                    {row[3]}
                  </span>
                </td>
                <td>
                  {row[4] !== "0" && <TrendingUp size={14} color="#0f766e" style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'text-bottom' }} />}
                  {row[4]}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="secondary" style={{ padding: '6px' }}><Edit size={16} /></button>
                    {row[3] === 'Live' && <button className="secondary" style={{ padding: '6px' }}><Eye size={16} /></button>}
                    <button className="secondary" style={{ padding: '6px' }}><MoreHorizontal size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardShell>
    </div>
  );
}
