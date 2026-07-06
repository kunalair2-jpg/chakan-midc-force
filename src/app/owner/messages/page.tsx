import { Header } from "@/components/Header";
import { DashboardShell } from "@/components/DashboardShell";
import { Send } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="shell">
      <Header />
      <DashboardShell eyebrow="Warehouse owner workspace" title="Messages">
        <p className="muted" style={{ marginBottom: '24px' }}>Communicate directly with verified leads and active tenants.</p>
        
        <div className="messages-layout">
          <div className="panel" style={{ padding: 0, overflowY: 'auto' }}>
            {['FreshCart Foods', 'UrbanKart', 'Medline Supply', 'LogiTech Solutions'].map((name, i) => (
              <div key={i} style={{ padding: '16px', borderBottom: '1px solid var(--line)', background: i === 0 ? 'var(--accent-soft)' : 'transparent', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ color: i === 0 ? 'var(--accent-dark)' : 'inherit' }}>{name}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>12m ago</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {i === 0 ? "Are the loading docks raised?" : "We need to schedule a site visit."}
                </div>
              </div>
            ))}
          </div>
          
          <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>FreshCart Foods</h3>
              <span className="muted" style={{ fontSize: '13px' }}>Re: Cold Chain Hub Inquiry</span>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ alignSelf: 'flex-start', background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', borderBottomLeftRadius: 0, maxWidth: '80%' }}>
                <p style={{ margin: 0, fontSize: '14px' }}>Hi, we are very interested in the Cold Chain Hub. Are the loading docks raised for 40-ft containers?</p>
                <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '8px' }}>Today, 10:45 AM</span>
              </div>
              <div style={{ alignSelf: 'flex-end', background: 'var(--accent)', color: 'white', padding: '12px 16px', borderRadius: '12px', borderBottomRightRadius: 0, maxWidth: '80%' }}>
                <p style={{ margin: 0, fontSize: '14px' }}>Hello! Yes, all 6 loading docks are raised with hydraulic dock levelers specifically designed for 40-ft containers.</p>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', display: 'block', marginTop: '8px' }}>Today, 10:57 AM</span>
              </div>
            </div>
            
            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid var(--line)', outline: 'none' }} />
              <button className="primary" style={{ borderRadius: '24px', width: '48px', height: '48px', padding: 0, display: 'grid', placeItems: 'center' }}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}
