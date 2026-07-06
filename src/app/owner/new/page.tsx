"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowLeft, ArrowRight, Save, Building2, MapPin, Ruler, Zap, IndianRupee, Image as ImageIcon, UploadCloud } from "lucide-react";
import { Header } from "@/components/Header";
import { categories } from "@/lib/warehouses";
import { addWarehouseAction } from "@/app/actions";

const STEPS = [
  { id: 1, title: "Basic Details", icon: Building2 },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Infrastructure", icon: Ruler },
  { id: 4, title: "Compliance", icon: Zap },
  { id: 5, title: "Pricing", icon: IndianRupee },
  { id: 6, title: "Photos", icon: ImageIcon },
];

export default function NewWarehousePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading-draft" | "loading-submit" | "success-draft" | "success-submit">("idle");
  const [fileCount, setFileCount] = useState(0);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormAction = async (formData: FormData) => {
    const type = formData.get("actionType") === "draft" ? "draft" : "submit";
    setStatus(type === "draft" ? "loading-draft" : "loading-submit");
    setErrorMessage(null);

    try {
      await addWarehouseAction(formData);
      setStatus(type === "draft" ? "success-draft" : "success-submit");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const handleNext = () => {
    const form = document.getElementById("wizard-form") as HTMLFormElement;
    if (form && form.checkValidity()) {
      setCurrentStep(s => Math.min(s + 1, 6));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      form?.reportValidity();
    }
  };

  const handlePrev = () => {
    setCurrentStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevent the browser's implicit "Enter submits the form" behavior. Since
  // only the active step's fields are `required` at any given time, a stray
  // Enter key press (e.g. while a select or the file picker has focus) would
  // otherwise pass validation instantly and submit the listing early.
  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === "Enter" && target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  if (status === "success-submit" || status === "success-draft") {
    const isDraft = status === "success-draft";
    return (
      <div className="shell">
        <Header />
        <main className="container section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
          <style>{`
            @keyframes scaleIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          `}</style>
          <div style={{ animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <CheckCircle2 size={72} color={isDraft ? "#1f6feb" : "#0f766e"} style={{ margin: '0 auto 24px' }} />
          </div>
          <h1 style={{ marginBottom: '16px', fontSize: '32px', color: '#0f172a' }}>
            {isDraft ? "Draft Saved Successfully!" : "Listing Submitted Successfully!"}
          </h1>
          <p style={{ color: '#64748b', maxWidth: '440px', marginBottom: '36px', fontSize: '16px', lineHeight: 1.6 }}>
            {isDraft 
              ? "Your comprehensive warehouse listing has been saved as a draft. You can come back and complete it later before publishing."
              : "Your detailed warehouse listing has been submitted for admin review. Our team will verify the specifications within 24 hours. Once verified, it will be live on the marketplace!"}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/owner" className="secondary" style={{ padding: '14px 24px', borderRadius: '12px' }}>
              <ArrowLeft size={18} /> Back to Dashboard
            </Link>
            <button className="primary" onClick={() => { setStatus("idle"); setCurrentStep(1); }} style={{ padding: '14px 24px', borderRadius: '12px' }}>
              {isDraft ? "Continue Editing" : "Add Another Space"}
            </button>
          </div>
        </main>
      </div>
    );
  }

  const ActiveIcon = STEPS[currentStep - 1].icon;

  return (
    <div className="shell">
      <Header />
      <style>{`
        .form-panel {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(17, 54, 99, 0.05);
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .form-grid label {
          font-size: 13.5px;
          color: #334155;
          font-weight: 800;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .form-input {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          padding: 16px;
          border-radius: 12px;
          font-size: 15px;
          color: #0f172a;
          transition: all 0.2s ease;
          width: 100%;
        }
        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
        }
        .form-input:focus {
          background: white;
          border-color: #1f6feb;
          box-shadow: 0 0 0 4px #eaf2ff;
          outline: none;
        }
        .form-input::placeholder {
          color: #94a3b8;
          font-weight: 500;
        }
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 8px;
        }
        .checkbox-item {
          display: flex !important;
          flex-direction: row !important;
          align-items: center;
          gap: 10px !important;
          font-weight: 600 !important;
          color: #475569 !important;
          cursor: pointer;
        }
        .checkbox-item input {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        
        /* Stepper UI */
        .stepper {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          position: relative;
        }
        .stepper::before {
          content: "";
          position: absolute;
          top: 24px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e2e8f0;
          z-index: 0;
        }
        .stepper-progress {
          position: absolute;
          top: 24px;
          left: 0;
          height: 2px;
          background: #1f6feb;
          z-index: 1;
          transition: width 0.4s ease;
        }
        .step-item {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 80px;
        }
        .step-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #94a3b8;
          transition: all 0.3s ease;
        }
        .step-item.active .step-circle {
          border-color: #1f6feb;
          background: #1f6feb;
          color: white;
          box-shadow: 0 4px 12px rgba(31, 111, 235, 0.25);
        }
        .step-item.completed .step-circle {
          border-color: #1f6feb;
          color: #1f6feb;
          background: white;
        }
        .step-label {
          font-size: 13px;
          font-weight: 700;
          color: #64748b;
          text-align: center;
          transition: color 0.3s ease;
        }
        .step-item.active .step-label {
          color: #0f172a;
        }

        .step-content {
          animation: fadeIn 0.4s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .wizard-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #e2e8f0;
          gap: 16px;
          flex-wrap: wrap;
        }
        .wizard-actions-buttons {
          display: flex;
          gap: 16px;
        }

        .photo-preview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        @media (max-width: 720px) {
          .form-panel {
            padding: 24px;
          }
          .step-label {
            font-size: 11px;
          }
          .checkbox-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .photo-preview-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .form-panel {
            padding: 18px;
          }
          .stepper {
            padding: 0 2px;
          }
          .step-item {
            width: auto;
            gap: 6px;
          }
          .step-circle {
            width: 36px;
            height: 36px;
          }
          .stepper::before,
          .stepper-progress {
            top: 18px;
          }
          .step-label {
            display: none;
          }
          .wizard-actions {
            flex-direction: column-reverse;
            align-items: stretch;
          }
          .wizard-actions-buttons {
            flex-direction: column;
            width: 100%;
          }
          .wizard-actions-buttons button {
            width: 100%;
          }
        }
      `}</style>
      <main className="container section" style={{ maxWidth: '840px' }}>
        <div className="section-head" style={{ marginBottom: '32px' }}>
          <div>
            <Link href="/owner" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontWeight: 700, marginBottom: '20px', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1f6feb'} onMouseOut={e => e.currentTarget.style.color = '#64748b'}>
              <ArrowLeft size={16} /> Back to dashboard
            </Link>
            <h1 style={{ fontSize: '36px', margin: '0 0 8px 0', color: '#0f172a' }}>List a new space</h1>
            <p style={{ fontSize: '16px' }}>Complete the steps below to create a premium listing.</p>
          </div>
        </div>

        <div className="stepper">
          <div className="stepper-progress" style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}></div>
          {STEPS.map((step) => (
            <div key={step.id} className={`step-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}>
              <div className="step-circle">
                {currentStep > step.id ? <CheckCircle2 size={24} /> : <step.icon size={20} />}
              </div>
              <span className="step-label">{step.title}</span>
            </div>
          ))}
        </div>

        <form id="wizard-form" className="form-panel" action={handleFormAction} onKeyDown={handleFormKeyDown}>
          {errorMessage && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '14px 18px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', fontWeight: 600 }}>
              {errorMessage}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
            <ActiveIcon size={28} color="#1f6feb" />
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>{STEPS[currentStep - 1].title}</h2>
          </div>

          {/* STEP 1: Basic Details */}
          <div className="step-content form-grid" style={{ display: currentStep === 1 ? 'grid' : 'none' }}>
            <label className="full">
              Warehouse Name
              <input name="title" required={currentStep === 1} className="form-input" placeholder="e.g. Navi Mumbai Cold Chain Hub" />
            </label>
            <label>
              City
              <input name="city" required={currentStep === 1} className="form-input" placeholder="e.g. Pune, Navi Mumbai" />
            </label>
            <label>
              Micro-market / Area
              <select name="microMarket" required={currentStep === 1} className="form-input" defaultValue="">
                <option value="" disabled>Select area</option>
                <option>Chakan</option>
                <option>Talegaon</option>
                <option>Ranjangaon</option>
                <option>Pimpri Chinchwad</option>
                <option>Hinjewadi</option>
                <option>Sanaswadi</option>
                <option>Kuruli</option>
                <option>Shikrapur</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Storage Type
              <select name="category" required={currentStep === 1} className="form-input" defaultValue="">
                <option value="" disabled>Select primary type</option>
                {categories.filter(c => c !== "All").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Available Area (sq ft)
              <input name="area" required={currentStep === 1} type="number" className="form-input" placeholder="e.g. 26000" />
            </label>
            <label className="full">
              Detailed Description
              <textarea name="description" required={currentStep === 1} className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="Describe access, docks, clear height, power backup, compliance, and ideal use cases." />
            </label>
          </div>

          {/* STEP 2: Location & Connectivity */}
          <div className="step-content form-grid" style={{ display: currentStep === 2 ? 'grid' : 'none' }}>
            <label>
              Distance from Highway
              <select name="highwayDistance" required={currentStep === 2} className="form-input" defaultValue="">
                <option value="" disabled>Select distance</option>
                <option>Within 1 km</option>
                <option>Within 2 km</option>
                <option>Within 5 km</option>
                <option>Within 10 km</option>
              </select>
            </label>
            <label>
              Distance from Airport
              <select name="airportDistance" required={currentStep === 2} className="form-input" defaultValue="">
                <option value="" disabled>Select distance</option>
                <option>Under 20 km</option>
                <option>20–40 km</option>
                <option>40–60 km</option>
              </select>
            </label>
            <label>
              Distance from Railway Station
              <select name="railwayDistance" required={currentStep === 2} className="form-input" defaultValue="">
                <option value="" disabled>Select distance</option>
                <option>Under 5 km</option>
                <option>5–15 km</option>
                <option>15–30 km</option>
              </select>
            </label>
            <label>
              Road Access Width
              <select name="roadWidth" required={currentStep === 2} className="form-input" defaultValue="">
                <option value="" disabled>Select width</option>
                <option>9 m road</option>
                <option>12 m road</option>
                <option>18 m+ road</option>
              </select>
            </label>
            <div className="full" style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', gap: '32px' }}>
                <label className="checkbox-item"><input type="checkbox" /> Inside MIDC Zone</label>
                <label className="checkbox-item"><input type="checkbox" defaultChecked /> 40-ft Container Accessible</label>
              </div>
            </div>
            <label className="full">
              Near Landmarks / OEM Plants (Select all that apply)
              <div className="checkbox-grid">
                {['Volkswagen', 'Bajaj Auto', 'Mahindra', 'Mercedes-Benz', 'Tata Motors', 'IndoSpace'].map(lm => (
                  <label className="checkbox-item" key={lm}><input type="checkbox" /> {lm}</label>
                ))}
              </div>
            </label>
          </div>

          {/* STEP 3: Infrastructure */}
          <div className="step-content form-grid" style={{ display: currentStep === 3 ? 'grid' : 'none' }}>
            <label>
              Warehouse Grade
              <select name="grade" required={currentStep === 3} className="form-input" defaultValue="">
                <option value="" disabled>Select grade</option>
                <option>Grade A</option>
                <option>Grade B</option>
                <option>Grade C</option>
              </select>
            </label>
            <label>
              Flooring Type
              <select name="flooring" required={currentStep === 3} className="form-input" defaultValue="">
                <option value="" disabled>Select flooring</option>
                <option>Trimix</option>
                <option>Tremix</option>
                <option>VDF</option>
                <option>Epoxy-coated</option>
                <option>Plain concrete</option>
              </select>
            </label>
            <label>
              Clear Height at Centre (m)
              <input name="clearHeight" required={currentStep === 3} type="number" step="0.5" className="form-input" placeholder="e.g. 12" />
            </label>
            <label>
              Floor Load Capacity (MT/sqm)
              <input name="floorLoad" required={currentStep === 3} type="number" step="0.5" className="form-input" placeholder="e.g. 5" />
            </label>
          </div>

          {/* STEP 4: Compliance */}
          <div className="step-content form-grid" style={{ display: currentStep === 4 ? 'grid' : 'none' }}>
            <label>
              Sanctioned Power Load (KVA)
              <input name="powerLoad" required={currentStep === 4} type="number" className="form-input" placeholder="e.g. 150" />
            </label>
            <label>
              Power Backup
              <select name="powerBackup" required={currentStep === 4} className="form-input" defaultValue="">
                <option value="" disabled>Select backup</option>
                <option>Full DG backup</option>
                <option>Partial backup</option>
                <option>No backup</option>
              </select>
            </label>
            <label>
              Fire Safety System
              <select name="fireSafety" required={currentStep === 4} className="form-input" defaultValue="">
                <option value="" disabled>Select fire safety</option>
                <option>Fire sprinkler</option>
                <option>Fire hydrant</option>
                <option>Extinguishers only</option>
                <option>None</option>
              </select>
            </label>
            <div className="full" style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', gridColumn: '2' }}>
              <label className="checkbox-item" style={{ margin: 0 }}>
                <input type="checkbox" defaultChecked /> Fire NOC Confirmed
              </label>
            </div>
          </div>

          {/* STEP 5: Pricing */}
          <div className="step-content form-grid" style={{ display: currentStep === 5 ? 'grid' : 'none' }}>
            <label>
              Asking Price (₹/sqft/month)
              <input name="price" required={currentStep === 5} type="number" step="0.1" className="form-input" placeholder="e.g. 24" />
            </label>
            <label>
              Minimum Lock-in Period
              <select name="minLease" required={currentStep === 5} className="form-input" defaultValue="">
                <option value="" disabled>Select duration</option>
                <option>No lock-in</option>
                <option>3 months</option>
                <option>6 months</option>
                <option>1 year</option>
                <option>3+ years</option>
              </select>
            </label>
            <label>
              Available From
              <input name="availableFrom" required={currentStep === 5} type="date" className="form-input" />
            </label>
          </div>

          {/* STEP 6: Photos */}
          <div className="step-content form-grid" style={{ display: currentStep === 6 ? 'grid' : 'none', gridTemplateColumns: '1fr' }}>
            <label style={{ cursor: 'pointer' }}>
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', background: fileCount > 0 ? '#eaf2ff' : '#f8fafc', transition: 'border 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }} onMouseOver={e => e.currentTarget.style.borderColor = '#1f6feb'} onMouseOut={e => e.currentTarget.style.borderColor = '#cbd5e1'}>
                <div style={{ background: '#eaf2ff', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UploadCloud size={32} color="#1f6feb" />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Upload Warehouse Photos</h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Click here to select high-quality images of the exterior, docks, and interior.</p>
                  <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '12px' }}>Supported formats: JPG, PNG, WEBP (Max 5MB per file)</p>
                </div>
                
                <input 
                  type="file" 
                  name="images" 
                  multiple 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      setFileCount(files.length);
                      // Clear old previews to avoid memory leaks
                      imagePreviews.forEach(url => URL.revokeObjectURL(url));
                      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
                      setImagePreviews(newPreviews);
                    }
                  }}
                />
                
                <span className="secondary" style={{ marginTop: '8px', padding: '10px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'inline-block' }}>
                  {fileCount > 0 ? `${fileCount} file(s) selected` : "Browse Files"}
                </span>
              </div>
            </label>
            
            {imagePreviews.length > 0 && (
              <div className="photo-preview-grid">
                 {imagePreviews.map((url, i) => (
                   <div key={i} style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                     <img src={url} alt={`Preview ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   </div>
                 ))}
              </div>
            )}
          </div>
          
          <div className="wizard-actions">
            {currentStep > 1 ? (
              <button type="button" className="secondary" onClick={handlePrev} style={{ padding: '14px 24px', borderRadius: '12px' }}>
                <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back
              </button>
            ) : (
              <div></div> // Empty div for flex spacing
            )}

            <div className="wizard-actions-buttons">
              <button 
                type="submit"
                name="actionType"
                value="draft"
                className="secondary" 
                disabled={status !== "idle"}
                style={{ padding: '14px 24px', borderRadius: '12px', background: '#f8fafc' }}
                onClick={(e) => {
                  const form = e.currentTarget.closest("form");
                  if (form && !form.checkValidity()) {
                    e.preventDefault();
                    form.reportValidity();
                    return;
                  }
                  if (fileCount === 0) {
                    e.preventDefault();
                    setErrorMessage("Please upload at least one photo of the warehouse space before saving. Go to the Photos step to add one.");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                {status === "loading-draft" ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} style={{ marginRight: '8px' }} />}
                Save Draft
              </button>

              {currentStep < 6 ? (
                <button type="button" className="primary" onClick={handleNext} style={{ padding: '14px 28px', borderRadius: '12px', background: '#102a56' }}>
                  Next Step <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                </button>
              ) : (
                <button 
                  type="submit" 
                  name="actionType"
                  value="submit"
                  className="primary"
                  disabled={status !== "idle"}
                  style={{ padding: '14px 28px', borderRadius: '12px', background: 'linear-gradient(135deg, #1f6feb, #0c4a6e)', border: 'none', boxShadow: '0 12px 24px rgba(31, 111, 235, 0.25)' }}
                  onClick={(e) => {
                    const form = e.currentTarget.closest("form");
                    if (form && !form.checkValidity()) {
                      e.preventDefault();
                      form.reportValidity();
                      return;
                    }
                    if (fileCount === 0) {
                      e.preventDefault();
                      setErrorMessage("Please upload at least one photo of the warehouse space before submitting.");
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {status === "loading-submit" ? <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} /> : null}
                  Submit Listing
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
