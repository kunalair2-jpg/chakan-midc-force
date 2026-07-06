import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="Account Settings">
        <div className="panel" style={{ maxWidth: '600px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: '0 0 16px 0', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>Company Profile</h3>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              Company Name
              <input type="text" defaultValue="SpaceDock Logistics Partners" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--line)' }} />
            </label>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              GSTIN
              <input type="text" defaultValue="27AADCS1234A1Z5" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--line)' }} />
            </label>
            
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              Primary Contact Email
              <input type="email" defaultValue="owner@spacedock.com" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--line)' }} />
            </label>

            <h3 style={{ margin: '24px 0 16px 0', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>Payout Details</h3>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              Bank Account Number
              <input type="text" defaultValue="**** **** 4567" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--line)' }} />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', fontWeight: 700 }}>
              IFSC Code
              <input type="text" defaultValue="HDFC0001234" style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--line)' }} />
            </label>

            <button type="button" className="primary" style={{ marginTop: '16px', alignSelf: 'flex-start' }}>
              <Save size={16} style={{ marginRight: '8px' }} /> Save Changes
            </button>
          </form>
        </div>
      </DashboardShell>
    </div>
  );
}
