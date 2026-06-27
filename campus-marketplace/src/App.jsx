import { Routes, Route, NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Sell from "./pages/Sell.jsx";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "My Listings", to: "/my-listings" },
  { label: "Saved", to: "/saved" },
  { label: "Messages", to: "/messages" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (!e.target.closest("#navbar")) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  return (
    <nav id="navbar" style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(8,8,8,0.96)" : "rgba(8,8,8,0.75)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
      transition: "background 0.3s, box-shadow 0.3s",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", height: 62, display: "flex", alignItems: "center", gap: "1rem" }}>

        {/* LOGO */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontSize: "1.15rem" }}>🏛️</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "#f0f0f0", letterSpacing: "-0.025em" }}>
            campus<span style={{ color: "#00e676" }}>bazaar</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul style={{ display: "flex", alignItems: "center", gap: "0.15rem", listStyle: "none", marginLeft: "0.75rem", flex: 1 }}
          className="desktop-links">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={to === "/"}
                style={({ isActive }) => ({
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#f0f0f0" : "#888",
                  textDecoration: "none",
                  borderRadius: "8px",
                  background: "transparent",
                  transition: "color 0.18s, background 0.18s",
                  whiteSpace: "nowrap",
                })}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span style={{
                        position: "absolute", bottom: -1, left: "50%", transform: "translateX(-50%)",
                        width: 18, height: 2, background: "#00e676",
                        borderRadius: 99, boxShadow: "0 0 8px #00e676",
                      }} />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto", flexShrink: 0 }}>
          {/* Bell */}
          <Link to="/login" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "transparent", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 9, color: "#888", textDecoration: "none", flexShrink: 0 }} className="desktop-only">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, background: "#00e676", borderRadius: "50%", border: "1.5px solid #080808", boxShadow: "0 0 5px #00e676" }} />
          </Link>

          {/* Avatar */}
          <Link to="/login" className="desktop-only" style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00e676,#009944)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 800, color: "#000", fontFamily: "'Syne',sans-serif", textDecoration: "none", flexShrink: 0 }}>
            H
          </Link>

          {/* Sell button */}
          <Link to="/sell" style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.45rem 1rem", background: "#00e676", color: "#000", borderRadius: 9, fontSize: "0.85rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, transition: "transform 0.18s, box-shadow 0.18s" }} className="desktop-only">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Sell
          </Link>

          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: 5, width: 36, height: 36, background: "transparent", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 9, cursor: "pointer", padding: "0 9px" }}
          >
            <span style={{ display: "block", height: 1.5, background: "#888", borderRadius: 99, transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", height: 1.5, background: "#888", borderRadius: 99, opacity: menuOpen ? 0 : 1, transition: "opacity 0.25s" }} />
            <span style={{ display: "block", height: 1.5, background: "#888", borderRadius: 99, transition: "transform 0.25s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div style={{ overflow: "hidden", maxHeight: menuOpen ? 380 : 0, opacity: menuOpen ? 1 : 0, borderTop: menuOpen ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent", transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s" }} className="mobile-drawer">
        <ul style={{ listStyle: "none", padding: "0.75rem 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                end={to === "/"}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  display: "flex", alignItems: "center", gap: "0.65rem",
                  padding: "0.65rem 0.75rem", fontSize: "0.88rem",
                  color: isActive ? "#f0f0f0" : "#888",
                  textDecoration: "none", borderRadius: 9,
                  background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                })}
              >
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.13)", flexShrink: 0 }} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div style={{ padding: "0.75rem 1.5rem 1rem" }}>
          <Link to="/sell" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", width: "100%", padding: "0.7rem 1rem", background: "#00e676", color: "#000", borderRadius: 10, fontSize: "0.9rem", fontWeight: 700, fontFamily: "'Syne',sans-serif", textDecoration: "none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Post a Listing
          </Link>
        </div>
      </div>
    </nav>
  );
}

function PlaceholderPage({ title, icon }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "1rem", color: "#888", fontFamily: "'Syne', sans-serif" }}>
      <span style={{ fontSize: "3rem" }}>{icon}</span>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f0f0f0" }}>{title}</h2>
      <p style={{ fontSize: "0.9rem" }}>Coming soon...</p>
      <Link to="/" style={{ marginTop: "0.5rem", color: "#00e676", fontSize: "0.85rem", textDecoration: "none" }}>← Back to Home</Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green: #00e676; --green-glow: rgba(0,230,118,0.18);
          --bg: #080808; --surface: #111; --border: rgba(255,255,255,0.07);
          --border-hover: rgba(255,255,255,0.13); --text: #f0f0f0; --muted: #555; --muted2: #888;
        }
        body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }

        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .desktop-only { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-drawer { display: none !important; }
        }

        a:hover { opacity: 0.85; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/my-listings" element={<PlaceholderPage title="My Listings" icon="📋" />} />
          <Route path="/saved" element={<PlaceholderPage title="Saved Items" icon="🔖" />} />
          <Route path="/messages" element={<PlaceholderPage title="Messages" icon="💬" />} />
        </Routes>
      </div>
    </>
  );
}