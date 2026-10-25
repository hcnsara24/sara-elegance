import { useState } from "react";
import { HERO_IMAGE } from "../data/products";

export function Hero() {
  return (
    <section
      id="home"
      className="hero"
      style={{
        backgroundImage: `linear-gradient(100deg, rgba(60,10,28,0.88) 0%, rgba(60,10,28,0.55) 45%, rgba(0,0,0,0.1) 100%), url(${HERO_IMAGE})`,
      }}
    >
      <div className="hero-content">
        <p className="hero-sub">New Season · 2026</p>
        <h1>
          Where elegance <br />
          becomes <em>your signature</em>
        </h1>
        <p className="hero-text">
          Refined dresses, timeless accessories and luxurious shoes, selected
          for the woman who dresses with intention.
        </p>
        <div className="hero-buttons">
          <a href="#shop" className="hero-btn">Shop the collection</a>
          <a href="#contact" className="hero-btn outline">Contact us</a>
        </div>

        <div className="hero-stats">
          <div><strong>12+</strong><span>Signature pieces</span></div>
          <div><strong>100%</strong><span>Premium fabrics</span></div>
          <div><strong>48h</strong><span>Fast delivery</span></div>
        </div>
      </div>
    </section>
  );
}

const featureList = [
  {
    title: "Free Delivery",
    text: "On all orders over 15 000 DA",
    icon: (
      <>
        <path d="M1 6h13v10H1z" />
        <path d="M14 9h4l3 3v4h-7z" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </>
    ),
  },
  {
    title: "Easy Returns",
    text: "14 days to change your mind",
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </>
    ),
  },
  {
    title: "Secure Payment",
    text: "Your data is always protected",
    icon: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
  },
  {
    title: "Gift Wrapping",
    text: "Luxury packaging, on request",
    icon: (
      <>
        <rect x="3" y="8" width="18" height="4" />
        <path d="M12 8v13" />
        <path d="M5 12v9h14v-9" />
        <path d="M12 8c-1-3-5-4-5-1.5S10 8 12 8zm0 0c1-3 5-4 5-1.5S14 8 12 8z" />
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="features">
      {featureList.map((f) => (
        <div className="feature" key={f.title}>
          <div className="feature-icon">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {f.icon}
            </svg>
          </div>
          <h4>{f.title}</h4>
          <p>{f.text}</p>
        </div>
      ))}
    </section>
  );
}
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-info">
        <p className="hero-sub">Get in touch</p>
        <h2>We would love to hear from you</h2>
        <p>Questions about an order, sizes or styling advice? Our team answers within 24 hours.</p>
        <ul>
          <li>📍 Algiers, Algeria</li>
          <li>📞 +213 555 00 00 00</li>
          <li>✉️ contact@sara-elegance.com</li>
          <li>🕒 Sat – Thu · 9:00 – 18:00</li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
        <textarea name="message" rows="5" placeholder="Your message" value={form.message} onChange={handleChange} required />
        <button type="submit" className="add-btn">Send message</button>
        {sent && <p className="form-message">Thank you! Your message has been sent. ✨</p>}
      </form>
    </section>
  );
}
