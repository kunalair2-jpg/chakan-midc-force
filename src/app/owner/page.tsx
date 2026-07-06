import Link from "next/link";
import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import { createClient } from "@/utils/supabase/server";

export default async function OwnerDashboard() {
  const supabase = await createClient();
  const { data: requests } = await supabase
    .from("booking_requests")
    .select("*")
    .order("created_at", { ascending: false });

  const bookingRequests = requests || [];

  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="Manage spaces, quotes, and bookings">
        <div className="stat-grid">
          <div className="stat">
            <span>Live warehouses</span>
            <strong>12</strong>
          </div>
          <div className="stat">
            <span>Pending requests</span>
            <strong>18</strong>
          </div>
          <div className="stat">
            <span>Occupancy</span>
            <strong>78%</strong>
          </div>
          <div className="stat">
            <span>Monthly revenue</span>
            <strong>₹18.4L</strong>
          </div>
        </div>

        <div className="section-head">
          <div>
            <h2>Recent booking requests</h2>
            <p>Review lead details, create quotes, and block capacity after acceptance.</p>
          </div>
          <Link className="primary" href="/owner/new">
            Add warehouse
          </Link>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Warehouse</th>
              <th>Area</th>
              <th>Need</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingRequests.length > 0 ? bookingRequests.map((req: any) => (
              <tr key={req.id}>
                <td>{req.company_name}</td>
                <td>{req.warehouse_title}</td>
                <td>{req.area_requested.toLocaleString()} sq ft</td>
                <td>{req.storage_type}</td>
                <td>
                  <span className={`status ${req.status === 'Pending' ? 'gold' : 'green'}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "#64748b", padding: "32px" }}>
                  No booking requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </DashboardShell>
    </div>
  );
}
