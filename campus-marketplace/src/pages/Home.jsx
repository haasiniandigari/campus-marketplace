import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  { icon: "📚", label: "Textbooks" },
  { icon: "💻", label: "Gadgets" },
  { icon: "🛏️", label: "Hostel Essentials" },
  { icon: "👟", label: "Apparel" },
  { icon: "🎸", label: "Instruments" },
  { icon: "🧪", label: "Lab Gear" },
];

const ALL_LISTINGS = [
  { emoji: "📖", name: "Engineering Maths Vol. 2", price: "₹180", tag: "Textbooks", age: "2d ago" },
  { emoji: "🖥️", name: 'Dell Monitor 24"', price: "₹4,500", tag: "Gadgets", age: "5h ago" },
  { emoji: "🪑", name: "Study Chair (Ergonomic)", price: "₹900", tag: "Hostel Essentials", age: "1d ago" },
  { emoji: "🎧", name: "Sony WH-1000XM4", price: "₹8,200", tag: "Gadgets", age: "3h ago" },
  { emoji: "📐", name: "Engineering Drawing Kit", price: "₹250", tag: "Lab Gear", age: "4d ago" },
  { emoji: "👕", name: "College Hoodie (L)", price: "₹350", tag: "Apparel", age: "6h ago" },
  { emoji: "🎸", name: "Acoustic Guitar", price: "₹2,800", tag: "Instruments", age: "3d ago" },
  { emoji: "💡", name: "LED Desk Lamp", price: "₹399", tag: "Hostel Essentials", age: "1d ago" },
];

export default function Home() {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);

useEffect(() => {
  const fetchListings = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/listings')
      const data = await res.json()
      const mapped = data.map(l => ({
        id: l._id,
        emoji: '📦',
        name: l.title,
        price: `₹${l.price}`,
        tag: l.category,
        condition: l.condition,
        description: l.description,
        age: new Date(l.createdAt).toLocaleDateString(),
        image: l.image,
      }))
      setUserListings(mapped)
    } catch (err) {
      console.error('Failed to fetch listings', err)
    }
  }
  fetchListings()
}, [])

  // Filter listings by search query AND active category
  const ALL_COMBINED = [...userListings, ...ALL_LISTINGS];
  const filtered = ALL_COMBINED.filter((item) => {
    const matchesQuery =
      query.trim() === "" ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.tag.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      activeCategory === null || item.tag === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const handleCategoryClick = (label) => {
    setActiveCategory((prev) => (prev === label ? null : label)); // toggle off on re-click
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // query state already drives the filter — nothing extra needed
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      hero.querySelectorAll("[data-anim]").forEach((el, i) => {
        el.style.transitionDelay = `${i * 120}ms`;
        el.classList.add("anim-in");
      });
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        [data-anim] { opacity:0; transform:translateY(28px); transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1); }
        .anim-in[data-anim], .anim-in [data-anim] { opacity:1 !important; transform:none !important; }
        .card-anim { opacity:0; transform:translateY(20px) scale(0.97); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.22,1,.36,1); }
        .card-visible { opacity:1 !important; transform:none !important; }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .ticker-track { animation: ticker 28s linear infinite; white-space:nowrap; display:inline-flex; gap:2.5rem; }
        .ticker-wrap { overflow:hidden; }
        @keyframes orb-float {
          0%,100%{transform:translateX(-50%) scale(1);}
          33%{transform:translateX(calc(-50% + 30px)) translateY(-20px) scale(1.04);}
          66%{transform:translateX(calc(-50% - 20px)) translateY(15px) scale(0.97);}
        }
        .orb { animation: orb-float 9s ease-in-out infinite; }
        .listing-card { transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s; border: 1px solid var(--border); cursor: pointer; }
        .listing-card:hover { transform: translateY(-4px); box-shadow: 0 0 0 1px var(--green), 0 12px 40px rgba(0,230,118,0.08); border-color: var(--green); }
        .cat-pill { transition: background 0.2s, transform 0.2s, box-shadow 0.2s, border-color 0.2s; border: 1px solid var(--border); cursor: pointer; }
        .cat-pill:hover { background: var(--green-glow) !important; border-color: var(--green); transform: translateY(-2px); }
        .cat-pill-active { background: var(--green-glow) !important; border-color: var(--green) !important; color: var(--green) !important; }
        .search-wrap { background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 14px; display:flex; align-items:center; padding: 0.6rem 0.6rem 0.6rem 1.1rem; gap: 0.5rem; transition: border-color 0.2s, box-shadow 0.2s; }
        .search-wrap:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(0,230,118,0.1); }
        .search-wrap input { background:transparent; border:none; outline:none; color:var(--text); font-size:0.9rem; font-family:'DM Sans',sans-serif; flex:1; min-width:0; }
        .search-wrap input::placeholder { color: var(--muted); }
        .noise::after { content:''; position:absolute; inset:0; pointer-events:none; border-radius:inherit; z-index:0; }
        .empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 4rem 2rem; gap:0.75rem; color:var(--muted2); text-align:center; }
      `}</style>

      {/* HERO */}
      <section ref={heroRef} style={{ position:"relative", padding:"6rem 2rem 4rem", textAlign:"center", overflow:"hidden" }}>
        <div className="orb" style={{ position:"absolute", top:"-80px", left:"50%", width:"560px", height:"560px", background:"radial-gradient(circle, rgba(0,230,118,0.13) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(30px)", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:"720px", margin:"0 auto" }}>

          <div data-anim style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(0,230,118,0.1)", border:"1px solid rgba(0,230,118,0.25)", borderRadius:"99px", padding:"0.3rem 0.9rem", marginBottom:"1.8rem", fontSize:"0.78rem", color:"var(--green)", fontWeight:500, letterSpacing:"0.04em" }}>
            <span style={{ width:6, height:6, background:"var(--green)", borderRadius:"50%", display:"inline-block", boxShadow:"0 0 6px var(--green)" }} />
            LIVE ON YOUR CAMPUS
          </div>

          <h1 data-anim style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(2.4rem, 6vw, 4rem)", lineHeight:1.1, letterSpacing:"-0.03em", marginBottom:"1.25rem", color:"var(--text)" }}>
            Buy & Sell within your{" "}
            <span style={{ color:"var(--green)", position:"relative", display:"inline-block" }}>
              campus
              <svg style={{ position:"absolute", bottom:"-6px", left:0, width:"100%", height:"6px" }} viewBox="0 0 100 6" preserveAspectRatio="none">
                <path d="M0,4 Q25,0 50,4 Q75,8 100,4" stroke="#00e676" strokeWidth="1.5" fill="none" opacity="0.7" />
              </svg>
            </span>
          </h1>

          <p data-anim style={{ fontSize:"clamp(1rem, 2.5vw, 1.15rem)", color:"var(--muted2)", fontWeight:300, lineHeight:1.65, marginBottom:"2.5rem" }}>
            Hostel essentials, textbooks, gadgets and more —<br />trusted trades between students, for students.
          </p>

          {/* ── SEARCH BAR ── */}
          <form data-anim onSubmit={handleSearch} className="search-wrap" style={{ maxWidth:"520px", margin:"0 auto 2rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search for books, gadgets, furniture…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--muted)", display:"flex", alignItems:"center", padding:"0 0.2rem", flexShrink:0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
            <button type="submit" style={{ background:"var(--green)", color:"#000", border:"none", borderRadius:"10px", padding:"0.5rem 1.1rem", cursor:"pointer", fontWeight:700, fontSize:"0.85rem", fontFamily:"'Syne',sans-serif", flexShrink:0, transition:"transform 0.18s, box-shadow 0.18s" }}>
              Search
            </button>
          </form>

          <div data-anim style={{ display:"flex", justifyContent:"center", gap:"2.5rem", fontSize:"0.82rem", color:"var(--muted2)" }}>
            {[["1,200+","Active Listings"],["340+","Students"],["4.9★","Avg. Rating"]].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign:"center" }}>
                <div style={{ color:"var(--text)", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem" }}>{val}</div>
                <div>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap" style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", padding:"0.75rem 0", marginBottom:"3.5rem", background:"var(--surface)" }}>
        <div className="ticker-track" style={{ fontSize:"0.78rem", color:"var(--muted)", letterSpacing:"0.06em", textTransform:"uppercase" }}>
          {Array(2).fill(["📚 Textbooks","💻 Laptops","🛏 Hostel Gear","🎧 Headphones","🪑 Furniture","🔬 Lab Equipment","📷 Cameras","🎮 Gaming","👕 Apparel","🧴 Stationery"]).flat().map((item, i) => (
            <span key={i} style={{ marginRight:"2.5rem" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section style={{ padding:"0 2rem 2.5rem", maxWidth:"900px", margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.3rem", marginBottom:"1.4rem", letterSpacing:"-0.02em" }}>Browse by category</h2>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem" }}>
          {CATEGORIES.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => handleCategoryClick(label)}
              className={`cat-pill ${activeCategory === label ? "cat-pill-active" : ""}`}
              style={{ background:"var(--surface)", borderRadius:"12px", padding:"0.6rem 1.1rem", display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.88rem", color: activeCategory === label ? "var(--green)" : "var(--text)", fontFamily:"inherit" }}
            >
              <span style={{ fontSize:"1.1rem" }}>{icon}</span>{label}
            </button>
          ))}
          {activeCategory && (
            <button onClick={() => setActiveCategory(null)} style={{ background:"transparent", border:"1px solid var(--border)", borderRadius:"12px", padding:"0.6rem 1.1rem", fontSize:"0.82rem", color:"var(--muted2)", fontFamily:"inherit", cursor:"pointer" }}>
              Clear ✕
            </button>
          )}
        </div>
      </section>

      {/* LISTINGS */}
      <section style={{ padding:"0 2rem 5rem", maxWidth:"900px", margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.4rem" }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.3rem", letterSpacing:"-0.02em" }}>
            {query || activeCategory ? `Results (${filtered.length})` : "Recent listings"}
          </h2>
          {(query || activeCategory) && (
            <button onClick={() => { setQuery(""); setActiveCategory(null); }} style={{ fontSize:"0.82rem", color:"var(--green)", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit" }}>
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <span style={{ fontSize:"2.5rem" }}>🔍</span>
            <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, color:"var(--text)", fontSize:"1rem" }}>No listings found</p>
            <p style={{ fontSize:"0.85rem" }}>Try a different search or category</p>
            <button onClick={() => { setQuery(""); setActiveCategory(null); }} style={{ marginTop:"0.5rem", background:"none", border:"1px solid var(--border)", borderRadius:"8px", padding:"0.45rem 1rem", color:"var(--muted2)", cursor:"pointer", fontFamily:"inherit", fontSize:"0.85rem" }}>
              Show all listings
            </button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"1rem" }}>
            {filtered.map(({ emoji, name, price, tag, age }, i) => (
              <div key={name} className="listing-card card-anim" ref={(el) => (cardsRef.current[i] = el)} onClick={() => setSelectedListing(filtered[i])} style={{ background:"var(--surface)", borderRadius:"14px", padding:"1.2rem" }}>
                <div style={{ fontSize:"2.5rem", marginBottom:"0.9rem", background:"rgba(255,255,255,0.04)", borderRadius:"10px", width:"52px", height:"52px", display:"flex", alignItems:"center", justifyContent:"center" }}>{emoji}</div>
                <div style={{ fontSize:"0.7rem", color:"var(--green)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.3rem" }}>{tag}</div>
                <div style={{ fontWeight:500, fontSize:"0.9rem", marginBottom:"0.6rem", lineHeight:1.35 }}>{name}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.05rem", color:"var(--green)" }}>{price}</span>
                  <span style={{ fontSize:"0.72rem", color:"var(--muted2)" }}>{age}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA BANNER */}
      <section style={{ padding:"0 2rem 5rem", maxWidth:"900px", margin:"0 auto" }}>
        <div className="noise" style={{ position:"relative", background:"linear-gradient(135deg, #0a1f12, #0d2a18)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:"20px", padding:"2.8rem 2.5rem", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"180px", height:"180px", background:"radial-gradient(circle, rgba(0,230,118,0.15) 0%, transparent 70%)", borderRadius:"50%", zIndex:0 }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.6rem", letterSpacing:"-0.02em", marginBottom:"0.5rem" }}>Got something to sell?</h3>
            <p style={{ color:"var(--muted2)", fontSize:"0.9rem", marginBottom:"1.4rem" }}>Post your listing in under 60 seconds — zero commission.</p>
            <button onClick={() => navigate("/sell")} style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"var(--green)", color:"#000", border:"none", borderRadius:"10px", padding:"0.7rem 1.8rem", fontWeight:700, fontSize:"0.95rem", cursor:"pointer", fontFamily:"'Syne',sans-serif", transition:"transform 0.18s, box-shadow 0.18s" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Start Selling
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:"1px solid var(--border)", padding:"1.5rem 2rem", textAlign:"center", fontSize:"0.78rem", color:"var(--muted)" }}>
        © 2025 campusbazaar · Made for students, by students
      </footer>

      {/* LISTING DETAIL MODAL */}
      {selectedListing && (
        <div onClick={() => setSelectedListing(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"1.5rem", backdropFilter:"blur(6px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background:"var(--surface)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"20px", padding:"2rem", maxWidth:"460px", width:"100%", position:"relative" }}>
            <button onClick={() => setSelectedListing(null)} style={{ position:"absolute", top:"1rem", right:"1rem", background:"rgba(255,255,255,0.07)", border:"none", borderRadius:"8px", width:"30px", height:"30px", color:"var(--muted2)", cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
            <div style={{ fontSize:"3rem", marginBottom:"1rem", background:"rgba(255,255,255,0.04)", width:"64px", height:"64px", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center" }}>{selectedListing.emoji}</div>
            <div style={{ fontSize:"0.7rem", color:"var(--green)", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.4rem" }}>{selectedListing.tag}</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.3rem", marginBottom:"0.75rem", lineHeight:1.3 }}>{selectedListing.name}</h2>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.8rem", color:"var(--green)", marginBottom:"1rem" }}>{selectedListing.price}</div>
            {selectedListing.condition && (
              <div style={{ marginBottom:"0.5rem", fontSize:"0.85rem", color:"var(--muted2)" }}>Condition: <span style={{ color:"var(--text)" }}>{selectedListing.condition}</span></div>
            )}
            {selectedListing.description && (
              <div style={{ marginBottom:"0.75rem", fontSize:"0.85rem", color:"var(--muted2)", lineHeight:1.6 }}>{selectedListing.description}</div>
            )}
            <div style={{ fontSize:"0.75rem", color:"var(--muted)", marginBottom:"1.5rem" }}>Listed {selectedListing.age}</div>
            <button onClick={() => setSelectedListing(null)} style={{ width:"100%", padding:"0.75rem", background:"var(--green)", color:"#000", border:"none", borderRadius:"10px", fontWeight:700, fontFamily:"'Syne',sans-serif", cursor:"pointer", fontSize:"0.9rem" }}>
              Contact Seller
            </button>
          </div>
        </div>
      )}
    </>
  );
}