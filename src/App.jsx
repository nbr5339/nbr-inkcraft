import { useEffect, useState, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════
   DATA & CONSTANTS
══════════════════════════════════════════════ */
const WA = "8801822044996";
const FB_PAGE = "NBRInkCraft";

const SLIDES = [
  {
    tag: "🏆 #1 Printing in Nilkhet, Dhaka",
    tag_bn: "🏆 নীলক্ষেতের সেরা প্রিন্টিং প্রেস",
    h1: ["PRINT", "BEYOND", "LIMITS."],
    h1_bn: ["প্রিন্ট", "সীমা", "ছাড়িয়ে।"],
    p: "Premium quality printing for business cards, flyers, books, ID cards & packaging. Fast turnaround, best prices in Dhaka.",
    p_bn: "বিজনেস কার্ড, ফ্লায়ার, বই, আইডি কার্ড ও প্যাকেজিং — সর্বোচ্চ মানের প্রিন্ট সার্ভিস।",
    accent: "#FF6B00",
    glow: "rgba(255,107,0,0.3)",
  },
  {
    tag: "⚡ Express 24-Hour Delivery",
    tag_bn: "⚡ ২৪ ঘণ্টা এক্সপ্রেস ডেলিভারি",
    h1: ["YOUR BRAND", "PRINTED", "PERFECTLY."],
    h1_bn: ["আপনার ব্র্যান্ড", "নিখুঁতভাবে", "মুদ্রিত।"],
    p: "From 100 to 100,000 copies — consistent quality every time. Bulk discounts available for all corporate orders.",
    p_bn: "১০০ থেকে ১ লাখ কপি — প্রতিবারই একই উচ্চমান। কর্পোরেট অর্ডারে বিশেষ ছাড়।",
    accent: "#FF6B00",
    glow: "rgba(255,107,0,0.25)",
  },
  {
    tag: "🎨 Free Design + Artwork Support",
    tag_bn: "🎨 বিনামূল্যে ডিজাইন সহায়তা",
    h1: ["DESIGN.", "PRINT.", "DELIVER."],
    h1_bn: ["ডিজাইন।", "প্রিন্ট।", "ডেলিভারি।"],
    p: "No design? No problem! Our expert team creates print-ready artwork for free. Send your idea and we handle the rest.",
    p_bn: "ডিজাইন নেই? চিন্তা নেই! আমাদের টিম বিনামূল্যে আর্টওয়ার্ক তৈরি করে দেবে।",
    accent: "#FF6B00",
    glow: "rgba(255,107,0,0.2)",
  },
];

const SERVICES = [
  { icon: "💼", en: "Business Cards", bn: "বিজনেস কার্ড", price: "From ৳299", desc_en: "Matte, glossy, spot-UV, embossed — premium finishes.", desc_bn: "ম্যাট, গ্লসি, স্পট-ইউভি, এমবসড — প্রিমিয়াম ফিনিশিং।" },
  { icon: "📄", en: "Flyers & Leaflets", bn: "ফ্লায়ার ও লিফলেট", price: "From ৳499", desc_en: "Full-color double-sided A4/A5 flyers, fast delivery.", desc_bn: "ফুল কালার ডবল সাইড A4/A5 ফ্লায়ার, দ্রুত ডেলিভারি।" },
  { icon: "🗓️", en: "Posters & Banners", bn: "পোস্টার ও ব্যানার", price: "From ৳199", desc_en: "Indoor, outdoor, roll-up, vinyl and foam banners.", desc_bn: "ইনডোর, আউটডোর, রোল-আপ, ভিনাইল ও ফোম ব্যানার।" },
  { icon: "📚", en: "Book Printing", bn: "বুক প্রিন্টিং", price: "৳8/page", desc_en: "Paperback, hardcover, spiral — offset & digital.", desc_bn: "পেপারব্যাক, হার্ডকভার, স্পাইরাল — অফসেট ও ডিজিটাল।" },
  { icon: "🪪", en: "ID & Access Cards", bn: "আইডি ও অ্যাক্সেস কার্ড", price: "From ৳49/pc", desc_en: "PVC, holographic, laminated student/employee IDs.", desc_bn: "পিভিসি, হলোগ্রাফিক, লেমিনেটেড আইডি কার্ড।" },
  { icon: "📦", en: "Packaging", bn: "প্যাকেজিং", price: "Custom", desc_en: "Custom boxes, paper bags, labels, food packaging.", desc_bn: "কাস্টম বক্স, পেপার ব্যাগ, লেবেল, ফুড প্যাকেজিং।" },
];

const GALLERY_ITEMS = [
  { icon: "💼", en: "Premium Business Cards", bn: "প্রিমিয়াম বিজনেস কার্ড", cat: "business", bg: "linear-gradient(135deg,#1a0f00,#2a1500)" },
  { icon: "📄", en: "Glossy A5 Flyers", bn: "গ্লসি A5 ফ্লায়ার", cat: "marketing", bg: "linear-gradient(135deg,#001520,#001a2a)" },
  { icon: "📚", en: "Hardcover Books", bn: "হার্ডকভার বই", cat: "books", bg: "linear-gradient(135deg,#00150d,#001a12)" },
  { icon: "🪪", en: "Holographic ID Cards", bn: "হলোগ্রাফিক আইডি কার্ড", cat: "id", bg: "linear-gradient(135deg,#150010,#1a0015)" },
  { icon: "📦", en: "Custom Gift Boxes", bn: "কাস্টম গিফট বক্স", cat: "packaging", bg: "linear-gradient(135deg,#150a00,#1a1000)" },
  { icon: "📜", en: "Roll-up Banners", bn: "রোল-আপ ব্যানার", cat: "signage", bg: "linear-gradient(135deg,#001515,#001a1a)" },
  { icon: "🗒️", en: "Spiral Notebooks", bn: "স্পাইরাল নোটবুক", cat: "books", bg: "linear-gradient(135deg,#0a1500,#0f1a00)" },
  { icon: "🛍️", en: "Paper Bags", bn: "পেপার ব্যাগ", cat: "packaging", bg: "linear-gradient(135deg,#0a0015,#0f001a)" },
  { icon: "📰", en: "Magazines", bn: "ম্যাগাজিন", cat: "books", bg: "linear-gradient(135deg,#001500,#001a00)" },
  { icon: "💡", en: "Neon Signs", bn: "নিয়ন সাইন", cat: "signage", bg: "linear-gradient(135deg,#150015,#1a001a)" },
  { icon: "🏷️", en: "Product Labels", bn: "প্রোডাক্ট লেবেল", cat: "packaging", bg: "linear-gradient(135deg,#150500,#1a0800)" },
  { icon: "🎓", en: "Thesis & Reports", bn: "থিসিস ও রিপোর্ট", cat: "books", bg: "linear-gradient(135deg,#001015,#00151a)" },
];

const PAYMENT_METHODS = [
  { name: "bKash", color: "#E2136E", icon: "💳", desc: "বিকাশে পেমেন্ট করুন" },
  { name: "Nagad", color: "#F58220", icon: "💰", desc: "নগদে পেমেন্ট করুন" },
  { name: "Rocket", color: "#8B2FC9", icon: "🚀", desc: "রকেটে পেমেন্ট করুন" },
  { name: "SSLCommerz", color: "#0066CC", icon: "🔒", desc: "SSL দিয়ে নিরাপদ পেমেন্ট" },
  { name: "Stripe", color: "#635BFF", icon: "💎", desc: "Card / International" },
  { name: "Cash on Delivery", color: "#22C55E", icon: "🏪", desc: "ক্যাশ অন ডেলিভারি" },
];

const PRICES = {
  "Business Card": { 100: 399, 500: 999, 1000: 1799 },
  "Flyer": { 100: 499, 500: 1499, 1000: 2499 },
  "Packaging": { 100: 1999, 500: 7999, 1000: 13999 },
};

const REVIEWS = [
  { name: "Rahim Ahmed", name_bn: "রহিম আহমেদ", review: "Amazing quality and super fast delivery. Best printing in Dhaka!", review_bn: "অসাধারণ মানের প্রিন্টিং ও দ্রুত ডেলিভারি। ঢাকার সেরা প্রিন্টিং!", stars: 5 },
  { name: "Tanvir Hasan", name_bn: "তানভীর হাসান", review: "Very professional team, premium finishing. Will order again!", review_bn: "খুব পেশাদার টিম, প্রিমিয়াম ফিনিশিং। আবার অর্ডার করব!", stars: 5 },
  { name: "Nusrat Jahan", name_bn: "নুসরাত জাহান", review: "Excellent service! My packaging looks stunning. Highly recommended.", review_bn: "চমৎকার সার্ভিস! আমার প্যাকেজিং অসাধারণ হয়েছে। সুপারিশ করি।", stars: 5 },
];

/* ══════════════════════════════════════════════
   SVG ICONS
══════════════════════════════════════════════ */
const WaSVG = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FbSVG = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.919 1.448 5.523 3.715 7.237V22l3.38-1.858c.903.25 1.86.385 2.845.385 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.07 12.45l-2.55-2.72-4.98 2.72 5.47-5.81 2.61 2.72 4.92-2.72-5.47 5.81z" />
  </svg>
);

/* ══════════════════════════════════════════════
   REUSABLE COMPONENTS
══════════════════════════════════════════════ */
const GlassCard = ({ children, className = "", hover3d = false, style = {} }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    if (!hover3d || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  }, [hover3d]);

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        transform: hover3d ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` : undefined,
        transition: hover3d ? "transform 0.15s ease" : "all 0.3s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const t = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(t); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const RevealOnScroll = ({ children, delay = 0 }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function NBRInkCraftPremium() {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);
  const [slide, setSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [galFilter, setGalFilter] = useState("all");
  const [calcProduct, setCalcProduct] = useState("Business Card");
  const [calcQty, setCalcQty] = useState("500");
  const [calcPaper, setCalcPaper] = useState("Matte");
  const [form, setForm] = useState({ name: "", phone: "", svc: "", del: "Standard (3–5 days)", msg: "" });
  const [sent, setSent] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [selectedPay, setSelectedPay] = useState(null);
  const [floatOpen, setFloatOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  const bn = lang === "bn";
  const or = "#FF6B00";

  // Scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto slider
  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Theme vars
  const BG = dark ? "#080808" : "#f8f6f3";
  const BG2 = dark ? "#111" : "#fff";
  const BG3 = dark ? "#181818" : "#f0ede8";
  const BORDER = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const TXT = dark ? "#f5f5f5" : "#111";
  const TXT2 = dark ? "#999" : "#555";
  const CARD_BG = dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)";
  const CARD_BORDER = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const estimate = () => {
    const base = PRICES[calcProduct]?.[Number(calcQty)] ?? 1999;
    return Math.round(calcPaper === "Glossy" ? base * 1.2 : base).toLocaleString();
  };

  const submitOrder = () => {
    if (!form.name || !form.phone || !form.svc) {
      alert(bn ? "অনুগ্রহ করে নাম, ফোন এবং সেবা পূরণ করুন।" : "Please fill name, phone and service.");
      return;
    }
    const msg = `Hello NBR InkCraft!%0A%0A*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Service:* ${form.svc}%0A*Delivery:* ${form.del}%0A*Details:* ${form.msg || "N/A"}`;
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
  };

  const inp = {
    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
    padding: "11px 14px",
    fontSize: 13,
    color: TXT,
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
  };

  const galCategories = ["all", "business", "marketing", "books", "id", "packaging", "signage"];
  const filteredGal = galFilter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === galFilter);

  const s = SLIDES[slide];

  return (
    <div style={{ background: BG, color: TXT, minHeight: "100vh", fontFamily: "'Outfit','Nunito',sans-serif", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>

      {/* ── FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#FF6B00;border-radius:2px}
        @keyframes wap{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 32px rgba(37,211,102,.7),0 0 0 12px rgba(37,211,102,.07)}}
        @keyframes orPulse{0%,100%{box-shadow:0 4px 20px rgba(255,107,0,.4)}50%{box-shadow:0 4px 32px rgba(255,107,0,.7),0 0 0 12px rgba(255,107,0,.07)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .srv-card:hover .srv-icon{background:#FF6B00!important;transform:scale(1.1) rotateY(10deg);}
        .pay-card:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 16px 40px rgba(0,0,0,0.3)!important;}
        .gal-item:hover .gal-overlay{opacity:1!important;}
        .gal-item:hover{transform:scale(1.04)!important;}
        input:focus,select:focus,textarea:focus{border-color:#FF6B00!important;box-shadow:0 0 0 3px rgba(255,107,0,0.12)!important;}
        a{text-decoration:none;color:inherit;}
      `}</style>

      {/* ══ FLOATING GROUP ══ */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 600, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        {floatOpen && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "slideIn 0.3s ease" }}>
            {/* WhatsApp */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
              <div style={{ background: dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: TXT, whiteSpace: "nowrap" }}>
                {bn ? "হোয়াটসঅ্যাপে চ্যাট করুন" : "Chat on WhatsApp"}
              </div>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
                style={{ width: 50, height: 50, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 6px 24px rgba(37,211,102,0.5)", animation: "wap 2.5s ease infinite", transition: "transform 0.2s" }}>
                <WaSVG size={22} />
              </a>
            </div>
            {/* Messenger */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
              <div style={{ background: dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: TXT, whiteSpace: "nowrap" }}>
                {bn ? "মেসেঞ্জারে চ্যাট করুন" : "Chat on Messenger"}
              </div>
              <a href={`https://m.me/${FB_PAGE}`} target="_blank" rel="noreferrer"
                style={{ width: 50, height: 50, background: "linear-gradient(135deg,#0866FF,#6B3FD6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 6px 24px rgba(8,102,255,0.5)", transition: "transform 0.2s" }}>
                <FbSVG size={22} />
              </a>
            </div>
            {/* Phone */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
              <div style={{ background: dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: TXT, whiteSpace: "nowrap" }}>
                01822044996
              </div>
              <a href="tel:01822044996"
                style={{ width: 50, height: 50, background: or, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", boxShadow: "0 6px 24px rgba(255,107,0,0.5)", animation: "orPulse 3s ease infinite", transition: "transform 0.2s" }}>
                <span style={{ fontSize: 20 }}>📞</span>
              </a>
            </div>
          </div>
        )}
        {/* Toggle Button */}
        <button onClick={() => setFloatOpen(o => !o)}
          style={{ width: 54, height: 54, background: floatOpen ? "#444" : or, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: floatOpen ? "#fff" : "#000", boxShadow: "0 8px 32px rgba(255,107,0,0.4)", transition: "all 0.3s", transform: floatOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
          {floatOpen ? "✕" : "💬"}
        </button>
      </div>

      {/* ══ PAYMENT MODAL ══ */}
      {payModal && (
        <div onClick={() => setPayModal(false)} style={{ position: "fixed", inset: 0, zIndex: 800, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: dark ? "#141414" : "#fff", border: `1px solid ${CARD_BORDER}`, borderRadius: 24, padding: 32, maxWidth: 520, width: "100%", animation: "slideIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>{bn ? "পেমেন্ট পদ্ধতি" : "Payment Methods"}</h3>
                <p style={{ fontSize: 12, color: TXT2, marginTop: 4 }}>{bn ? "আপনার পছন্দের পদ্ধতিতে পেমেন্ট করুন" : "Choose your preferred payment method"}</p>
              </div>
              <button onClick={() => setPayModal(false)} style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${BORDER}`, background: "transparent", color: TXT, cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {PAYMENT_METHODS.map((pm) => (
                <button key={pm.name} className="pay-card" onClick={() => { setSelectedPay(pm); }}
                  style={{ background: selectedPay?.name === pm.name ? `${pm.color}20` : (dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"), border: `1.5px solid ${selectedPay?.name === pm.name ? pm.color : CARD_BORDER}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: pm.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{pm.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TXT }}>{pm.name}</div>
                    <div style={{ fontSize: 10, color: TXT2, marginTop: 2 }}>{pm.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            {selectedPay && (
              <div style={{ marginTop: 20, padding: 16, background: `${selectedPay.color}15`, border: `1px solid ${selectedPay.color}40`, borderRadius: 14, animation: "slideIn 0.3s ease" }}>
                <p style={{ fontSize: 13, color: TXT, fontWeight: 600 }}>✅ {selectedPay.name} {bn ? "সিলেক্ট করা হয়েছে" : "selected"}</p>
                <p style={{ fontSize: 12, color: TXT2, marginTop: 4 }}>{bn ? "অর্ডার কনফার্মের পর পেমেন্ট লিংক পাঠানো হবে।" : "Payment link will be sent after order confirmation."}</p>
              </div>
            )}
            <a href={`https://wa.me/${WA}?text=Payment%20inquiry%20for%20${selectedPay?.name || "printing%20order"}`} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, background: or, color: "#000", fontWeight: 700, fontSize: 14, padding: "13px 24px", borderRadius: 12, cursor: "pointer" }}>
              <WaSVG size={16} />{bn ? "হোয়াটসঅ্যাপে পেমেন্ট কনফার্ম করুন" : "Confirm Payment via WhatsApp"}
            </a>
          </div>
        </div>
      )}

      {/* ══ TOP STRIP ══ */}
      <div style={{ background: or, padding: "7px 20px", fontSize: 11, fontWeight: 600, color: "#000", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
        <span>{bn ? "🔥 দ্রুত ডেলিভারি · প্রিমিয়াম মান · ঢাকার সেরা দাম" : "🔥 Fast Delivery · Premium Quality · Best Price in Dhaka"}</span>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="tel:01822044996" style={{ color: "#000", fontWeight: 700 }}>📞 01822044996</a>
          <span>{bn ? "শনি–বৃহ: সকাল ৯–রাত ৯" : "Sat–Thu: 9AM–9PM"}</span>
        </div>
      </div>

      {/* ══ NAV ══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 500, background: navScrolled ? (dark ? "rgba(8,8,8,0.95)" : "rgba(248,246,243,0.95)") : "transparent", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: navScrolled ? `1px solid ${BORDER}` : "1px solid transparent", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66, transition: "all 0.4s" }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 1, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: or, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: "#000" }}>N</div>
          NBR <span style={{ color: or }}>InkCraft</span>
        </div>
        <div style={{ display: "flex", gap: 4, fontSize: 13, fontWeight: 500 }}>
          {["home", "services", "gallery", "pricing", "contact"].map((s, i) => (
            <a key={s} href={`#${s}`} style={{ padding: "7px 14px", borderRadius: 8, color: TXT2, transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.color = or; e.target.style.background = "rgba(255,107,0,0.08)"; }}
              onMouseLeave={e => { e.target.style.color = TXT2; e.target.style.background = "transparent"; }}>
              {bn ? ["হোম","সেবা","গ্যালারি","মূল্য","যোগাযোগ"][i] : ["Home","Services","Gallery","Pricing","Contact"][i]}
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setLang(l => l === "en" ? "bn" : "en")} style={{ fontSize: 12, fontWeight: 700, padding: "7px 12px", borderRadius: 9, border: `1px solid ${BORDER}`, background: "transparent", cursor: "pointer", color: TXT }}>
            🌐 {bn ? "English" : "বাংলা"}
          </button>
          <button onClick={() => setDark(d => !d)} style={{ fontSize: 14, padding: "7px 10px", borderRadius: 9, border: `1px solid ${BORDER}`, background: "transparent", cursor: "pointer", color: TXT }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, background: or, color: "#000", fontWeight: 700, fontSize: 13, padding: "9px 18px", borderRadius: 10, boxShadow: "0 6px 24px rgba(255,107,0,0.35)" }}>
            <WaSVG size={15} />{bn ? "কোটেশন নিন" : "Get Quote"}
          </a>
        </div>
      </nav>

      {/* ══ HERO SLIDER ══ */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Animated background grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,107,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,107,0,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", animation: "glow 4s ease infinite" }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 600, height: 600, background: `radial-gradient(circle,${s.glow} 0%,transparent 65%)`, right: "-10%", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "all 1s ease" }} />
        <div style={{ position: "absolute", width: 300, height: 300, background: "radial-gradient(circle,rgba(255,107,0,0.08) 0%,transparent 65%)", left: "20%", bottom: "-10%", pointerEvents: "none" }} />

        {/* SLIDE CONTENT */}
        <div style={{ position: "relative", zIndex: 2, padding: "0 6%", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40 }}>
          <div style={{ maxWidth: 600 }} key={slide}>
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: 100, padding: "5px 16px", fontSize: 11, fontWeight: 700, color: or, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28, animation: "slideIn 0.5s ease" }}>
              <span style={{ width: 6, height: 6, background: or, borderRadius: "50%", animation: "orPulse 2s ease infinite" }} />
              {bn ? s.tag_bn : s.tag}
            </div>

            {/* H1 */}
            <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, lineHeight: 0.92, letterSpacing: -1, marginBottom: 24, animation: "slideIn 0.6s ease 0.1s both" }}>
              {(bn ? s.h1_bn : s.h1).map((line, i) => (
                <span key={i} style={{ display: "block", fontSize: "clamp(44px,7vw,88px)", color: i === 1 ? or : TXT }}>
                  {i === 2 ? <span style={{ WebkitTextStroke: `2px ${or}`, color: "transparent" }}>{line}</span> : line}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: 15, color: TXT2, lineHeight: 1.7, maxWidth: 460, marginBottom: 36, animation: "slideIn 0.6s ease 0.2s both" }}>
              {bn ? s.p_bn : s.p}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48, animation: "slideIn 0.6s ease 0.3s both" }}>
              <button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: or, color: "#000", fontWeight: 700, fontSize: 14, padding: "13px 28px", borderRadius: 10, border: "none", cursor: "pointer", boxShadow: "0 12px 40px rgba(255,107,0,0.4)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 18px 50px rgba(255,107,0,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,107,0,0.4)"; }}>
                📋 {bn ? "অর্ডার করুন →" : "Order Now →"}
              </button>
              <a href="#services" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: TXT, fontWeight: 600, fontSize: 14, padding: "12px 24px", borderRadius: 10, border: `1.5px solid ${BORDER}`, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = or; e.currentTarget.style.color = or; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TXT; }}>
                {bn ? "সেবা দেখুন" : "View Services"}
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 36, animation: "slideIn 0.6s ease 0.4s both" }}>
              {[["5,000+", bn ? "সন্তুষ্ট ক্লায়েন্ট" : "Happy Clients"], ["24h", bn ? "এক্সপ্রেস ডেলিভারি" : "Express Delivery"], ["8+", bn ? "বছরের অভিজ্ঞতা" : "Years Experience"]].map(([n, lbl]) => (
                <div key={n}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: or, fontFamily: "'Outfit',sans-serif" }}>{n}</div>
                  <div style={{ fontSize: 11, color: TXT2, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 3D float card */}
          <div style={{ display: "none", position: "relative", width: 340, flexShrink: 0, animation: "float 4s ease-in-out infinite" }} className="hero-right">
            <GlassCard hover3d style={{ padding: 28, boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>NBR InkCraft</div>
                <div style={{ background: or, color: "#000", fontSize: 9, fontWeight: 800, padding: "3px 10px", borderRadius: 6, letterSpacing: "0.06em" }}>LIVE</div>
              </div>
              <div style={{ height: 1, background: `rgba(255,107,0,0.2)`, marginBottom: 20 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[["Today's Orders","47 Jobs"],["Express","24 hrs"]].map(([lbl,val]) => (
                  <div key={lbl} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(255,107,0,0.1)" }}>
                    <div style={{ fontSize: 10, color: TXT2, marginBottom: 4 }}>{lbl}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: or }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {["💼","📄","📦","📚","🗓️","🪪"].map((ic,i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 6px", textAlign: "center", border: "1px solid rgba(255,107,0,0.1)" }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{ic}</div>
                    <div style={{ fontSize: 9, color: TXT2 }}>{["Card","Flyer","Pack","Book","Poster","ID"][i]}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Slide controls */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              style={{ width: i === slide ? 36 : 20, height: 3, borderRadius: 2, background: i === slide ? or : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <button onClick={() => setSlide(p => (p - 1 + SLIDES.length) % SLIDES.length)}
          style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: `1px solid ${BORDER}`, color: "#fff", fontSize: 18, cursor: "pointer" }}>‹</button>
        <button onClick={() => setSlide(p => (p + 1) % SLIDES.length)}
          style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", border: `1px solid ${BORDER}`, color: "#fff", fontSize: 18, cursor: "pointer" }}>›</button>
      </section>

      {/* ══ MARQUEE ══ */}
      <div style={{ background: or, padding: "11px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "marquee 24s linear infinite", width: "max-content" }}>
          {[...Array(2)].map((_, r) => ["Business Cards","Flyers","Posters","Book Printing","ID Cards","Packaging","24hr Express","Nilkhet Dhaka","bKash","Nagad","SSLCommerz"].map((t, i) => (
            <span key={`${r}-${i}`} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#000", padding: "0 28px", display: "inline-flex", alignItems: "center", gap: 20 }}>
              {t}<span style={{ width: 4, height: 4, background: "#000", borderRadius: "50%", flexShrink: 0 }} />
            </span>
          )))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: "96px 5%" }}>
        <RevealOnScroll>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.25)", borderRadius: 100, padding: "5px 16px", fontSize: 11, fontWeight: 700, color: or, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, background: or, borderRadius: "50%" }} />
              {bn ? "আমাদের সেবাসমূহ" : "What We Print"}
            </div>
            <h2 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1, color: TXT }}>
              {bn ? "আমাদের " : "OUR "}<span style={{ color: or }}>{bn ? "সেবা" : "SERVICES"}</span>
            </h2>
          </div>
        </RevealOnScroll>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 2 }}>
          {SERVICES.map((srv, i) => (
            <RevealOnScroll key={i} delay={i * 80}>
              <a href={`https://wa.me/${WA}?text=I%20need%20${srv.en}`} target="_blank" rel="noreferrer"
                className="srv-card"
                style={{ display: "block", background: BG3, padding: "38px 32px", border: `1px solid ${BORDER}`, position: "relative", overflow: "hidden", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = dark ? "#1e1e1e" : "#f8f0e8"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(255,107,0,0.15)"; e.currentTarget.style.borderColor = "rgba(255,107,0,0.25)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = BG3; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = BORDER; }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: or, transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s" }} className="srv-line" />
                <div className="srv-icon" style={{ width: 56, height: 56, background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 24, transition: "all 0.3s" }}>
                  {srv.icon}
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: TXT, marginBottom: 8, letterSpacing: 0.5 }}>{bn ? srv.bn : srv.en}</h3>
                <p style={{ fontSize: 13, color: TXT2, lineHeight: 1.6, marginBottom: 14 }}>{bn ? srv.desc_bn : srv.desc_en}</p>
                <div style={{ fontSize: 12, color: TXT2 }}>{srv.price} &nbsp;<span style={{ color: or, fontWeight: 700 }}>→ Order Now</span></div>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section id="gallery" style={{ padding: "96px 5%", background: BG2 }}>
        <RevealOnScroll>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: TXT, letterSpacing: -1 }}>
              {bn ? "আমাদের " : "OUR "}<span style={{ color: or }}>{bn ? "গ্যালারি" : "GALLERY"}</span>
            </h2>
          </div>
        </RevealOnScroll>
        {/* Filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
          {galCategories.map(cat => (
            <button key={cat} onClick={() => setGalFilter(cat)}
              style={{ padding: "7px 18px", borderRadius: 100, border: `1px solid ${galFilter === cat ? or : BORDER}`, background: galFilter === cat ? or : "transparent", color: galFilter === cat ? "#000" : TXT2, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
          {filteredGal.map((item, i) => (
            <div key={`${galFilter}-${i}`} className="gal-item" style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "4/3", background: item.bg, border: `1px solid ${BORDER}`, transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>{item.icon}</div>
              <div className="gal-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: 16 }}>
                <div>
                  <div style={{ fontSize: 10, color: or, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{item.cat}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{bn ? item.bn : item.en}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ STATS COUNTER ══ */}
      <section style={{ padding: "80px 5%", background: or, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,0,0,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.06) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 40, textAlign: "center" }}>
          {[["5000", "+", bn?"সন্তুষ্ট ক্লায়েন্ট":"Happy Clients"], ["24", "h", bn?"এক্সপ্রেস":"Express"], ["8", "+", bn?"বছরের অভিজ্ঞতা":"Years Exp."], ["20", "+", bn?"সেবা":"Services"]].map(([t, s, l]) => (
            <div key={l}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#000", lineHeight: 1 }}>
                <AnimatedCounter target={Number(t)} suffix={s} />
              </div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.7)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRICING + ORDER ══ */}
      <section id="pricing" style={{ padding: "96px 5%", background: BG }}>
        <RevealOnScroll>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(36px,5vw,52px)", fontWeight: 900, color: TXT, letterSpacing: -1 }}>
              {bn ? "লাইভ " : "LIVE "}<span style={{ color: or }}>{bn ? "কোটেশন" : "QUOTE"}</span>{bn ? " ক্যালকুলেটর" : " CALCULATOR"}
            </h2>
          </div>
        </RevealOnScroll>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <GlassCard style={{ padding: 40, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
              {[
                [bn?"পণ্য বেছে নিন":"Select Product", calcProduct, setCalcProduct, Object.keys(PRICES)],
                [bn?"পরিমাণ":"Quantity", calcQty, setCalcQty, ["100","500","1000"]],
              ].map(([lbl, val, setter, opts]) => (
                <div key={lbl} style={{ gridColumn: "span 1" }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>{lbl}</label>
                  <select value={val} onChange={e => setter(e.target.value)} style={inp}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>{bn?"কাগজ":"Paper"}</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["Matte", bn?"ম্যাট":"Matte"], ["Glossy", bn?"গ্লসি":"Glossy"]].map(([v, lbl]) => (
                    <button key={v} onClick={() => setCalcPaper(v)}
                      style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: `1.5px solid ${calcPaper === v ? or : BORDER}`, background: calcPaper === v ? or : "transparent", color: calcPaper === v ? "#000" : TXT2, fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.2s" }}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div style={{ background: `linear-gradient(135deg,${or},#cc5200)`, borderRadius: 16, padding: "24px 28px", textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: 6 }}>{bn?"আনুমানিক মূল্য":"Estimated Price"}</p>
              <p style={{ fontSize: 48, fontWeight: 900, color: "#000", lineHeight: 1 }}>৳ {estimate()}</p>
              <p style={{ fontSize: 11, color: "rgba(0,0,0,0.6)", marginTop: 6 }}>{calcProduct} · {calcQty} pcs · {calcPaper}</p>
            </div>

            {/* Payment badges */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{bn?"পেমেন্ট পদ্ধতি":"Payment Methods"}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {PAYMENT_METHODS.map(pm => (
                  <button key={pm.name} onClick={() => setPayModal(true)}
                    style={{ display: "flex", alignItems: "center", gap: 7, background: `${pm.color}18`, border: `1px solid ${pm.color}40`, borderRadius: 10, padding: "8px 14px", cursor: "pointer", transition: "all 0.2s", fontSize: 12, fontWeight: 700, color: TXT }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 20px ${pm.color}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <span style={{ fontSize: 16 }}>{pm.icon}</span>{pm.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Form */}
            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: TXT, marginBottom: 6 }}>{bn?"অর্ডার করুন":"Place Your Order"}</h3>
              <p style={{ fontSize: 13, color: TXT2, marginBottom: 24 }}>{bn?"৩০ মিনিটের মধ্যে হোয়াটসঅ্যাপে যোগাযোগ করা হবে।":"We'll contact you on WhatsApp within 30 minutes."}</p>

              {sent ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                  <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{bn?"অর্ডার পাঠানো হয়েছে!":"Order Sent!"}</h4>
                  <p style={{ fontSize: 13, color: TXT2, marginBottom: 20 }}>{bn?"৩০ মিনিটের মধ্যে হোয়াটসঅ্যাপে যোগাযোগ করা হবে।":"We'll WhatsApp you within 30 minutes. Thank you!"}</p>
                  <button onClick={() => setSent(false)} style={{ fontSize: 13, color: or, background: "transparent", border: `1px solid ${or}`, borderRadius: 8, padding: "8px 20px", cursor: "pointer" }}>
                    {bn?"নতুন অর্ডার করুন":"Place another order"}
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    {[[bn?"পূর্ণ নাম *":"Full Name *","text","name",bn?"আপনার নাম":"Your name"],[bn?"ফোন / হোয়াটসঅ্যাপ *":"Phone *","tel","phone","01XXXXXXXXX"]].map(([lbl,type,key,ph]) => (
                      <div key={key}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>{lbl}</label>
                        <input type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({...f, [key]: e.target.value}))} style={inp} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>{bn?"সেবা":"Service *"}</label>
                      <select value={form.svc} onChange={e => setForm(f => ({...f, svc:e.target.value}))} style={inp}>
                        <option value="">{bn?"-- বেছে নিন --":"-- Select --"}</option>
                        {(bn?["বিজনেস কার্ড","ফ্লায়ার","পোস্টার","বুক প্রিন্টিং","আইডি কার্ড","প্যাকেজিং","ব্যানার","অন্যান্য"]:["Business Cards","Flyers","Posters","Book Printing","ID Cards","Packaging","Banners","Other"]).map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>{bn?"ডেলিভারি":"Delivery"}</label>
                      <select value={form.del} onChange={e => setForm(f => ({...f, del:e.target.value}))} style={inp}>
                        {(bn?["সাধারণ (৩–৫ দিন)","এক্সপ্রেস (২৪ ঘণ্টা)","নীলক্ষেত থেকে সংগ্রহ"]:["Standard (3–5 days)","Express (24 hours)","Pickup from Nilkhet"]).map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>{bn?"বিস্তারিত":"Details"}</label>
                    <textarea rows={3} placeholder={bn?"কাগজের ধরন, সাইজ, রঙ, বিশেষ প্রয়োজন...":"Paper type, size, color, special requests..."} value={form.msg} onChange={e => setForm(f => ({...f, msg:e.target.value}))} style={{ ...inp, resize: "none", height: 90 }} />
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                    <button onClick={submitOrder}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: or, color: "#000", fontWeight: 800, fontSize: 14, padding: "13px 28px", borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 8px 28px rgba(255,107,0,0.35)", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                      📤 {bn?"অর্ডার পাঠান":"Send Order"}
                    </button>
                    <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 13, padding: "13px 22px", borderRadius: 12 }}>
                      <WaSVG size={15} />{bn?"হোয়াটসঅ্যাপে পাঠান":"Send via WhatsApp"}
                    </a>
                    <button onClick={() => setPayModal(true)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", border: `1px solid ${BORDER}`, color: TXT2, fontWeight: 600, fontSize: 13, padding: "12px 18px", borderRadius: 12, cursor: "pointer" }}>
                      💳 {bn?"পেমেন্ট অপশন":"Payment Options"}
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: TXT2, marginTop: 12 }}>✅ {bn?"৩০ মিনিটে সাড়া · 📍 নীলক্ষেত নিউ মার্কেট · 📞 ০১৮২২০৪৪৯৯৬":"Response within 30 min · 📍 Nilkhet New Market · 📞 01822044996"}</p>
                </>
              )}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section style={{ padding: "80px 5%", background: BG2 }}>
        <RevealOnScroll>
          <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: TXT, textAlign: "center", marginBottom: 48, letterSpacing: -1 }}>
            {bn?"ক্লায়েন্ট ":"CLIENT "}<span style={{ color: or }}>{bn?"রিভিউ":"REVIEWS"}</span>
          </h2>
        </RevealOnScroll>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {REVIEWS.map((r, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <GlassCard hover3d style={{ padding: "28px 24px" }}>
                <div style={{ color: or, fontSize: 18, marginBottom: 12 }}>{"★".repeat(r.stars)}</div>
                <p style={{ fontSize: 13, color: TXT2, lineHeight: 1.7, marginBottom: 20 }}>"{bn ? r.review_bn : r.review}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, background: `${or}20`, border: `1px solid ${or}40`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TXT }}>{bn ? r.name_bn : r.name}</div>
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ══ CONTACT CTA ══ */}
      <section id="contact" style={{ padding: "96px 5%", background: BG, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, background: `radial-gradient(circle,rgba(255,107,0,0.07) 0%,transparent 60%)`, pointerEvents: "none" }} />
        <RevealOnScroll>
          <GlassCard style={{ maxWidth: 800, margin: "0 auto", padding: "60px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, color: "rgba(255,107,0,0.04)", fontWeight: 900, lineHeight: 1, pointerEvents: "none" }}>NBR</div>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🖨️</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: TXT, marginBottom: 12, letterSpacing: -1 }}>
              {bn ? "আজই আপনার " : "START YOUR "}<span style={{ color: or }}>{bn ? "অর্ডার" : "ORDER"}</span>{bn ? " করুন!" : " TODAY!"}
            </h2>
            <p style={{ fontSize: 14, color: TXT2, marginBottom: 32, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
              {bn ? "নীলক্ষেত নিউ মার্কেটে আসুন অথবা কল/হোয়াটসঅ্যাপ করুন — আমরা ৩০ মিনিটের মধ্যে সাড়া দেব।" : "Visit us at Nilkhet New Market or call/WhatsApp — we respond within 30 minutes and deliver fast."}
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
              <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, padding: "14px 28px", borderRadius: 12, boxShadow: "0 10px 32px rgba(37,211,102,0.3)" }}>
                <WaSVG size={18} />{bn ? "হোয়াটসঅ্যাপে অর্ডার করুন" : "Order on WhatsApp"}
              </a>
              <a href="tel:01822044996"
                style={{ display: "inline-flex", alignItems: "center", gap: 9, background: or, color: "#000", fontWeight: 700, fontSize: 14, padding: "14px 28px", borderRadius: 12, boxShadow: "0 10px 32px rgba(255,107,0,0.3)" }}>
                📞 01822044996
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
              {[["📍", bn?"নীলক্ষেত নিউ মার্কেট":"Nilkhet New Market"], ["⏰", bn?"শনি–বৃহ: সকাল ৯–রাত ৯":"Sat–Thu: 9AM–9PM"], ["📧", "nbr5339@gmail.com"]].map(([ic,txt]) => (
                <div key={txt} style={{ fontSize: 13, color: TXT2 }}>{ic} {txt}</div>
              ))}
            </div>
          </GlassCard>
        </RevealOnScroll>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: BG2, borderTop: `1px solid ${BORDER}`, padding: "48px 5% 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, background: or, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#000" }}>N</div>
              NBR <span style={{ color: or }}>InkCraft</span>
            </div>
            <p style={{ fontSize: 13, color: TXT2, lineHeight: 1.8, marginBottom: 20 }}>{bn ? "২০১৬ সাল থেকে ঢাকার বিশ্বস্ত প্রিন্টিং হাউস। নীলক্ষেত নিউ মার্কেটে আমাদের খুঁজে পাবেন।" : "Dhaka's trusted printing house since 2016. Quality you can feel, service you can count on."}</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[["#25D366","https://wa.me/8801822044996",<WaSVG size={16}/>,"WhatsApp"],["#0866FF","https://m.me/NBRInkCraft",<FbSVG size={16}/>,"Facebook"]].map(([bg,href,icon,lbl]) => (
                <a key={lbl} href={href} target="_blank" rel="noreferrer"
                  style={{ width: 36, height: 36, background: `${bg}20`, border: `1px solid ${bg}40`, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: bg, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = bg; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${bg}20`; e.currentTarget.style.color = bg; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {[[bn?"সেবাসমূহ":"Services",[bn?"বিজনেস কার্ড":"Business Cards",bn?"ফ্লায়ার":"Flyers",bn?"পোস্টার":"Posters",bn?"বুক প্রিন্টিং":"Book Printing",bn?"আইডি কার্ড":"ID Cards",bn?"প্যাকেজিং":"Packaging"]],[bn?"যোগাযোগ":"Contact",["📞 01822044996","📧 nbr5339@gmail.com",bn?"📍 নীলক্ষেত নিউ মার্কেট":"📍 Nilkhet New Market",bn?"শনি–বৃহ: সকাল ৯–রাত ৯":"Sat–Thu: 9AM–9PM"]],[bn?"পেমেন্ট":"Payment",["bKash","Nagad","Rocket","SSLCommerz","Stripe"]]].map(([title,links]) => (
            <div key={title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: TXT, marginBottom: 16 }}>{title}</div>
              <ul style={{ listStyle: "none" }}>
                {links.map(link => (
                  <li key={link} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: 13, color: TXT2, transition: "color 0.15s" }}
                      onMouseEnter={e => e.target.style.color = or}
                      onMouseLeave={e => e.target.style.color = TXT2}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, color: TXT2 }}>
          <span>© 2025 NBR InkCraft. {bn?"সর্বস্বত্ব সংরক্ষিত।":"All rights reserved."}</span>
          <span>{bn?"নীলক্ষেত নিউ মার্কেট, ঢাকা, বাংলাদেশ":"Nilkhet New Market, Dhaka, Bangladesh"}</span>
        </div>
      </footer>
    </div>
  );
}
