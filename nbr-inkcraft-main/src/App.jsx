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

/* Verified product data — sourced directly from product detail pages.
   Only products with confirmed, verified specs/pricing are included here. */
const PRODUCTS = [
  {
    key: "visitingcard",
    icon: "🎴",
    en: "Visiting Card",
    bn: "ভিজিটিং কার্ড",
    img: "/images/visitingcard.jpeg",
    priceLow: 400,
    priceHigh: 2000,
    size_en: "3.25 × 2 inch",
    size_bn: "৩.২৫ × ২ ইঞ্চি",
    minOrder_en: "1000 pcs",
    minOrder_bn: "১০০০ পিস",
    specs_en: [
      ["Paper", "300gsm Art Card (2-side print) / 300gsm Swedish Board (1-side print)"],
      ["Print Sides", "1-side print / 2-side print"],
    ],
    specs_bn: [
      ["পেপার", "৩০০ গ্রাম আর্ট কার্ড (২ পাশ প্রিন্ট) / ৩০০ গ্রাম সুইডিশ বোর্ড (১ পাশ প্রিন্ট)"],
      ["প্রিন্ট সাইড", "১ পাশ প্রিন্ট / ২ পাশ প্রিন্ট"],
    ],
    packageTable_en: {
      headers: ["Package", "1-Side", "2-Side"],
      rows: [
        ["Package-1 — Regular Glossy Lamination", "৳400", "৳550"],
        ["Package-2 — Medium Matte Lamination", "৳500", "৳650"],
        ["Package-3 — Standard Spot + Matte Lamination", "৳700", "৳900"],
        ["Package-4 — Premium Rounded Corner Matte+Spot Lamination", "৳750", "৳1,100"],
        ["Package-5 — Gold Matte+Spot Lamination (350gsm Art Card)", "৳1,600", "৳2,000"],
      ],
    },
    packageTable_bn: {
      headers: ["প্যাকেজ", "১ পাশ", "২ পাশ"],
      rows: [
        ["প্যাকেজ-১ — রেগুলার গ্লোসি লেমিনেশন", "৳৪০০", "৳৫৫০"],
        ["প্যাকেজ-২ — মিডিয়াম ম্যাট লেমিনেশন", "৳৫০০", "৳৬৫০"],
        ["প্যাকেজ-৩ — স্ট্যান্ডার্ড স্পট + ম্যাট লেমিনেশন", "৳৭০০", "৳৯০০"],
        ["প্যাকেজ-৪ — প্রিমিয়াম রাউন্ড কর্নার ম্যাট+স্পট লেমিনেশন", "৳৭৫০", "৳১,১০০"],
        ["প্যাকেজ-৫ — গোল্ড ম্যাট+স্পট লেমিনেশন (৩৫০gsm আর্ট কার্ড)", "৳১,৬০০", "৳২,০০০"],
      ],
    },
    note_en: "Design charge may apply. Delivery charge separate — inside Dhaka first 1kg ৳80, outside Dhaka first 1kg ৳135, then ৳20/kg extra.",
    note_bn: "ডিজাইন চার্জ প্রযোজ্য হতে পারে। ডেলিভারি চার্জ আলাদা — ঢাকার ভিতরে প্রথম ১কেজি ৳৮০, ঢাকার বাইরে প্রথম ১কেজি ৳১৩৫, এরপর প্রতি কেজি +৳২০।",
  },
  {
    key: "billbook",
    icon: "🧾",
    en: "Cash Memo / Bill Book",
    bn: "ক্যাশ মেমো / বিল বই",
    img: "/images/billbook.jpeg",
    priceLow: 1400,
    priceHigh: 2550,
    size_en: "5.5×8.5\" / 7.25×9.75\" / 8.5×11\"",
    size_bn: "৫.৫×৮.৫\" / ৭.২৫×৯.৭৫\" / ৮.৫×১১\"",
    minOrder_en: "10 books (100-page books)",
    minOrder_bn: "১০ বই (১০০ পাতার বই)",
    specs_en: [
      ["Paper", "Auto Carbon / Offset Paper"],
      ["Color", "1 / 2 / 3 / 4 Color"],
      ["Bundle", "100-page × 10 books, or 200-page × 10 books"],
      ["Pages", "Each book has 100 pages — 50 original + 50 duplicate copy"],
    ],
    specs_bn: [
      ["পেপার", "অটো কার্বন / অফসেট পেপার"],
      ["কালার", "১ / ২ / ৩ / ৪ কালার"],
      ["পরিমাণ", "১০০ পাতার ১০ বই, বা ২০০ পাতার ১০ বই"],
      ["পাতা", "প্রতি বইতে ১০০ পাতা — ৫০ অরিজিনাল কপি + ৫০ ডুপ্লিকেট কপি"],
    ],
    note_en: "Delivery charge separate — inside Dhaka first 1kg ৳80, outside Dhaka first 1kg ৳135, then ৳20/kg extra.",
    note_bn: "ডেলিভারি চার্জ আলাদা — ঢাকার ভিতরে প্রথম ১কেজি ৳৮০, ঢাকার বাইরে প্রথম ১কেজি ৳১৩৫, এরপর প্রতি কেজি +৳২০।",
  },
  {
    key: "prescription",
    icon: "💊",
    en: "Prescription Pad",
    bn: "প্রেসক্রিপশন প্যাড",
    img: "/images/prescription.jpeg",
    priceLow: 1800,
    priceHigh: 3100,
    size_en: "8.25 × 11.25 inch",
    size_bn: "৮.২৫ × ১১.২৫ ইঞ্চি",
    minOrder_en: "10 books = 1000 pages",
    minOrder_bn: "১০ বই = ১০০০ পাতা",
    specs_en: [
      ["Paper", "80gsm / 100gsm / 120gsm"],
      ["Color", "1 / 2 / 3 / 4 Color"],
      ["Pages", "Each book has 100 pages"],
    ],
    specs_bn: [
      ["পেপার", "৮০ গ্রাম / ১০০ গ্রাম / ১২০ গ্রাম"],
      ["কালার", "১ / ২ / ৩ / ৪ কালার"],
      ["পাতা", "প্রতি বইতে ১০০ পাতা করে থাকবে"],
    ],
    note_en: "Delivery charge separate — inside Dhaka first 1kg ৳90, outside Dhaka first 1kg ৳135, then ৳20/kg extra.",
    note_bn: "ডেলিভারি চার্জ আলাদা — ঢাকার ভিতরে প্রথম ১কেজি ৳৯০, ঢাকার বাইরে প্রথম ১কেজি ৳১৩৫, এরপর প্রতি কেজি +৳২০।",
  },
  {
    key: "posters",
    icon: "🖼️",
    en: "Poster",
    bn: "পোস্টার",
    img: "/images/posters.jpeg",
    priceLow: 2700,
    priceHigh: 5600,
    size_en: "15×20\" / 18×23\" / 20×30\"",
    size_bn: "১৫×২০\" / ১৮×২৩\" / ২০×৩০\"",
    minOrder_en: "500 pcs",
    minOrder_bn: "৫০০ পিস",
    specs_en: [
      ["Paper", "70gsm / 80gsm / 100gsm"],
      ["Color", "1 / 2 / 3 / 4 Color"],
      ["Quantity", "500 pcs / 1000 pcs"],
    ],
    specs_bn: [
      ["পেপার", "৭০ গ্রাম / ৮০ গ্রাম / ১০০ গ্রাম"],
      ["কালার", "১ / ২ / ৩ / ৪ কালার"],
      ["পরিমাণ", "৫০০ পিস / ১০০০ পিস"],
    ],
    note_en: "Delivery charge separate — inside Dhaka first 1kg ৳90, outside Dhaka first 1kg ৳135, then ৳20/kg extra.",
    note_bn: "ডেলিভারি চার্জ আলাদা — ঢাকার ভিতরে প্রথম ১কেজি ৳৯০, ঢাকার বাইরে প্রথম ১কেজি ৳১৩৫, এরপর প্রতি কেজি +৳২০।",
  },
  {
    key: "folders",
    icon: "📁",
    en: "Patient File / Presentation Folder",
    bn: "পেশেন্ট ফাইল / প্রেজেন্ট ফাইল",
    img: "/images/folders.jpeg",
    priceLow: 7500,
    priceHigh: 16500,
    size_en: "9.5 × 13.5 inch",
    size_bn: "৯.৫ × ১৩.৫ ইঞ্চি",
    minOrder_en: "500 pcs",
    minOrder_bn: "৫০০ পিস",
    specs_en: [
      ["Paper", "300gsm Swedish Board"],
      ["Print", "4-Color Print"],
      ["Lamination", "Glossy Lamination / Matte Lamination / No Lamination"],
      ["Attachment", "Pocket / Clip / Pocket+Clip together / Without Pocket & Clip"],
      ["Quantity", "500 pcs / 1000 pcs"],
    ],
    specs_bn: [
      ["পেপার", "৩০০ গ্রাম সুইডিশ বোর্ড"],
      ["প্রিন্ট", "৪ কালার প্রিন্ট"],
      ["লেমিনেশন", "গ্লোসি লেমিনেশন / ম্যাট লেমিনেশন / লেমিনেশন ছাড়া"],
      ["এট্যাচমেন্ট", "পকেট / ক্লিপ / পকেট+ক্লিপ সহ / পকেট+ক্লিপ ছাড়া"],
      ["পরিমাণ", "৫০০ পিস / ১০০০ পিস"],
    ],
    note_en: "Delivery charge separate — inside Dhaka first 1kg ৳90, outside Dhaka first 1kg ৳135, then ৳20/kg extra.",
    note_bn: "ডেলিভারি চার্জ আলাদা — ঢাকার ভিতরে প্রথম ১কেজি ৳৯০, ঢাকার বাইরে প্রথম ১কেজি ৳১৩৫, এরপর প্রতি কেজি +৳২০।",
  },
];

/* Products still being verified — shown as "coming soon" so we never
   display invented specs or prices for these. */
const COMING_SOON = [
  { key: "letterhead", en: "Letterhead Pad", bn: "লেটারহেড প্যাড", img: "/images/letterhead.jpeg" },
  { key: "books", en: "Book Printing", bn: "বই প্রিন্টিং", img: "/images/books.jpeg" },
  { key: "calendar", en: "Calendar", bn: "ক্যালেন্ডার", img: "/images/calendar.jpeg" },
  { key: "certificate", en: "Certificate", bn: "সার্টিফিকেট", img: "/images/certificate.jpeg" },
  { key: "labels", en: "Labels", bn: "লেবেল", img: "/images/labels.jpeg" },
  { key: "packaging", en: "Packaging", bn: "প্যাকেজিং", img: "/images/packaging.jpeg" },
];

const GALLERY_ITEMS = PRODUCTS.map(p => ({
  icon: p.icon, en: p.en, bn: p.bn, cat: p.key, img: p.img,
}));

const PAYMENT_METHODS = [
  { name: "bKash", color: "#E2136E", icon: "💳", desc: "বিকাশে পেমেন্ট করুন" },
  { name: "Nagad", color: "#F58220", icon: "💰", desc: "নগদে পেমেন্ট করুন" },
  { name: "Rocket", color: "#8B2FC9", icon: "🚀", desc: "রকেটে পেমেন্ট করুন" },
  { name: "SSLCommerz", color: "#0066CC", icon: "🔒", desc: "SSL দিয়ে নিরাপদ পেমেন্ট" },
  { name: "Stripe", color: "#635BFF", icon: "💎", desc: "Card / International" },
  { name: "Cash on Delivery", color: "#22C55E", icon: "🏪", desc: "ক্যাশ অন ডেলিভারি" },
];

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
  const [calcProduct, setCalcProduct] = useState(PRODUCTS[0].key);
  const [expandedProduct, setExpandedProduct] = useState(null);
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

  const galCategories = ["all", ...PRODUCTS.map(p => p.key)];
  const filteredGal = galFilter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === galFilter);
  const selectedProduct = PRODUCTS.find(p => p.key === calcProduct) || PRODUCTS[0];

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
          {[...Array(2)].map((_, r) => ["Visiting Card","Cash Memo","Prescription Pad","Poster","Patient File","24hr Express","Nilkhet Dhaka","bKash","Nagad","SSLCommerz"].map((t, i) => (
            <span key={`${r}-${i}`} style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#000", padding: "0 28px", display: "inline-flex", alignItems: "center", gap: 20 }}>
              {t}<span style={{ width: 4, height: 4, background: "#000", borderRadius: "50%", flexShrink: 0 }} />
            </span>
          )))}
        </div>
      </div>

      {/* ══ PRODUCTS ══ */}
      <section id="services" style={{ padding: "96px 5%" }}>
        <RevealOnScroll>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.25)", borderRadius: 100, padding: "5px 16px", fontSize: 11, fontWeight: 700, color: or, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, background: or, borderRadius: "50%" }} />
              {bn ? "আমাদের প্রোডাক্টসমূহ" : "What We Print"}
            </div>
            <h2 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1, color: TXT }}>
              {bn ? "আমাদের " : "OUR "}<span style={{ color: or }}>{bn ? "প্রোডাক্ট" : "PRODUCTS"}</span>
            </h2>
          </div>
        </RevealOnScroll>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 20 }}>
          {PRODUCTS.map((p, i) => {
            const open = expandedProduct === p.key;
            const specs = bn ? p.specs_bn : p.specs_en;
            const table = bn ? p.packageTable_bn : p.packageTable_en;
            return (
              <RevealOnScroll key={p.key} delay={i * 80}>
                <div style={{ background: BG3, borderRadius: 16, border: `1px solid ${BORDER}`, overflow: "hidden", transition: "all 0.3s" }}>
                  <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                    <img src={p.img} alt={p.en} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", borderRadius: 10, padding: "5px 12px", fontSize: 20 }}>{p.icon}</div>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85),transparent)", padding: "24px 20px 14px" }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{bn ? p.bn : p.en}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: or, marginTop: 2 }}>৳{p.priceLow.toLocaleString()} – ৳{p.priceHigh.toLocaleString()}</div>
                    </div>
                  </div>

                  <div style={{ padding: "18px 20px 20px" }}>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, color: TXT2, marginBottom: 12, flexWrap: "wrap" }}>
                      <div><b style={{ color: TXT }}>{bn ? "সাইজ:" : "Size:"}</b> {bn ? p.size_bn : p.size_en}</div>
                      <div><b style={{ color: TXT }}>{bn ? "মিনিমাম অর্ডার:" : "Min. Order:"}</b> {bn ? p.minOrder_bn : p.minOrder_en}</div>
                    </div>

                    <button onClick={() => setExpandedProduct(open ? null : p.key)}
                      style={{ width: "100%", background: "transparent", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "9px 0", color: or, fontWeight: 700, fontSize: 12, cursor: "pointer", marginBottom: open ? 14 : 0, transition: "all 0.2s" }}>
                      {open ? (bn ? "▲ বিস্তারিত লুকান" : "▲ Hide Details") : (bn ? "▼ প্রোডাক্ট ডেসক্রিপশন দেখুন" : "▼ View Product Description")}
                    </button>

                    {open && (
                      <div style={{ animation: "slideIn 0.25s ease" }}>
                        <div style={{ marginBottom: table ? 14 : 0 }}>
                          {specs.map(([label, val]) => (
                            <div key={label} style={{ display: "flex", gap: 8, fontSize: 12, padding: "7px 0", borderBottom: `1px solid ${BORDER}` }}>
                              <div style={{ flex: "0 0 100px", fontWeight: 700, color: TXT }}>{label}</div>
                              <div style={{ color: TXT2, lineHeight: 1.5 }}>{val}</div>
                            </div>
                          ))}
                        </div>

                        {table && (
                          <div style={{ overflowX: "auto", marginBottom: 12 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                              <thead>
                                <tr>
                                  {table.headers.map(h => (
                                    <th key={h} style={{ textAlign: "left", padding: "6px 8px", color: or, borderBottom: `1px solid ${BORDER}`, fontWeight: 700 }}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {table.rows.map((row, ri) => (
                                  <tr key={ri}>
                                    {row.map((cell, ci) => (
                                      <td key={ci} style={{ padding: "6px 8px", borderBottom: `1px solid ${BORDER}`, color: ci === 0 ? TXT : TXT2, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        <p style={{ fontSize: 11, color: TXT2, lineHeight: 1.6, marginBottom: 14 }}>
                          {bn ? p.note_bn : p.note_en}
                        </p>
                      </div>
                    )}

                    <a href={`https://wa.me/${WA}?text=I%20need%20${encodeURIComponent(p.en)}`} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 6, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 13, padding: "11px 0", borderRadius: 10 }}>
                      <WaSVG size={15} />{bn ? "হোয়াটসঅ্যাপে অর্ডার করুন" : "Order on WhatsApp"}
                    </a>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Coming soon strip */}
        <RevealOnScroll delay={200}>
          <div style={{ marginTop: 56, textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TXT2, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {bn ? "শীঘ্রই আসছে (বিস্তারিত তথ্য যাচাইকরণ চলছে)" : "Coming Soon (details being verified)"}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {COMING_SOON.map(c => (
                <div key={c.key} style={{ display: "flex", alignItems: "center", gap: 8, background: BG3, border: `1px solid ${BORDER}`, borderRadius: 100, padding: "6px 8px 6px 6px", opacity: 0.7 }}>
                  <img src={c.img} alt={c.en} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: TXT2 }}>{bn ? c.bn : c.en}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
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
          {galCategories.map(cat => {
            const prod = PRODUCTS.find(p => p.key === cat);
            const label = cat === "all" ? (bn ? "সব" : "All") : (bn ? prod?.bn : prod?.en);
            return (
              <button key={cat} onClick={() => setGalFilter(cat)}
                style={{ padding: "7px 18px", borderRadius: 100, border: `1px solid ${galFilter === cat ? or : BORDER}`, background: galFilter === cat ? or : "transparent", color: galFilter === cat ? "#000" : TXT2, fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                {label}
              </button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
          {filteredGal.map((item, i) => (
            <div key={`${galFilter}-${i}`} className="gal-item" style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "1" }}>
              <img src={item.img} alt={item.en} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
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
              {bn ? "মূল্য " : "PRICE "}<span style={{ color: or }}>{bn ? "তালিকা" : "LIST"}</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <GlassCard style={{ padding: 40, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: TXT2, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>{bn?"পণ্য বেছে নিন":"Select Product"}</label>
              <select value={calcProduct} onChange={e => setCalcProduct(e.target.value)} style={inp}>
                {PRODUCTS.map(p => <option key={p.key} value={p.key}>{bn ? p.bn : p.en}</option>)}
              </select>
            </div>

            {/* Result */}
            <div style={{ background: `linear-gradient(135deg,${or},#cc5200)`, borderRadius: 16, padding: "24px 28px", textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(0,0,0,0.7)", marginBottom: 6 }}>{bn?"মূল্য পরিসীমা":"Price Range"}</p>
              <p style={{ fontSize: 40, fontWeight: 900, color: "#000", lineHeight: 1 }}>৳{selectedProduct.priceLow.toLocaleString()} – ৳{selectedProduct.priceHigh.toLocaleString()}</p>
              <p style={{ fontSize: 11, color: "rgba(0,0,0,0.6)", marginTop: 6 }}>
                {bn ? selectedProduct.bn : selectedProduct.en} · {bn ? "সাইজ:" : "Size:"} {bn ? selectedProduct.size_bn : selectedProduct.size_en} · {bn ? "মিনিমাম অর্ডার:" : "Min:"} {bn ? selectedProduct.minOrder_bn : selectedProduct.minOrder_en}
              </p>
              <p style={{ fontSize: 10, color: "rgba(0,0,0,0.55)", marginTop: 8 }}>
                {bn ? "সঠিক দাম নির্ভর করে পেপার/কালার/ফিনিশিং বাছাইয়ের উপর — উপরের প্রোডাক্ট কার্ডে বিস্তারিত দেখুন।" : "Exact price depends on paper/color/finish selected — see full spec table in the product card above."}
              </p>
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
                        {PRODUCTS.map(p => <option key={p.key} value={p.en}>{bn ? p.bn : p.en}</option>)}
                        <option value={bn ? "অন্যান্য" : "Other"}>{bn ? "অন্যান্য" : "Other"}</option>
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
          {[[bn?"প্রোডাক্টসমূহ":"Products",PRODUCTS.map(p => bn ? p.bn : p.en)],[bn?"যোগাযোগ":"Contact",["📞 01822044996","📧 nbr5339@gmail.com",bn?"📍 নীলক্ষেত নিউ মার্কেট":"📍 Nilkhet New Market",bn?"শনি–বৃহ: সকাল ৯–রাত ৯":"Sat–Thu: 9AM–9PM"]],[bn?"পেমেন্ট":"Payment",["bKash","Nagad","Rocket","SSLCommerz","Stripe"]]].map(([title,links]) => (
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
