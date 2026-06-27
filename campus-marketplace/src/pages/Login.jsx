import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

 const submit = async (e) => {
  e.preventDefault()
  setLoading(true)
  try {
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message)
    localStorage.setItem('cb_token', data.token)
    localStorage.setItem('cb_user', JSON.stringify(data.user))
    navigate('/')
  } catch (err) {
    alert(err.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <>
      <style>{`
        @keyframes fade-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        .login-card { animation: fade-up 0.55s cubic-bezier(.22,1,.36,1) both; }
        .field { background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 10px; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.6rem; transition: border-color 0.18s, box-shadow 0.18s; }
        .field:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(0,230,118,0.1); }
        .field input { background: transparent; border: none; outline: none; color: var(--text); font-size: 0.9rem; font-family: 'DM Sans', sans-serif; width: 100%; }
        .field input::placeholder { color: var(--muted); }
        .field svg { flex-shrink: 0; color: var(--muted); }
        .submit-btn { width: 100%; padding: 0.75rem; background: var(--green); color: #000; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 700; font-family: 'Syne', sans-serif; cursor: pointer; transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,230,118,0.35); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .tab { flex: 1; padding: 0.5rem; background: transparent; border: none; color: var(--muted2); font-size: 0.875rem; font-family: 'DM Sans', sans-serif; cursor: pointer; border-radius: 8px; transition: color 0.18s, background 0.18s; }
        .tab-active { color: var(--text); background: rgba(255,255,255,0.07); font-weight: 500; }
        .divider { display: flex; align-items: center; gap: 1rem; color: var(--muted); font-size: 0.78rem; }
        .divider::before, .divider::after { content:''; flex:1; height:1px; background: var(--border); }
        .social-btn { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.65rem; background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 0.875rem; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.18s, border-color 0.18s; }
        .social-btn:hover { background: rgba(255,255,255,0.08); border-color: var(--border-hover); }
      `}</style>

      <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>
        {/* Background orb */}
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />

        <div className="login-card" style={{ width: "100%", maxWidth: "400px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", padding: "2rem", position: "relative", zIndex: 1 }}>

          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)" }}>
                campus<span style={{ color: "var(--green)" }}>bazaar</span>
              </span>
            </Link>
            <p style={{ fontSize: "0.82rem", color: "var(--muted2)", marginTop: "0.3rem" }}>Your campus, your marketplace</p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "0.25rem", marginBottom: "1.5rem", gap: "0.25rem" }}>
            <button className={`tab ${mode === "login" ? "tab-active" : ""}`} onClick={() => setMode("login")}>Log in</button>
            <button className={`tab ${mode === "signup" ? "tab-active" : ""}`} onClick={() => setMode("signup")}>Sign up</button>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {mode === "signup" && (
              <div className="field">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input name="name" placeholder="Full name" value={form.name} onChange={handle} required />
              </div>
            )}
            <div className="field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input name="email" type="email" placeholder="College email address" value={form.email} onChange={handle} required />
            </div>
            <div className="field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required />
            </div>

            {mode === "login" && (
              <div style={{ textAlign: "right" }}>
                <a href="#" style={{ fontSize: "0.78rem", color: "var(--green)", textDecoration: "none" }}>Forgot password?</a>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading} style={{ marginTop: "0.25rem" }}>
              {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>

          <div className="divider" style={{ margin: "1.25rem 0" }}>or continue with</div>

          <button className="social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--muted2)", marginTop: "1.25rem" }}>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} style={{ background: "none", border: "none", color: "var(--green)", cursor: "pointer", fontSize: "0.78rem", fontFamily: "inherit" }}>
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}