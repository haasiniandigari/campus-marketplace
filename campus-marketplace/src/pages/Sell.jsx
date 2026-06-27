import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Textbooks", "Gadgets", "Hostel Essentials", "Apparel", "Instruments", "Lab Gear", "Furniture", "Electronics", "Other"];
const CONDITIONS = ["Brand New", "Like New", "Good", "Fair", "For Parts"];

export default function Sell() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = details, 2 = success
  const [form, setForm] = useState({ title: "", category: "", condition: "", price: "", description: "", image: null });
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    const existing = JSON.parse(localStorage.getItem("cb_listings") || "[]");
    const newListing = {
      id: Date.now(),
      emoji: "📦",
      name: form.title,
      price: `₹${form.price}`,
      tag: form.category,
      condition: form.condition,
      description: form.description,
      age: "Just now",
    };
    localStorage.setItem("cb_listings", JSON.stringify([newListing, ...existing]));
    setLoading(false);
    setStep(2);
  }, 1400);
};

  if (step === 2) return <SuccessScreen onHome={() => navigate("/")} onAnother={() => { setStep(1); setForm({ title: "", category: "", condition: "", price: "", description: "", image: null }); }} />;

  return (
    <>
      <style>{`
        @keyframes fade-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        .sell-card { animation: fade-up 0.5s cubic-bezier(.22,1,.36,1) both; }
        .form-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-label { font-size: 0.8rem; font-weight: 500; color: var(--muted2); letter-spacing: 0.03em; text-transform: uppercase; }
        .form-input { background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 10px; padding: 0.75rem 1rem; color: var(--text); font-size: 0.9rem; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.18s, box-shadow 0.18s; width: 100%; }
        .form-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(0,230,118,0.1); }
        .form-input::placeholder { color: var(--muted); }
        select.form-input { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23555' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.9rem center; padding-right: 2.2rem; }
        select.form-input option { background: #1a1a1a; color: var(--text); }
        .drop-zone { border: 2px dashed var(--border); border-radius: 14px; padding: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; cursor: pointer; transition: border-color 0.2s, background 0.2s; text-align: center; }
        .drop-zone:hover, .drop-zone.drag-active { border-color: var(--green); background: rgba(0,230,118,0.04); }
        .cond-btn { flex: 1; min-width: 80px; padding: 0.5rem 0.4rem; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px; color: var(--muted2); font-size: 0.78rem; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.18s; white-space: nowrap; }
        .cond-btn:hover { border-color: var(--border-hover); color: var(--text); }
        .cond-btn-active { border-color: var(--green) !important; color: var(--green) !important; background: rgba(0,230,118,0.08) !important; }
        .submit-btn { width: 100%; padding: 0.8rem; background: var(--green); color: #000; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 700; font-family: 'Syne', sans-serif; cursor: pointer; transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,230,118,0.35); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .progress-bar { height: 2px; background: var(--border); border-radius: 99px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--green); border-radius: 99px; transition: width 1.2s cubic-bezier(.22,1,.36,1); box-shadow: 0 0 8px var(--green); }
      `}</style>

      <div style={{ minHeight: "90vh", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "3rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(0,230,118,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="sell-card" style={{ width: "100%", maxWidth: "560px", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ marginBottom: "2rem" }}>
            <button onClick={() => navigate(-1)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "none", color: "var(--muted2)", cursor: "pointer", fontSize: "0.85rem", fontFamily: "inherit", marginBottom: "1.25rem", padding: 0, transition: "color 0.18s" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
              Back
            </button>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.03em", marginBottom: "0.3rem" }}>
              Post a listing
            </h1>
            <p style={{ color: "var(--muted2)", fontSize: "0.88rem" }}>Fill in the details and reach 340+ students instantly.</p>
            <div className="progress-bar" style={{ marginTop: "1.25rem" }}>
              <div className="progress-fill" style={{ width: loading ? "100%" : "45%" }} />
            </div>
          </div>

          {/* Form card */}
          <form onSubmit={submit} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Image upload */}
            <div className="form-field">
              <label className="form-label">Photo</label>
              <div
                className={`drop-zone ${dragOver ? "drag-active" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); setForm(f => ({ ...f, image: e.dataTransfer.files[0] })); }}
                onClick={() => document.getElementById("img-input").click()}
              >
                <input id="img-input" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setForm(f => ({ ...f, image: e.target.files[0] }))} />
                {form.image ? (
                  <>
                    <span style={{ fontSize: "1.5rem" }}>✅</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--green)" }}>{form.image.name}</span>
                  </>
                ) : (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
                    <span style={{ fontSize: "0.85rem", color: "var(--muted2)" }}>Drag & drop or click to upload</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>PNG, JPG up to 10MB</span>
                  </>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="form-field">
              <label className="form-label">Title</label>
              <input name="title" className="form-input" placeholder="e.g. Engineering Maths Vol. 2" value={form.title} onChange={handle} required />
            </div>

            {/* Category + Condition row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-field">
                <label className="form-label">Category</label>
                <select name="category" className="form-input" value={form.category} onChange={handle} required>
                  <option value="" disabled>Select…</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Price (₹)</label>
                <input name="price" type="number" className="form-input" placeholder="0" value={form.price} onChange={handle} required min="0" />
              </div>
            </div>

            {/* Condition */}
            <div className="form-field">
              <label className="form-label">Condition</label>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {CONDITIONS.map(c => (
                  <button key={c} type="button" className={`cond-btn ${form.condition === c ? "cond-btn-active" : ""}`} onClick={() => setForm(f => ({ ...f, condition: c }))}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="form-field">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-input" placeholder="Describe the item — age, any defects, reason for selling…" value={form.description} onChange={handle} rows={4} style={{ resize: "vertical", lineHeight: 1.6 }} />
            </div>

            <button type="submit" className="submit-btn" disabled={loading || !form.title || !form.category || !form.price || !form.condition}>
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Publishing…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Publish Listing
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--muted)", marginTop: "1rem" }}>
            Zero commission · Your listing goes live instantly
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

function SuccessScreen({ onHome, onAnother }) {
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div style={{ animation: "fade-up 0.55s cubic-bezier(.22,1,.36,1) both" }}>
        <div style={{ width: "72px", height: "72px", background: "rgba(0,230,118,0.12)", border: "1px solid rgba(0,230,118,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2rem" }}>🎉</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Listing published!</h2>
        <p style={{ color: "var(--muted2)", fontSize: "0.9rem", marginBottom: "2rem" }}>Your item is now live for 340+ students to see.</p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button onClick={onHome} style={{ padding: "0.6rem 1.4rem", background: "var(--green)", color: "#000", border: "none", borderRadius: "10px", fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer", fontSize: "0.9rem" }}>Go Home</button>
          <button onClick={onAnother} style={{ padding: "0.6rem 1.4rem", background: "transparent", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "10px", fontFamily: "inherit", cursor: "pointer", fontSize: "0.9rem" }}>Post Another</button>
        </div>
      </div>
    </div>
  );
}