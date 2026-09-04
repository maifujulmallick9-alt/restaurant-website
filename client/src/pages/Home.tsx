import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

const WA_LINK = "https://wa.me/917477471806?text=Hi%20Meal%20with%20Mallick%2C%20I%27d%20like%20to%20know%20more%20about%20your%20menu.";

const menuHighlights = [
  { name: "Royal Thali", detail: "A generous table of the day's best", price: "₹ 599", image: "/manus-storage/thali_01e6bddd.jpg", tag: "Signature" },
  { name: "Smoked Tandoor", detail: "Charred skewers, mint & fire", price: "₹ 449", image: "/manus-storage/grill_6c354c4f.jpg", tag: "From the fire" },
  { name: "Saffron Silk", detail: "Cardamom, pistachio & petals", price: "₹ 299", image: "/manus-storage/dessert_91161b2e.jpg", tag: "Sweet finish" },
];

const faqs = [
  ["Do you take reservations?", "Absolutely. Send us a WhatsApp message or call 7477471806 and we’ll set aside a table for you."],
  ["Is the menu vegetarian-friendly?", "Yes. Our kitchen celebrates vegetables, grains and spices, with generous vegetarian options across every course."],
  ["Can I order for a special occasion?", "We love making moments memorable. Tell us what you’re celebrating and we’ll help you plan the perfect spread."],
  ["What are your opening hours?", "We’re open Tuesday to Sunday, 12:00 PM to 11:00 PM. Mondays are reserved for prep and dreaming up the next dish."],
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="topline"><span>Open today · 12:00 PM — 11:00 PM</span><span className="topline-right">Made for slow meals & good company <Sparkles size={13} /></span></div>
      <header className="nav-wrap">
        <nav className="nav container">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="Meal with Mallick home"><span className="brand-mark">M</span><span>Meal <i>with</i> Mallick</span></button>
          <div className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
            <button onClick={() => scrollTo("story")}>Our story</button>
            <button onClick={() => scrollTo("menu")}>Menu</button>
            <button onClick={() => scrollTo("faq")}>FAQs</button>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="nav-cta"><MessageCircle size={16} /> WhatsApp us</a>
          </div>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src="/manus-storage/hero_f1d25d3e.jpg" alt="A candlelit spread of Indian-inspired dishes" />
          <div className="hero-overlay" />
          <div className="hero-content container">
            <div className="eyebrow light"><span className="eyebrow-line" /> A table worth gathering around</div>
            <h1>Good food.<br /><em>Better stories.</em></h1>
            <p className="hero-copy">A modern Indian table in the heart of your everyday. Come hungry, leave a little happier.</p>
            <div className="hero-actions"><a href={WA_LINK} target="_blank" rel="noreferrer" className="button button-gold"><MessageCircle size={18} /> Start a conversation <ArrowUpRight size={16} /></a><button className="text-link light" onClick={() => scrollTo("menu")}>Explore the menu <span>↓</span></button></div>
          </div>
          <div className="hero-note">01 <span /> Slow-cooked. Shared. Remembered.</div>
        </section>

        <section className="intro section-pad" id="story">
          <div className="container intro-grid">
            <div><div className="eyebrow"><span className="eyebrow-line" /> The Mallick table</div><h2>Some meals feed you.<br /><em>Some stay with you.</em></h2></div>
            <div className="intro-copy"><p>Meal with Mallick is a love letter to the food we grew up with—and the people we grew alongside. We bring familiar Indian flavours into a fresh, relaxed setting, with ingredients that are honest and plates made to be passed around.</p><p>Nothing fussy. Nothing rushed. Just food with a little soul in it.</p><button className="text-link" onClick={() => scrollTo("contact")}>Come as you are <ArrowUpRight size={16} /></button></div>
          </div>
          <div className="container stat-row"><div><strong>01</strong><span>Warm, generous plates</span></div><div><strong>02</strong><span>Ingredients with a story</span></div><div><strong>03</strong><span>A table for everyone</span></div></div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="container"><div className="section-heading"><div><div className="eyebrow light"><span className="eyebrow-line" /> From our kitchen</div><h2>A little taste<br /><em>of what’s to come.</em></h2></div><p>Our menu moves with the seasons, but the feeling stays the same: generous, thoughtful, and made to be shared.</p></div>
            <div className="menu-grid">{menuHighlights.map((item, index) => <article className={`menu-card card-${index + 1}`} key={item.name}><div className="menu-image-wrap"><img src={item.image} alt={item.name} /><span className="menu-tag">{item.tag}</span></div><div className="menu-card-bottom"><div><h3>{item.name}</h3><p>{item.detail}</p></div><span className="price">{item.price}</span></div></article>)}</div>
            <div className="menu-foot"><span>Ask us about today’s specials</span><a href={WA_LINK} target="_blank" rel="noreferrer" className="button button-outline"><MessageCircle size={16} /> WhatsApp for the full menu</a></div>
          </div>
        </section>

        <section className="quote-section"><div className="container quote-grid"><div className="quote-mark">“</div><blockquote>Come for the food,<br /><em>stay for the feeling.</em></blockquote><div className="quote-aside"><span className="eyebrow"><span className="eyebrow-line" /> A note from us</span><p>There’s always room at our table. Whether it’s your first visit or your fiftieth, we’ll be here with something warm on the stove.</p></div></div></section>

        <section className="faq-section section-pad" id="faq"><div className="container faq-grid"><div><div className="eyebrow"><span className="eyebrow-line" /> Good to know</div><h2>Your questions,<br /><em>answered.</em></h2><p className="faq-intro">Still curious? We’re only a message away.</p><a href={WA_LINK} target="_blank" rel="noreferrer" className="text-link">Ask us on WhatsApp <ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong><ChevronDown size={20} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></section>

        <section className="contact-section" id="contact"><div className="container contact-inner"><div><div className="eyebrow light"><span className="eyebrow-line" /> Pull up a chair</div><h2>Let’s make<br /><em>it delicious.</em></h2><p>For reservations, celebrations, or just a craving you can’t ignore.</p></div><div className="contact-actions"><a href={WA_LINK} target="_blank" rel="noreferrer" className="button button-gold"><MessageCircle size={18} /> Chat on WhatsApp</a><a className="contact-phone" href="tel:+917477471806"><Phone size={16} /> 7477471806</a></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-top"><div className="brand footer-brand"><span className="brand-mark">M</span><span>Meal <i>with</i> Mallick</span></div><p>Food for the soul,<br />served with a smile.</p><div className="footer-contact"><a href="mailto:maifujulmallick9@gmail.com"><Mail size={15} /> maifujulmallick9@gmail.com</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={15} /> Follow along</a></div></div><div className="container footer-bottom"><span>© 2024 Meal with Mallick</span><span>Website created by <strong>Maifujul Mallick</strong></span><span><MapPin size={13} /> Your neighbourhood, India</span></div></footer>
    </div>
  );
}
