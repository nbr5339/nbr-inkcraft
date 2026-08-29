import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WA, PHONE_DISPLAY, FB_PAGE, MSN_PAGE, getProductBySlug } from "../data/products.js";

const or = "#FF6B00";
const blue = "#1a56c4";

const OptionGroup = ({ label, choices, selected, onSelect }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ fontWeight: 700, fontSize: 14, color: or, marginBottom: 10 }}>{label}:</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10 }}>
      {choices.map(opt => (
        <button key={opt} onClick={() => onSelect(opt)}
          style={{
            padding: "10px 14px", borderRadius: 6, fontSize: 13, fontWeight: 600, textAlign: "left", cursor: "pointer",
            border: `1.5px solid ${selected === opt ? blue : "#ddd"}`,
            background: selected === opt ? "rgba(26,86,196,0.06)" : "#fff",
            color: selected === opt ? blue : "#333",
          }}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  const [qty, setQty] = useState(1);
  const [selections, setSelections] = useState(() => {
    const init = {};
    if (product?.options) {
      product.options.forEach(g => { init[g.label] = g.choices[0]; });
    }
    return init;
  });
  const [activeImg, setActiveImg] = useState(product?.gallery?.[0] ?? product?.img ?? null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "Outfit, sans-serif" }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>প্রোডাক্টটি খুঁজে পাওয়া যায়নি</div>
        <Link to="/" style={{ color: blue, fontWeight: 700, textDecoration: "none" }}>← হোমপেজে ফিরে যান</Link>
      </div>
    );
  }

  const setSelection = (label, value) => setSelections(s => ({ ...s, [label]: value }));

  const waLines = [
    `Hello NBR InkCraft!`,
    `প্রোডাক্ট: ${product.bn}`,
    ...(product.options ?? []).map(g => `${g.label}: ${selections[g.label] ?? ""}`),
    `পরিমাণ: ${qty}`,
  ];
  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(waLines.join("\n"))}`;

  return (
    <div style={{ fontFamily: "Outfit, sans-serif", background: "#f8f6f3", minHeight: "100vh", padding: "28px 5% 80px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');`}</style>

      <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#666", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 20 }}>
        ← হোমপেজে ফিরে যান
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 32, alignItems: "start" }} className="pp-grid">
        {/* ══ LEFT: Gallery ══ */}
        <div>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 10, overflow: "hidden", aspectRatio: "1.15", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {activeImg ? (
              <img src={activeImg} alt={product.bn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "#b8a99a" }}>
                <span style={{ fontSize: 60 }}>{product.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>ছবি শীঘ্রই আসছে</span>
              </div>
            )}
          </div>
          {product.gallery && product.gallery.length > 1 && (
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              {product.gallery.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(g)}
                  style={{ width: 68, height: 68, padding: 0, borderRadius: 8, overflow: "hidden", border: `2px solid ${activeImg === g ? blue : "#eee"}`, cursor: "pointer", background: "#fff" }}>
                  <img src={g} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 16, marginTop: 18, fontSize: 12, color: "#666", flexWrap: "wrap" }}>
            <span>📘 /{FB_PAGE}</span>
            <span>💬 {PHONE_DISPLAY}</span>
          </div>
        </div>

        {/* ══ RIGHT: Info + Options ══ */}
        <div>
          <div style={{ background: blue, borderRadius: 8, padding: "16px 20px", marginBottom: 16 }}>
            <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0, textAlign: "center" }}>{product.bn}</h1>
          </div>

          <div style={{ background: "#fdf3ea", border: "1px solid #f0dfc9", borderRadius: 8, padding: "14px 20px", marginBottom: 20, textAlign: "center" }}>
            {product.priceMin ? (
              <span style={{ color: or, fontSize: 22, fontWeight: 800 }}>৳{product.priceMin} - ৳{product.priceMax}</span>
            ) : (
              <span style={{ color: "#e74c3c", fontSize: 16, fontWeight: 700 }}>বর্তমানে স্টকে নেই</span>
            )}
          </div>

          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 20, marginBottom: 20 }}>
            {(product.options ?? []).map(g => (
              <OptionGroup key={g.label} label={g.label} choices={g.choices} selected={selections[g.label]} onSelect={v => setSelection(g.label, v)} />
            ))}

            <div style={{ borderTop: "1px solid #eee", paddingTop: 18, display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>পরিমাণ</span>
              <input type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
                style={{ width: 70, padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd", fontSize: 14 }} />
              <button onClick={() => setAdded(true)}
                style={{ flex: 1, background: blue, color: "#fff", border: "none", borderRadius: 6, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                {added ? "✓ কার্টে যোগ হয়েছে" : "কার্টে যোগ করুন"}
              </button>
            </div>
          </div>

          {product.inStock ? (
            <>
              <a href={waLink} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#22c55e", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 0", borderRadius: 8, textDecoration: "none", marginBottom: 12 }}>
                💬 হোয়াটসঅ্যাপে অর্ডার করুন
              </a>
              <a href={`https://m.me/${MSN_PAGE}`} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: blue, color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 0", borderRadius: 8, textDecoration: "none", marginBottom: 20 }}>
                ✈ মেসেঞ্জারে অর্ডার করুন
              </a>
            </>
          ) : (
            <div style={{ textAlign: "center", color: "#e74c3c", fontWeight: 700, fontSize: 14, padding: "14px 0", marginBottom: 20 }}>
              এই মুহূর্তে অর্ডার নেওয়া সম্ভব নয় — স্টকে নেই
            </div>
          )}

          <div style={{ background: or, color: "#fff", textAlign: "center", fontWeight: 700, fontSize: 13, padding: "12px 0", borderRadius: 6 }}>
            অর্ডার করতে অথবা অন্যকিছু জানতে কল করুন অথবা মেসেজ দিন
          </div>
        </div>
      </div>

      {/* ══ DESCRIPTION + SIDEBAR ══ */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, marginTop: 32 }} className="pp-grid">
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ background: blue, color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 20px" }}>প্রোডাক্ট ডেসক্রিপশন</div>
          {product.description ? (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <tbody>
                {product.description.map(([k, v], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 700, color: "#333", width: "30%", verticalAlign: "top" }}>{k}</td>
                    <td style={{ padding: "12px 20px", color: "#555", lineHeight: 1.6 }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: 20, fontSize: 13, color: "#777" }}>প্রোডাক্টের বিস্তারিত বিবরণ শীঘ্রই যোগ করা হবে।</div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            ["📞", PHONE_DISPLAY, "কল করুন (সকাল ১০টা - রাত ৮টা)"],
            ["🚚", "হোম ডেলিভারি সেবা", "সারাদেশে দ্রুত ও নির্ভরযোগ্য ডেলিভারি (শর্ত প্রযোজ্য)"],
            ["🔒", "সিকিউর পেমেন্ট", "আপনার পেমেন্ট সম্পূর্ণ নিরাপদ এবং বিশ্বস্ত। নিশ্চিন্তে অর্ডার করুন।"],
          ].map(([icon, title, desc], i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .pp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
