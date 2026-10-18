import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import {
  Menu, Languages, ShoppingCart, Home, Package, ReceiptText, UserRound,
  Plus, Minus, ArrowLeft, Leaf, Truck, ShieldCheck, MapPin, Phone,
  Search, X, CheckCircle2, ClipboardList, Settings, LogIn, LogOut,
  Download, ChartNoAxesCombined, Sprout, ChevronRight, Clock, CircleCheck,
  MessageCircle, WalletCards, Facebook, Instagram, Globe, ExternalLink
} from "lucide-react";
import "./styles.css";

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = envUrl && envKey ? createClient(envUrl, envKey) : null;

const products = [
  {
    id: "silage",
    name: { en: "SHAHI GRASS SILAGE", bn: "শাহী গ্রাস সাইলেজ" },
    description: { en: "Freshly fermented grass feed for livestock.", bn: "গবাদিপশুর জন্য গাঁজন করা ঘাসের খাদ্য।" },
    details: { en: "50 kg per packet · Minimum 20, maximum 400 packets.", bn: "প্রতি প্যাকেট ৫০ কেজি · সর্বনিম্ন ২০, সর্বোচ্চ ৪০০ প্যাকেট।" },
    price: 350,
    unit: { en: "50 kg / packet", bn: "৫০ কেজি / প্যাকেট" },
    type: "silage",
    image: "/silage.svg"
  },
  {
    id: "ghee-900",
    name: { en: "SHAHI PREMIUM GHEE", bn: "শাহী প্রিমিয়াম ঘি" },
    description: { en: "Pure & natural premium ghee.", bn: "বিশুদ্ধ ও প্রাকৃতিক প্রিমিয়াম ঘি।" },
    details: { en: "900 g jar", bn: "৯০০ গ্রাম জার" },
    price: 1450,
    unit: { en: "900 g", bn: "৯০০ গ্রাম" },
    type: "ghee",
    image: "/ghee.svg"
  },
  {
    id: "ghee-200",
    name: { en: "SHAHI PREMIUM GHEE", bn: "শাহী প্রিমিয়াম ঘি" },
    description: { en: "Pure & natural premium ghee.", bn: "বিশুদ্ধ ও প্রাকৃতিক প্রিমিয়াম ঘি।" },
    details: { en: "200 g jar", bn: "২০০ গ্রাম জার" },
    price: 800,
    unit: { en: "200 g", bn: "২০০ গ্রাম" },
    type: "ghee",
    image: "/ghee.svg"
  }
];

const areas = [
  { en: "Subarnachar", bn: "সুবর্ণচর", fee: 80 },
  { en: "Noakhali Sadar / Maijdee", bn: "নোয়াখালী সদর / মাইজদী", fee: 100 },
  { en: "Other Noakhali areas", bn: "নোয়াখালীর অন্যান্য এলাকা", fee: 130 },
  { en: "Outside Noakhali", bn: "নোয়াখালীর বাইরে", fee: 160 }
];

const copy = {
  en: {
    tagline: "Pure · Natural · Healthy", home: "Home", products: "Products", orders: "Orders", profile: "Profile", about: "About Us",
    mainProduct: "Main Product", secondary: "Premium Product", details: "Details", add: "Add to Cart",
    shop: "Shop our products", heroTitle: "Rooted in nature. Made with care.", heroSub: "Livestock grass silage and premium ghee from SHAHI AGRO FARM.",
    silage: "Grass Silage", ghee: "Premium Ghee", cart: "Your Cart", empty: "Your cart is empty.",
    checkout: "Checkout", subtotal: "Subtotal", delivery: "Delivery", total: "Total", quantity: "Quantity",
    customer: "Customer details", fullName: "Full name", phone: "Phone number", address: "Full delivery address",
    area: "Delivery area", payment: "Payment method", placeOrder: "Place Order", orderSuccess: "Order placed!",
    orderRef: "Your order reference", tracking: "My Orders", trackPlaceholder: "Your orders", deliveryPromise: "Your order will be delivered in 3–5 days.",
    search: "Search products", language: "বাংলা", menu: "Menu", close: "Close", remove: "Remove",
    noOrders: "Your orders will appear here after you place one.", profileTitle: "Your profile",
    business: "Business information", aboutTitle: "About SHAHI AGRO FARM", aboutText: "We are committed to bringing quality agricultural products to customers, including SHAHI GRASS SILAGE for livestock and SHAHI PREMIUM GHEE for your family.", website: "Official Website", social: "Follow Us", contactUs: "Contact Us", deliveryPartners: "Delivery Partners", deliveryPromise: "Your order will be delivered in 3–5 days.", location: "Babul Chearman Bari, Char Bojlul Korim, Char Bata-3813, Subarnachar, Noakhali",
    contact: "Call business", cash: "Cash on Delivery", bkash: "bKash", nagad: "Nagad", upay: "Upay", rocket: "Rocket",
    manualNote: "Mobile banking orders are marked as awaiting payment verification. Add your transaction ID during checkout.",
    transaction: "Transaction ID (if prepaid)", note: "Order notes (optional)", status: "Order status",
    pending: "Pending confirmation", confirmed: "Confirmed", processing: "Processing", dispatched: "Dispatched", delivered: "Delivered", cancelled: "Cancelled",
    admin: "Admin Dashboard", adminLogin: "Admin sign in", email: "Email", password: "Password", signIn: "Sign in",
    adminHint: "Configure Supabase and set the admin role before using admin tools.", dashboard: "Dashboard",
    inventory: "Inventory", revenue: "Sales total", expenses: "Expenses", profit: "Estimated profit", export: "Export orders CSV",
    refresh: "Refresh data", signOut: "Sign out", ordersCount: "Orders", save: "Save status", statusSaved: "Status update requested.",
    setup: "Demo mode", setupMsg: "Supabase is not configured. Orders are saved only in this browser for demonstration.",
    online: "Connected backend", onlineMsg: "Supabase configuration detected.", minSilage: "Silage orders must be between 20 and 400 packets.",
    stock: "Availability", available: "Available", faq: "Frequently asked questions", faq1: "How is delivery calculated?", faq1a: "Delivery charges are calculated from the delivery area selected at checkout.",
    faq2: "When is a mobile payment confirmed?", faq2a: "A mobile payment is not confirmed until the business verifies it. Never share your PIN or OTP.",
    faq3: "When will my order arrive?", faq3a: "Orders are expected to be delivered within 3–5 days. We do not provide in-app order tracking.",
    continue: "Continue shopping", copied: "Reference copied", noResults: "No products found.", customerRequired: "Please fill in your name, phone, and full address.",
    paymentRequired: "Add a transaction ID for prepaid orders.", adminOnly: "Admin access requires a configured Supabase admin account.", gheePrice: "900 g — ৳1,450 · 200 g — ৳800"
  },
  bn: {
    tagline: "বিশুদ্ধ · প্রাকৃতিক · স্বাস্থ্যকর", home: "হোম", products: "পণ্য", orders: "অর্ডার", profile: "প্রোফাইল",
    mainProduct: "প্রধান পণ্য", secondary: "প্রিমিয়াম পণ্য", details: "বিস্তারিত", add: "কার্টে যোগ করুন",
    shop: "আমাদের পণ্য", heroTitle: "প্রকৃতির কাছাকাছি, যত্নে তৈরি।", heroSub: "গবাদিপশুর ঘাসের সাইলেজ ও প্রিমিয়াম ঘি — শাহী অ্যাগ্রো ফার্ম।",
    silage: "গ্রাস সাইলেজ", ghee: "প্রিমিয়াম ঘি", cart: "আপনার কার্ট", empty: "আপনার কার্ট খালি।",
    checkout: "চেকআউট", subtotal: "সাবটোটাল", delivery: "ডেলিভারি", total: "মোট", quantity: "পরিমাণ",
    customer: "ক্রেতার তথ্য", fullName: "পুরো নাম", phone: "ফোন নম্বর", address: "সম্পূর্ণ ডেলিভারি ঠিকানা",
    area: "ডেলিভারি এলাকা", payment: "পেমেন্ট পদ্ধতি", placeOrder: "অর্ডার করুন", orderSuccess: "অর্ডার সম্পন্ন!",
    orderRef: "আপনার অর্ডার রেফারেন্স", tracking: "অর্ডার ট্র্যাক করুন", trackPlaceholder: "অর্ডার রেফারেন্স বা ফোন দিন",
    search: "পণ্য খুঁজুন", language: "English", menu: "মেনু", close: "বন্ধ", remove: "সরান",
    noOrders: "অর্ডার করলে এখানে দেখা যাবে।", profileTitle: "আপনার প্রোফাইল",
    business: "ব্যবসার তথ্য", aboutTitle: "শাহী অ্যাগ্রো ফার্ম সম্পর্কে", aboutText: "আমরা গবাদিপশুর জন্য SHAHI GRASS SILAGE এবং পরিবারের জন্য SHAHI PREMIUM GHEE-সহ মানসম্মত কৃষিপণ্য ক্রেতাদের কাছে পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।", website: "অফিশিয়াল ওয়েবসাইট", social: "আমাদের অনুসরণ করুন", contactUs: "যোগাযোগ করুন", deliveryPartners: "ডেলিভারি পার্টনার", deliveryPromise: "আপনার অর্ডার ৩–৫ দিনের মধ্যে ডেলিভারি করা হবে।", location: "বাবুল চেয়ারম্যান বাড়ি, চর বজলুল করিম, চরবাটা-৩৮১৩, সুবর্ণচর, নোয়াখালী",
    contact: "ব্যবসায় ফোন করুন", cash: "ক্যাশ অন ডেলিভারি", bkash: "বিকাশ", nagad: "নগদ", upay: "উপায়", rocket: "রকেট",
    manualNote: "মোবাইল ব্যাংকিং অর্ডার পেমেন্ট যাচাইয়ের অপেক্ষায় থাকবে। চেকআউটে ট্রানজ্যাকশন আইডি দিন।",
    transaction: "ট্রানজ্যাকশন আইডি (প্রিপেইড হলে)", note: "অর্ডার নোট (ঐচ্ছিক)", status: "অর্ডারের অবস্থা",
    pending: "নিশ্চিতকরণের অপেক্ষায়", confirmed: "নিশ্চিত", processing: "প্রসেসিং", dispatched: "পাঠানো হয়েছে", delivered: "ডেলিভারি সম্পন্ন", cancelled: "বাতিল",
    admin: "অ্যাডমিন ড্যাশবোর্ড", adminLogin: "অ্যাডমিন লগইন", email: "ইমেইল", password: "পাসওয়ার্ড", signIn: "লগইন",
    adminHint: "অ্যাডমিন টুল ব্যবহারের আগে Supabase সেটআপ করে অ্যাডমিন রোল নির্ধারণ করুন।", dashboard: "ড্যাশবোর্ড",
    inventory: "ইনভেন্টরি", revenue: "মোট বিক্রি", expenses: "খরচ", profit: "আনুমানিক লাভ", export: "অর্ডার CSV ডাউনলোড",
    refresh: "ডেটা রিফ্রেশ", signOut: "লগআউট", ordersCount: "অর্ডার", save: "স্ট্যাটাস সংরক্ষণ", statusSaved: "স্ট্যাটাস পরিবর্তনের অনুরোধ পাঠানো হয়েছে।",
    setup: "ডেমো মোড", setupMsg: "Supabase সেটআপ করা নেই। ডেমোর জন্য অর্ডার শুধু এই ব্রাউজারে থাকবে।",
    online: "ব্যাকএন্ড সংযুক্ত", onlineMsg: "Supabase কনফিগারেশন পাওয়া গেছে.", minSilage: "সাইলেজ অর্ডার ২০ থেকে ৪০০ প্যাকেটের মধ্যে হতে হবে।",
    stock: "স্টক", available: "পাওয়া যাচ্ছে", faq: "সাধারণ প্রশ্ন", faq1: "ডেলিভারি চার্জ কীভাবে হিসাব হয়?", faq1a: "চেকআউটে নির্বাচিত এলাকার ভিত্তিতে ডেলিভারি চার্জ হিসাব হয়।",
    faq2: "মোবাইল পেমেন্ট কখন নিশ্চিত হবে?", faq2a: "ব্যবসা থেকে যাচাই না করা পর্যন্ত মোবাইল পেমেন্ট নিশ্চিত নয়। কখনো PIN বা OTP দেবেন না।",
    faq3: "অর্ডার কখন ডেলিভারি হবে?", faq3a: "সাধারণত ৩–৫ দিনের মধ্যে অর্ডার ডেলিভারি করা হবে। অ্যাপে অর্ডার ট্র্যাকিং সুবিধা নেই।",
    continue: "কেনাকাটা চালিয়ে যান", copied: "রেফারেন্স কপি হয়েছে", noResults: "কোনো পণ্য পাওয়া যায়নি।", customerRequired: "নাম, ফোন ও সম্পূর্ণ ঠিকানা দিন।",
    paymentRequired: "প্রিপেইড অর্ডারের জন্য ট্রানজ্যাকশন আইডি দিন.", adminOnly: "অ্যাডমিন অ্যাক্সেসের জন্য Supabase অ্যাডমিন অ্যাকাউন্ট দরকার।", gheePrice: "৯০০ গ্রাম — ৳১,৪৫০ · ২০০ গ্রাম — ৳৮০০"
  }
};

function money(n) { return "৳" + Number(n || 0).toLocaleString("en-US"); }
function loadLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveLocal(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function makeRef() { return "SAF-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(); }

function App() {
  const [lang, setLang] = useState(loadLocal("saf-lang", "en"));
  const t = copy[lang];
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState(loadLocal("saf-cart", {}));
  const [orders, setOrders] = useState(loadLocal("saf-orders", []));
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "", area: areas[0].en, payment: "cod", transaction: "", note: "" });
  const [trackingQuery, setTrackingQuery] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [session, setSession] = useState(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminExpenses, setAdminExpenses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => { saveLocal("saf-lang", lang); }, [lang]);
  useEffect(() => { saveLocal("saf-cart", cart); }, [cart]);
  useEffect(() => { saveLocal("saf-orders", orders); }, [orders]);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  const cartItems = useMemo(() => products.filter(p => cart[p.id] > 0).map(p => ({ ...p, quantity: cart[p.id] })), [cart]);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const deliveryFee = areas.find(a => a.en === form.area)?.fee ?? 130;
  const total = subtotal + deliveryFee;
  const filtered = products.filter(p => (p.name[lang] + " " + p.description[lang]).toLowerCase().includes(search.toLowerCase()));
  const changeQty = (id, delta) => {
    setCart(prev => {
      const p = products.find(x => x.id === id);
      const next = Math.max(0, (prev[id] || 0) + delta);
      if (id === "silage" && next > 0 && next < 20) {
        setNotice(t.minSilage);
        return { ...prev, [id]: next };
      }
      if (id === "silage" && next > 400) return { ...prev, [id]: 400 };
      return { ...prev, [id]: next };
    });
  };
  const addProduct = (p) => {
    setCart(prev => {
      const current = prev[p.id] || 0;
      if (p.id === "silage") return { ...prev, [p.id]: current === 0 ? 20 : Math.min(400, current + 20) };
      return { ...prev, [p.id]: current + 1 };
    });
    setNotice(lang === "bn" ? "কার্টে যোগ করা হয়েছে" : "Added to cart");
  };
  const go = (p) => { setPage(p); setMenuOpen(false); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const submitOrder = async (e) => {
    e.preventDefault(); setCheckoutError("");
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) { setCheckoutError(t.customerRequired); return; }
    if (!cartItems.length) { setCheckoutError(t.empty); return; }
    if (cart.silage > 0 && (cart.silage < 20 || cart.silage > 400)) { setCheckoutError(t.minSilage); return; }
    if (form.payment !== "cod" && !form.transaction.trim()) { setCheckoutError(t.paymentRequired); return; }
    const ref = makeRef();
    const payload = {
      reference: ref, customer_name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim(),
      area: form.area, payment_method: form.payment, transaction_id: form.transaction.trim() || null,
      payment_status: form.payment === "cod" ? "cash_on_delivery" : "awaiting_verification",
      note: form.note.trim(), items: cartItems.map(p => ({ id: p.id, name: p.name.en, quantity: p.quantity, unit_price: p.price, unit: p.unit.en })),
      subtotal, delivery_fee: deliveryFee, total, status: "pending", created_at: new Date().toISOString()
    };
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.from("orders").insert({
          reference: payload.reference, customer_name: payload.customer_name, phone: payload.phone,
          address: payload.address, area: payload.area, payment_method: payload.payment_method,
          transaction_id: payload.transaction_id, payment_status: payload.payment_status,
          note: payload.note, items: payload.items, subtotal: payload.subtotal, delivery_fee: payload.delivery_fee,
          total: payload.total, status: payload.status
        }).select("reference").single();
        if (error) throw error;
      }
      const next = [payload, ...orders];
      setOrders(next); setCart({}); setTrackingQuery(ref); setTrackingResult(payload);
      setPage("success"); setNotice("");
    } catch (err) {
      setCheckoutError("Could not save order: " + (err.message || "Please check Supabase setup."));
    } finally { setLoading(false); }
  };

  const loadAdminOrders = async () => {
    if (!supabase || !session) return;
    setLoading(true);
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(500);
    if (error) setNotice(error.message); else setAdminOrders(data || []);
    setLoading(false);
  };
  useEffect(() => { if (page === "admin" && session) loadAdminOrders(); }, [page, session]);

  const signIn = async (e) => {
    e.preventDefault();
    if (!supabase) { setNotice(t.adminOnly); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: adminEmail, password: adminPassword });
    if (error) setNotice(error.message);
    else { setNotice(""); await loadAdminOrders(); }
    setLoading(false);
  };
  const updateOrderStatus = async (order, status) => {
    if (!supabase) return;
    const { error } = await supabase.from("orders").update({ status }).eq("id", order.id);
    if (error) setNotice(error.message);
    else { setAdminOrders(prev => prev.map(o => o.id === order.id ? { ...o, status } : o)); setNotice(t.statusSaved); }
  };
  const trackOrder = async (e) => {
    e.preventDefault(); setTrackingResult(null);
    const q = trackingQuery.trim().toLowerCase();
    if (!q) return;
    if (supabase) {
      const { data, error } = await supabase.from("orders").select("reference,phone,status,total,created_at,payment_status").eq("reference", trackingQuery.trim()).maybeSingle();
      if (!error && data) { setTrackingResult(data); return; }
      const { data: byPhone } = await supabase.from("orders").select("reference,phone,status,total,created_at,payment_status").eq("phone", trackingQuery.trim()).order("created_at", { ascending: false }).limit(1).maybeSingle();
      if (byPhone) { setTrackingResult(byPhone); return; }
    }
    const found = orders.find(o => o.reference.toLowerCase() === q || o.phone === trackingQuery.trim());
    if (found) setTrackingResult(found);
    else setNotice(lang === "bn" ? "অর্ডার পাওয়া যায়নি।" : "No matching order found.");
  };
  const exportCsv = () => {
    const data = adminOrders.length ? adminOrders : orders;
    const rows = [["reference","customer_name","phone","area","payment_method","payment_status","subtotal","delivery_fee","total","status","created_at"], ...data.map(o => [o.reference,o.customer_name,o.phone,o.area,o.payment_method,o.payment_status,o.subtotal,o.delivery_fee,o.total,o.status,o.created_at])];
    const csv = rows.map(row => row.map(v => `"${String(v ?? "").replaceAll('"','""')}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "shahi-agro-orders.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const navItems = [
    ["home", Home, t.home], ["products", Package, t.products], ["orders", ReceiptText, t.orders], ["profile", UserRound, t.profile]
  ];
  const statusLabel = (s) => ({ pending: t.pending, confirmed: t.confirmed, processing: t.processing, dispatched: t.dispatched, delivered: t.delivered, cancelled: t.cancelled })[s] || s;

  return <div className="app-shell">
    <header className="topbar">
      <button className="icon-btn menu-btn" aria-label={t.menu} onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
      <button className="brand" onClick={() => go("home")} aria-label="SHAHI AGRO FARM home">
        <span className="brand-mark"><img src="/logo-mark.jpg" alt="" /></span>
        <span className="brand-copy"><strong>SHAHI AGRO FARM</strong><small>{t.tagline}</small></span>
      </button>
      <button className="lang-btn" onClick={() => setLang(lang === "en" ? "bn" : "en")}><Languages size={18}/><span>{t.language}</span></button>
      <button className="cart-top" onClick={() => go("cart")} aria-label={t.cart}><ShoppingCart/><b>{cartItems.reduce((s,p)=>s+p.quantity,0)}</b></button>
    </header>

    {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)}><aside className="drawer" onClick={e => e.stopPropagation()}><button className="close-btn" onClick={() => setMenuOpen(false)}><X/></button><div className="drawer-brand"><img src="/logo-mark.jpg"/><b>SHAHI AGRO FARM</b></div>{navItems.map(([id,Icon,label])=><button className="drawer-link" key={id} onClick={() => go(id)}><Icon/>{label}<ChevronRight/></button>)}<button className="drawer-link" onClick={() => go("about")}><Leaf/>{t.about}<ChevronRight/></button><div className="drawer-foot">{t.location}<br/><a href="tel:+8801604985164">+8801604985164</a></div></aside></div>}

    {notice && <button className="notice" onClick={() => setNotice("")}>{notice}<X size={15}/></button>}

    <main className="main">
      {page === "home" && <>
        <section className="hero">
          <div className="hero-copy"><span className="eyebrow"><Leaf size={15}/>{t.tagline}</span><h1>{t.heroTitle}</h1><p>{t.heroSub}</p><button className="primary-btn" onClick={() => go("products")}>{t.shop}<ChevronRight size={18}/></button></div>
          <div className="hero-art"><img src="/hero-ghee.svg" alt="SHAHI premium ghee jars"/></div>
        </section>
        <div className="section-head"><div><span className="overline">{t.products}</span><h2>{t.shop}</h2></div><button className="text-btn" onClick={() => go("products")}>{t.products}<ChevronRight size={16}/></button></div>
        <div className="product-grid">{products.map((p,i)=><ProductCard key={p.id} p={p} t={t} lang={lang} add={addProduct} details={setSelectedProduct} featured={i===0}/>)}</div>
        <section className="trust-strip"><div><Sprout/><b>{lang==="bn"?"প্রাকৃতিক কৃষি":"Agriculture-first"}</b><small>{lang==="bn"?"খামারের যত্নে":"Farm-focused"}</small></div><div><Truck/><b>{lang==="bn"?"এলাকাভিত্তিক ডেলিভারি":"Area-based delivery"}</b><small>{lang==="bn"?"স্বচ্ছ চার্জ":"Clear delivery fees"}</small></div><div><ShieldCheck/><b>{lang==="bn"?"নিরাপদ অর্ডার":"Order transparency"}</b><small>{lang==="bn"?"স্ট্যাটাস ট্র্যাক করুন":"Track order status"}</small></div></section>
        <FAQ t={t}/>
      </>}
      {page === "products" && <>
        <div className="page-title"><span className="overline">{t.products}</span><h1>{t.shop}</h1><p>{t.heroSub}</p></div>
        <label className="searchbox"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.search}/>{search&&<button onClick={()=>setSearch("")}><X/></button>}</label>
        <div className="product-grid">{filtered.map((p,i)=><ProductCard key={p.id} p={p} t={t} lang={lang} add={addProduct} details={setSelectedProduct} featured={p.type==="silage"}/>)}</div>
        {!filtered.length&&<p className="empty-state">{t.noResults}</p>}
      </>}
      {page === "cart" && <>
        <div className="page-title"><span className="overline">{t.checkout}</span><h1>{t.cart}</h1></div>
        {!cartItems.length ? <div className="empty-state"><ShoppingCart size={42}/><h3>{t.empty}</h3><button className="primary-btn" onClick={()=>go("products")}>{t.continue}</button></div> :
          <div className="cart-layout"><section className="panel cart-list">{cartItems.map(p=><div className="cart-row" key={p.id}><img src={p.image} alt=""/><div className="cart-product"><b>{p.name[lang]}</b><small>{p.unit[lang]}</small><strong>{money(p.price)}</strong></div><div className="quantity"><button onClick={()=>changeQty(p.id,-(p.id==="silage"?20:1))}><Minus/></button><b>{p.quantity}</b><button onClick={()=>changeQty(p.id,p.id==="silage"?20:1)}><Plus/></button></div><button className="remove-btn" onClick={()=>setCart(prev=>({...prev,[p.id]:0}))}>{t.remove}</button></div>)}</section>
          <section className="panel summary"><h2>{t.checkout}</h2><Summary t={t} subtotal={subtotal} fee={deliveryFee} total={total}/><button className="primary-btn full" onClick={()=>go("checkout")}>{t.checkout}<ChevronRight/></button></section></div>}
      </>}
      {page === "checkout" && <>
        <div className="page-title"><span className="overline">{t.cart}</span><h1>{t.checkout}</h1></div>
        <div className="checkout-layout"><form className="panel checkout-form" onSubmit={submitOrder}>
          <h2>{t.customer}</h2>
          <div className="form-grid"><Field label={t.fullName} value={form.name} onChange={v=>setForm({...form,name:v})} required/><Field label={t.phone} value={form.phone} onChange={v=>setForm({...form,phone:v})} required type="tel"/><Field label={t.address} value={form.address} onChange={v=>setForm({...form,address:v})} required wide/></div>
          <label className="field"><span>{t.area}</span><select value={form.area} onChange={e=>setForm({...form,area:e.target.value})}>{areas.map(a=><option key={a.en} value={a.en}>{a[lang]} — {money(a.fee)}</option>)}</select></label>
          <h2>{t.payment}</h2>
          <div className="payment-grid">{[["cod",t.cash],["bkash",t.bkash],["nagad",t.nagad],["upay",t.upay],["rocket",t.rocket]].map(([id,label])=><label className={"payment-option "+(form.payment===id?"selected":"")} key={id}><input type="radio" name="payment" value={id} checked={form.payment===id} onChange={()=>setForm({...form,payment:id})}/><WalletCards size={18}/><span>{label}</span></label>)}</div>
          {form.payment!=="cod"&&<><Field label={t.transaction} value={form.transaction} onChange={v=>setForm({...form,transaction:v})} required/><p className="hint">{t.manualNote}</p></>}
          <label className="field"><span>{t.note}</span><textarea value={form.note} onChange={e=>setForm({...form,note:e.target.value})} rows="2"/></label>
          {checkoutError&&<p className="error-text">{checkoutError}</p>}
          <button className="primary-btn full" disabled={loading}>{loading?"…":t.placeOrder}</button>
        </form><aside className="panel summary"><h2>{t.cart}</h2>{cartItems.map(p=><div className="summary-line" key={p.id}><span>{p.name[lang]} × {p.quantity}</span><b>{money(p.price*p.quantity)}</b></div>)}<Summary t={t} subtotal={subtotal} fee={deliveryFee} total={total}/></aside></div>
      </>}
      {page === "success" && <section className="success-panel panel"><CheckCircle2 size={54}/><h1>{t.orderSuccess}</h1><p>{t.orderRef}</p><button className="reference" onClick={()=>navigator.clipboard?.writeText(trackingQuery)}>{trackingQuery} <ClipboardList/></button><div className="delivery-promise"><Truck/><strong>{t.deliveryPromise}</strong></div><p className="hint">{form.payment==="cod"?t.cash:t.manualNote}</p><button className="primary-btn" onClick={()=>go("orders")}>{t.orders}</button><button className="text-btn" onClick={()=>go("home")}>{t.continue}</button></section>}
      {page === "orders" && <><div className="page-title"><span className="overline">{t.orders}</span><h1>{t.orders}</h1><p>{t.deliveryPromise}</p></div><section className="order-history">{orders.length===0?<p className="empty-state">{t.noOrders}</p>:orders.map(o=><OrderResult key={o.reference} order={o} t={t} statusLabel={statusLabel}/>)}</section></>}
      {page === "profile" && <><div className="page-title"><span className="overline">{t.profile}</span><h1>{t.profileTitle}</h1></div><section className="panel profile-card"><div className="profile-icon"><UserRound/></div><h2>SHAHI AGRO FARM</h2><p>{t.tagline}</p><div className="business-details"><h3>{t.business}</h3><p><Phone/><a href="tel:+8801604985164">+880 1604-985164</a></p><p><Phone/><a href="tel:+8801799900886">+880 1799-900886</a></p><p><MessageCircle/><a href="https://wa.me/8801814026318" target="_blank" rel="noreferrer">WhatsApp: +880 1814-026318</a></p><p><MapPin/>{t.location}</p></div><a className="primary-btn link-btn" href="tel:+8801604985164">{t.contact}</a><button className="secondary-btn" onClick={()=>go("about")}><Leaf size={18}/>{t.about}</button></section><FAQ t={t}/></>}
      {page === "about" && <><div className="page-title"><span className="overline">SHAHI AGRO FARM</span><h1>{t.aboutTitle}</h1><p>{t.aboutText}</p></div><section className="panel about-panel"><div className="about-brand"><img src="/logo-mark.jpg" alt="SHAHI AGRO FARM logo"/><div><h2>SHAHI AGRO FARM</h2><p>{t.tagline}</p></div></div><h3>{t.website}</h3><a className="about-link" href="https://shahiagrofarm.github.io/SHAHI-AGRO-FARM-WEB/" target="_blank" rel="noreferrer"><Globe/> shahiagrofarm.github.io <ExternalLink/></a><h3>{t.social}</h3><a className="about-link" href="https://www.facebook.com/share/1GpTpMBRHy/" target="_blank" rel="noreferrer"><Facebook/> Facebook <ExternalLink/></a><a className="about-link" href="https://www.instagram.com/shahi_agro_limited?dlrf=MTdqYWJxMXozbnUwdg==" target="_blank" rel="noreferrer"><Instagram/> Instagram @shahi_agro_limited <ExternalLink/></a><h3>{t.contactUs}</h3><a className="about-link" href="tel:+8801604985164"><Phone/> +880 1604-985164</a><a className="about-link" href="tel:+8801799900886"><Phone/> +880 1799-900886</a><a className="about-link" href="https://wa.me/8801814026318" target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp +880 1814-026318 <ExternalLink/></a><h3>{t.location}</h3><p className="about-address"><MapPin/> {t.location}</p><h3>{t.deliveryPartners}</h3><p className="hint">{t.deliveryPromise}</p><div className="partner-links"><a className="secondary-btn" href="https://steadfast.com.bd/" target="_blank" rel="noreferrer"><Truck/> Steadfast <ExternalLink/></a><a className="secondary-btn" href="https://pathao.com/courier/" target="_blank" rel="noreferrer"><Truck/> Pathao Courier <ExternalLink/></a></div><p className="hint">Courier websites open externally. Shipment booking and live courier status are not automatically connected by these links.</p></section></>}

    </main>

    <footer className="footer"><button className="footer-about" onClick={()=>go("about")}>{t.about}</button><div className="footer-brand"><img src="/logo-mark.jpg"/><div><b>SHAHI AGRO FARM</b><small>{t.tagline}</small></div></div><p>{t.location}</p><a href="tel:+8801604985164">+8801604985164</a><a href="https://wa.me/8801814026318" target="_blank" rel="noreferrer">WhatsApp: 01814026318</a><small>© {new Date().getFullYear()} SHAHI AGRO FARM</small></footer>
    <nav className="bottom-nav">{navItems.map(([id,Icon,label])=><button key={id} className={page===id?"active":""} onClick={()=>go(id)}><Icon/><span>{label}</span></button>)}</nav>

    {selectedProduct&&<div className="modal-backdrop" onClick={()=>setSelectedProduct(null)}><section className="product-modal" onClick={e=>e.stopPropagation()}><button className="close-btn" onClick={()=>setSelectedProduct(null)}><X/></button><img className="modal-product-img" src={selectedProduct.image}/><span className="pill">{selectedProduct.type==="silage"?t.mainProduct:t.secondary}</span><h2>{selectedProduct.name[lang]}</h2><p>{selectedProduct.description[lang]}</p><p>{selectedProduct.details[lang]}</p><h2>{money(selectedProduct.price)}</h2>{selectedProduct.type==="silage"&&<p className="hint">{t.minSilage}</p>}<button className="primary-btn full" onClick={()=>{addProduct(selectedProduct);setSelectedProduct(null)}}>{t.add}</button></section></div>}
  </div>;
}

function ProductCard({p,t,lang,add,details,featured}) {
  return <article className={"product-card "+(featured?"featured":"")}>
    <div className="product-image"><img src={p.image} alt={p.name[lang]}/><span className={"pill "+(p.type==="silage"?"green":"blue")}>{p.type==="silage"?t.mainProduct:t.secondary}</span></div>
    <div className="product-info"><h3>{p.name[lang]}</h3><p>{p.description[lang]}</p><small>{p.unit[lang]}</small>{p.type==="ghee"?<strong className="price">{money(p.price)}</strong>:<strong className="price">{money(p.price)} <small>/ {lang==="bn"?"প্যাকেট":"packet"}</small></strong>}<div className="card-actions"><button className="secondary-btn" onClick={()=>details(p)}>{t.details}</button><button className="primary-btn" onClick={()=>add(p)}><Plus size={17}/>{t.add}</button></div></div>
  </article>;
}
function Summary({t,subtotal,fee,total}) { return <div className="summary-totals"><div><span>{t.subtotal}</span><b>{money(subtotal)}</b></div><div><span>{t.delivery}</span><b>{money(fee)}</b></div><div className="total-line"><span>{t.total}</span><b>{money(total)}</b></div></div>; }
function Field({label,value,onChange,type="text",required=false,wide=false}) { return <label className={"field "+(wide?"wide":"")}><span>{label}</span><input type={type} value={value} onChange={e=>onChange(e.target.value)} required={required}/></label>; }
function OrderResult({order,t,statusLabel}) { return <section className="panel order-result"><div className="order-result-head"><div><span className="overline">{t.orderRef}</span><h3>{order.reference}</h3></div><span className={"status status-"+(order.status||"pending")}>{statusLabel(order.status||"pending")}</span></div><div className="order-result-grid"><div><small>{t.total}</small><b>{money(order.total)}</b></div><div><small>{t.payment}</small><b>{order.payment_method||"—"}</b></div><div><small>{t.status}</small><b>{order.payment_status||"—"}</b></div></div></section>; }
function FAQ({t}) { return <section className="faq"><div className="section-head"><div><span className="overline">SUPPORT</span><h2>{t.faq}</h2></div></div>{[["faq1","faq1a"],["faq2","faq2a"],["faq3","faq3a"]].map(([q,a])=><details key={q}><summary>{t[q]}<ChevronRight/></summary><p>{t[a]}</p></details>)}</section>; }
function Metric({icon,label,value}) { return <div className="metric panel"><span>{icon}</span><small>{label}</small><b>{value}</b></div>; }

createRoot(document.getElementById("root")).render(<App/>);