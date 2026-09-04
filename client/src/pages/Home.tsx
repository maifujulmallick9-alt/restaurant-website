import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

type Dietary = "Veg" | "Non-Veg";
type Cuisine = "All" | "Indian" | "Italian" | "American" | "Japanese" | "Korean";
type Dish = { id: number; name: string; cuisine: Exclude<Cuisine, "All">; dietary: Dietary; detail: string; price: number; image: string; spicy?: boolean };

const phone = "917477471806";
const baseWhatsApp = `https://wa.me/${phone}`;
const heroWhatsApp = `${baseWhatsApp}?text=Hi%20Meal%20with%20Mallick%2C%20I%27d%20like%20to%20know%20more%20about%20your%20menu.`;

const dishes: Dish[] = [
  { id: 1, name: "Royal Thali", cuisine: "Indian", dietary: "Veg", detail: "Paneer, dal makhani, rice, roti & seasonal sabzi", price: 599, image: "/manus-storage/thali_01e6bddd.jpg", spicy: false },
  { id: 2, name: "Smoked Tandoor", cuisine: "Indian", dietary: "Non-Veg", detail: "Charred chicken skewers, mint & fire-roasted lemon", price: 449, image: "/manus-storage/grill_6c354c4f.jpg", spicy: true },
  { id: 3, name: "Saffron Silk", cuisine: "Indian", dietary: "Veg", detail: "Cardamom panna cotta, pistachio & rose petals", price: 299, image: "/manus-storage/dessert_91161b2e.jpg" },
  { id: 4, name: "Truffle Alfredo", cuisine: "Italian", dietary: "Veg", detail: "Hand-cut pasta, wild mushrooms & parmesan", price: 549, image: "/manus-storage/thali_01e6bddd.jpg" },
  { id: 5, name: "Chicken Arrabbiata", cuisine: "Italian", dietary: "Non-Veg", detail: "Slow-cooked tomato, basil, chilli & grilled chicken", price: 599, image: "/manus-storage/grill_6c354c4f.jpg", spicy: true },
  { id: 6, name: "Smashhouse Burger", cuisine: "American", dietary: "Veg", detail: "Crispy potato patty, cheddar, lettuce & house sauce", price: 399, image: "/manus-storage/dessert_91161b2e.jpg" },
  { id: 7, name: "Mallick BBQ Burger", cuisine: "American", dietary: "Non-Veg", detail: "Double grilled chicken, smoky BBQ & pickles", price: 499, image: "/manus-storage/grill_6c354c4f.jpg" },
  { id: 8, name: "Miso Ramen", cuisine: "Japanese", dietary: "Veg", detail: "Miso broth, tofu, greens, corn & sesame", price: 449, image: "/manus-storage/thali_01e6bddd.jpg" },
  { id: 9, name: "Teriyaki Chicken", cuisine: "Japanese", dietary: "Non-Veg", detail: "Glazed chicken, steamed rice, edamame & sesame", price: 549, image: "/manus-storage/grill_6c354c4f.jpg" },
  { id: 10, name: "Korean Fried Cauliflower", cuisine: "Korean", dietary: "Veg", detail: "Gochujang glaze, scallion, sesame & kimchi slaw", price: 399, image: "/manus-storage/dessert_91161b2e.jpg", spicy: true },
  { id: 11, name: "K-BBQ Wings", cuisine: "Korean", dietary: "Non-Veg", detail: "Sticky gochujang wings, sesame & spring onion", price: 499, image: "/manus-storage/grill_6c354c4f.jpg", spicy: true },
  { id: 12, name: "Burrata Pomodoro", cuisine: "Italian", dietary: "Veg", detail: "Creamy burrata, cherry tomato, basil & sourdough", price: 499, image: "/manus-storage/dessert_91161b2e.jpg" },
];

const faqs = [
  ["Can I order from the website?", "Yes. Add dishes to your cart, review your order, then tap Order on WhatsApp. We’ll confirm availability and delivery details with you directly."],
  ["Do you have vegetarian and non-vegetarian dishes?", "Yes. Every cuisine has clearly marked Veg and Non-Veg choices so everyone can find something delicious."],
  ["Do you deliver around Citi Egra?", "We serve Citi Egra and nearby areas in West Bengal. Message us on WhatsApp with your address and we’ll confirm delivery availability."],
  ["What are your opening hours?", "We’re open Tuesday to Sunday, 12:00 PM to 11:00 PM. Mondays are reserved for prep and dreaming up the next dish."],
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cuisine, setCuisine] = useState<Cuisine>("All");
  const [dietary, setDietary] = useState<"All" | Dietary>("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };
  const filteredDishes = dishes.filter((dish) => (cuisine === "All" || dish.cuisine === cuisine) && (dietary === "All" || dish.dietary === dietary));
  const cartItems = useMemo(() => dishes.filter((dish) => cart[dish.id]).map((dish) => ({ ...dish, quantity: cart[dish.id] })), [cart]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const updateCart = (id: number, delta: number) => setCart((current) => { const next = Math.max(0, (current[id] || 0) + delta); const copy = { ...current }; if (next === 0) delete copy[id]; else copy[id] = next; return copy; });
  const orderOnWhatsApp = () => { const lines = cartItems.map((item) => `${item.quantity}x ${item.name} (${item.dietary}) - ₹${item.price * item.quantity}`).join("%0A"); const text = `Hi Meal with Mallick!%0AI would like to order:%0A%0A${lines}%0A%0ATotal: ₹${cartTotal}%0A%0AMy delivery location is: `; window.open(`${baseWhatsApp}?text=${text}`, "_blank"); };

  return (
    <div className="site-shell">
      <div className="topline"><span>Open today · 12:00 PM — 11:00 PM</span><span className="topline-right">Citi Egra · West Bengal <Sparkles size={13} /></span></div>
      <header className="nav-wrap"><nav className="nav container"><button className="brand" onClick={() => scrollTo("home")} aria-label="Meal with Mallick home"><span className="brand-mark">M</span><span>Meal <i>with</i> Mallick</span></button><div className={`nav-links ${mobileOpen ? "is-open" : ""}`}><button onClick={() => scrollTo("story")}>Our story</button><button onClick={() => scrollTo("menu")}>Order food</button><button onClick={() => scrollTo("location")}>Location</button><button onClick={() => scrollTo("faq")}>FAQs</button><a href={heroWhatsApp} target="_blank" rel="noreferrer" className="nav-cta"><MessageCircle size={16} /> WhatsApp us</a></div><button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button></nav></header>

      <main>
        <section className="hero" id="home"><img className="hero-image" src="/manus-storage/hero_f1d25d3e.jpg" alt="A candlelit spread of Indian-inspired dishes" /><div className="hero-overlay" /><div className="hero-content container"><div className="eyebrow light"><span className="eyebrow-line" /> A table worth gathering around</div><h1>Good food.<br /><em>Better stories.</em></h1><p className="hero-copy">Five cuisines, one generous table. Order your favourites from Citi Egra and make tonight delicious.</p><div className="hero-actions"><button className="button button-gold" onClick={() => scrollTo("menu")}><ShoppingBag size={18} /> Order food <ArrowUpRight size={16} /></button><button className="text-link light" onClick={() => scrollTo("menu")}>Explore the menu <span>↓</span></button></div></div><div className="hero-note">01 <span /> Freshly made. Carefully packed. Delivered with warmth.</div></section>

        <section className="intro section-pad" id="story"><div className="container intro-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> The Mallick table</div><h2>Every craving has a place.<br /><em>Every guest has a seat.</em></h2></div><div className="intro-copy"><p>Meal with Mallick is a love letter to the food we grew up with—and the flavours we keep discovering. From Indian comfort classics to Italian, American, Japanese and Korean favourites, our kitchen makes every plate feel like it belongs at your table.</p><p>Choose Veg or Non-Veg, add to your order, and let’s make your meal memorable.</p><button className="text-link" onClick={() => scrollTo("menu")}>Build your order <ArrowUpRight size={16} /></button></div></div><div className="container stat-row"><div><strong>05</strong><span>World cuisines</span></div><div><strong>02</strong><span>Dietary choices</span></div><div><strong>01</strong><span>Happy table</span></div></div></section>

        <section className="menu-section section-pad" id="menu"><div className="container"><div className="section-heading"><div><div className="eyebrow light"><span className="eyebrow-line" /> Order from our kitchen</div><h2>Pick your mood.<br /><em>We’ll make it.</em></h2></div><div className="order-summary"><span>{cartCount} item{cartCount === 1 ? "" : "s"} · ₹{cartTotal}</span><button className="button button-gold cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={16} /> View order</button></div></div>
          <div className="filter-bar"><div className="filter-group"><span className="filter-label">Cuisine</span>{(["All", "Indian", "Italian", "American", "Japanese", "Korean"] as Cuisine[]).map((item) => <button key={item} className={cuisine === item ? "filter active" : "filter"} onClick={() => setCuisine(item)}>{item}</button>)}</div><div className="filter-group"><span className="filter-label">Diet</span>{(["All", "Veg", "Non-Veg"] as const).map((item) => <button key={item} className={dietary === item ? "filter active" : "filter"} onClick={() => setDietary(item)}>{item === "Veg" ? "● Veg" : item === "Non-Veg" ? "● Non-Veg" : "All"}</button>)}</div></div>
          <div className="dish-grid">{filteredDishes.map((dish) => <article className="dish-card" key={dish.id}><div className="dish-image-wrap"><img src={dish.image} alt={dish.name} /><span className={`diet-badge ${dish.dietary === "Veg" ? "veg" : "nonveg"}`}>{dish.dietary}</span>{dish.spicy && <span className="spicy-badge">Chilli</span>}</div><div className="dish-card-bottom"><div className="dish-meta"><span className="cuisine-name">{dish.cuisine}</span><h3>{dish.name}</h3><p>{dish.detail}</p></div><div className="dish-buy"><strong>₹ {dish.price}</strong><button className="add-button" onClick={() => updateCart(dish.id, 1)}><Plus size={15} /> Add</button></div></div></article>)}</div>
          {filteredDishes.length === 0 && <div className="empty-menu">No dishes match those filters. Try another combination.</div>}
          <div className="menu-foot"><span>Order online, confirm on WhatsApp, enjoy at home.</span><button className="button button-outline" onClick={() => setCartOpen(true)}><ShoppingBag size={16} /> Review your order</button></div>
        </div></section>

        <section className="quote-section"><div className="container quote-grid"><div className="quote-mark">“</div><blockquote>Different cravings,<br /><em>one happy table.</em></blockquote><div className="quote-aside"><span className="eyebrow"><span className="eyebrow-line" /> A note from us</span><p>Whether you’re craving curry, pasta, ramen, burgers or bold Korean spice, there’s always room for your favourite at our table.</p></div></div></section>

        <section className="location-section section-pad" id="location"><div className="container location-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> Find us</div><h2>Made in <em>Citi Egra.</em><br />Made for you.</h2><p className="location-copy">Meal with Mallick brings warm food and easy ordering to Citi Egra, West Bengal. Message us with your address and we’ll help you plan your delivery.</p><div className="location-details"><div><MapPin size={18} /><span><strong>Citi Egra</strong><small>West Bengal, India</small></span></div><div><Clock3 size={18} /><span><strong>Tuesday — Sunday</strong><small>12:00 PM — 11:00 PM</small></span></div></div><a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=Citi+Egra+West+Bengal" target="_blank" rel="noreferrer"><MapPin size={16} /> Open in Google Maps <ArrowUpRight size={15} /></a></div><div className="map-card"><div className="map-orbit orbit-one" /><div className="map-orbit orbit-two" /><div className="map-pin"><MapPin size={28} /></div><span className="map-label">MEAL WITH MALLICK<br /><small>CITI EGRA, WEST BENGAL</small></span></div></div></section>

        <section className="faq-section section-pad" id="faq"><div className="container faq-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> Good to know</div><h2>Your questions,<br /><em>answered.</em></h2><p className="faq-intro">Still curious? We’re only a message away.</p><a href={heroWhatsApp} target="_blank" rel="noreferrer" className="text-link">Ask us on WhatsApp <ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong><ChevronDown size={20} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

        <section className="contact-section" id="contact"><div className="container contact-inner"><div><div className="eyebrow light"><span className="eyebrow-line" /> Pull up a chair</div><h2>Let’s make<br /><em>it delicious.</em></h2><p>Order online, call us, or message us from Citi Egra.</p></div><div className="contact-actions"><button className="button button-gold" onClick={() => scrollTo("menu")}><ShoppingBag size={18} /> Start an order</button><a className="contact-phone" href="tel:+917477471806"><Phone size={16} /> 7477471806</a></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-top"><div className="brand footer-brand"><span className="brand-mark">M</span><span>Meal <i>with</i> Mallick</span></div><p>Food for the soul,<br />served with a smile.</p><div className="footer-contact"><a href="mailto:maifujulmallick9@gmail.com"><Mail size={15} /> maifujulmallick9@gmail.com</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={15} /> Follow along</a></div></div><div className="container footer-bottom"><span>© 2024 Meal with Mallick</span><span>Website created by <strong>Maifujul Mallick</strong></span><span><MapPin size={13} /> Citi Egra, West Bengal</span></div></footer>

      {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-head"><div><span className="eyebrow"><span className="eyebrow-line" /> Your order</span><h3>Ready when you are.</h3></div><button onClick={() => setCartOpen(false)} aria-label="Close order"><X /></button></div>{cartItems.length === 0 ? <div className="cart-empty"><ShoppingBag size={30} /><p>Your order is waiting for something delicious.</p><button className="button button-dark" onClick={() => { setCartOpen(false); scrollTo("menu"); }}>Browse menu</button></div> : <><div className="cart-items">{cartItems.map((item) => <div className="cart-item" key={item.id}><div><strong>{item.name}</strong><small>{item.dietary} · ₹{item.price}</small></div><div className="quantity"><button onClick={() => updateCart(item.id, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => updateCart(item.id, 1)}><Plus size={13} /></button><button className="remove" onClick={() => updateCart(item.id, -item.quantity)}><Trash2 size={14} /></button></div></div>)}</div><div className="cart-total"><span>Total</span><strong>₹ {cartTotal}</strong></div><button className="button button-gold checkout-button" onClick={orderOnWhatsApp}><MessageCircle size={18} /> Order on WhatsApp <ArrowUpRight size={16} /></button><p className="checkout-note">We’ll confirm your order, address and delivery time on WhatsApp.</p></>}</aside></div>}
    </div>
  );
}
