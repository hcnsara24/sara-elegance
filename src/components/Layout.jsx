import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cartSlice";
import { selectFavoriteIds } from "../store/favoritesSlice";

export function Logo({ light = false }) {
  return (
    <div className={light ? "brand light" : "brand"}>
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="22" className="logo-ring" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="18.5" className="logo-ring" strokeWidth="0.6" />
        <text
          x="24"
          y="32"
          textAnchor="middle"
          fontFamily="Playfair Display, serif"
          fontSize="24"
          fontWeight="700"
          fontStyle="italic"
          className="logo-text"
        >
          S
        </text>
      </svg>
      <div className="brand-text">
        <span className="brand-name">Sara Elegance</span>
        <span className="brand-tag">Women's Fashion</span>
      </div>
    </div>
  );
}
export function Header({ onCartClick, onFavClick, onSignInClick }) {
  const cartCount = useSelector(selectCartCount);
  const favCount = useSelector(selectFavoriteIds).length;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <a href="#home" className="brand-link">
        <Logo />
      </a>

      <nav className={menuOpen ? "nav open" : "nav"}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#shop" onClick={closeMenu}>Shop</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>

      <div className="actions">
        <button className="icon-btn" onClick={onFavClick} aria-label="Favorites">
          ♥
          {favCount > 0 && <span className="badge">{favCount}</span>}
        </button>
        <button className="icon-btn" onClick={onCartClick} aria-label="Cart">
          🛍
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
        <button className="signin-btn" onClick={onSignInClick}>
          Sign in
        </button>
        <button
          className="burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Logo light />
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <p className="footer-bottom">
        © 2026 Sara Elegance — Elegance, delivered
      </p>
    </footer>
  );
}
