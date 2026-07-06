"use client";

import { useState } from "react";
import { CalendarDays, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";
import { categories } from "@/lib/warehouses";
import { submitBookingAction } from "@/app/actions";

export function BookingForm({ warehouse }: { warehouse: any }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [actionType, setActionType] = useState<"quote" | "message" | null>(null);

  const handleSubmit = async (e: React.FormEvent, type: "quote" | "message" = "quote") => {
    e.preventDefault();
    setActionType(type);
    setStatus("loading");
    
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      // Append hidden fields needed by the server action
      formData.append("warehouse_slug", warehouse.slug);
      formData.append("warehouse_title", warehouse.title);
      formData.append("request_type", type);
      
      await submitBookingAction(formData);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeIn 0.4s ease" }}>
        <style>{`
          @keyframes scaleIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .success-icon {
            animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}</style>
        <CheckCircle2 size={56} color="#0f766e" className="success-icon" style={{ margin: "0 auto 16px" }} />
        <h3 style={{ fontSize: "20px", marginBottom: "8px", color: "#0f172a", fontWeight: 800 }}>
          {actionType === "quote" ? "Quote Requested!" : "Message Sent!"}
        </h3>
        <p style={{ color: "#64748b", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
          {actionType === "quote" 
            ? "The warehouse owner has been notified and will send a custom quote shortly. You can track this in your dashboard."
            : "The owner will reply to you soon. You'll receive an email notification when they respond."}
        </p>
        <button 
          onClick={() => setStatus("idle")}
          style={{ 
            background: "#f1f5f9", 
            color: "#334155", 
            border: "1px solid #cbd5e1", 
            padding: "12px 24px", 
            borderRadius: "12px", 
            fontWeight: 700, 
            cursor: "pointer",
            width: "100%",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "#e2e8f0"}
          onMouseOut={(e) => e.currentTarget.style.background = "#f1f5f9"}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        .spin-anim {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <form onSubmit={(e) => handleSubmit(e, "quote")}>
        <div className="input-group">
          <label>Required Area (sq ft)</label>
          <input name="area_requested" type="number" required className="float-input" placeholder={`e.g. ${warehouse.available}`} defaultValue={warehouse.available} />
        </div>
        
        <div className="input-group">
          <label>Storage Type</label>
          <select name="storage_type" className="float-select" defaultValue={warehouse.category}>
            <option value={warehouse.category}>{warehouse.category}</option>
            {categories.filter(c => c !== "All" && c !== warehouse.category).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Move-in Date</label>
          <input name="move_in_date" type="date" required className="float-input" />
        </div>

        <div className="input-group">
          <label>Requirements & Goods Type</label>
          <textarea name="requirements" required className="float-textarea" placeholder="Tell the owner about your handling needs, compliance requirements, and what goods you're storing..."></textarea>
        </div>

        <button 
          type="submit" 
          className="btn-gradient"
          disabled={status === "loading"}
          style={{ opacity: status === "loading" && actionType === "quote" ? 0.8 : 1 }}
        >
          {status === "loading" && actionType === "quote" ? <Loader2 size={20} className="spin-anim" /> : <CalendarDays size={20} />}
          {status === "loading" && actionType === "quote" ? "Sending Request..." : "Request Official Quote"}
        </button>

        <button 
          type="button" 
          className="btn-outline"
          onClick={(e) => handleSubmit({ currentTarget: e.currentTarget.closest('form'), preventDefault: () => {} } as any, "message")}
          disabled={status === "loading"}
          style={{ opacity: status === "loading" && actionType === "message" ? 0.7 : 1 }}
        >
          {status === "loading" && actionType === "message" ? <Loader2 size={20} className="spin-anim" /> : <MessageSquare size={20} />}
          {status === "loading" && actionType === "message" ? "Sending..." : "Message Owner"}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '16px', lineHeight: 1.5 }}>
          You won't be charged yet. The owner will review your requirement and confirm availability.
        </p>
      </form>
    </>
  );
}
