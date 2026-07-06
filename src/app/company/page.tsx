import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";

export default function CompanyDashboard() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Company procurement workspace" title="Track warehouse searches and quotes">
        <div className="stat-grid">
          <div className="stat">
            <span>Saved spaces</span>
            <strong>9</strong>
          </div>
          <div className="stat">
            <span>Open requests</span>
            <strong>6</strong>
          </div>
          <div className="stat">
            <span>Quotes received</span>
            <strong>4</strong>
          </div>
          <div className="stat">
            <span>Active bookings</span>
            <strong>2</strong>
          </div>
        </div>

        <div className="section-head">
          <div>
            <h2>Quotes awaiting decision</h2>
            <p>Compare price, area, deposit, and compliance before confirming.</p>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Warehouse</th>
              <th>Area</th>
              <th>Monthly rent</th>
              <th>Valid until</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cold Chain Hub", "18,000 sq ft", "₹12.9L", "04 Jul", "Received"],
              ["Fulfillment Park", "28,000 sq ft", "₹13.7L", "06 Jul", "Viewed"],
              ["Industrial Yard", "50,000 sq ft", "₹17.0L", "08 Jul", "Negotiating"],
            ].map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>
                  <span className="status blue">{row[4]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardShell>
    </div>
  );
}
