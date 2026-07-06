import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";

export default function AdminDashboard() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Platform admin control room" title="Approve listings and monitor marketplace health">
        <div className="stat-grid">
          <div className="stat">
            <span>Pending approvals</span>
            <strong>23</strong>
          </div>
          <div className="stat">
            <span>Gross booking value</span>
            <strong>₹2.8Cr</strong>
          </div>
          <div className="stat">
            <span>Verified owners</span>
            <strong>148</strong>
          </div>
          <div className="stat">
            <span>Support tickets</span>
            <strong>7</strong>
          </div>
        </div>

        <div className="section-head">
          <div>
            <h2>Listings requiring review</h2>
            <p>Check photos, documents, pricing, and compliance before publishing.</p>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Warehouse</th>
              <th>Owner</th>
              <th>City</th>
              <th>Documents</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Pune Pharma Vault", "Sahyadri Logistics", "Pune", "5 uploaded", "Under review"],
              ["Jaipur Dry Storage", "Northwest Parks", "Jaipur", "3 uploaded", "Changes needed"],
              ["Chennai Port Yard", "Bayline Infra", "Chennai", "6 uploaded", "Ready"],
            ].map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>
                  <span className="status green">{row[4]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardShell>
    </div>
  );
}
