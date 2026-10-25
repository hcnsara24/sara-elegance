import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../data/products";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../store/cartSlice";
import { toggleFavorite, selectFavoriteIds } from "../store/favoritesSlice";

export function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>{item.price.toLocaleString()} DA</p>

        <div className="qty">
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
        </div>
      </div>

      <div className="cart-item-right">
        <strong>{(item.price * item.quantity).toLocaleString()} DA</strong>
        <button className="remove" onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </button>
      </div>
    </div>
  );
}

export function Cart({ open, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <>
      <div className={open ? "overlay show" : "overlay"} onClick={onClose} />
      <aside className={open ? "cart open" : "cart"}>
        <div className="cart-head">
          <h2>Your Cart</h2>
          <button className="close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="total">
              <span>Total</span>
              <strong>{total.toLocaleString()} DA</strong>
            </div>
            <button
              className="add-btn"
              onClick={() => alert("Demo only: no payment in this lab.")}
            >
              Checkout
            </button>
            <button className="clear" onClick={() => dispatch(clearCart())}>
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export function FavoritesPanel({ open, onClose }) {
  const dispatch = useDispatch();
  const ids = useSelector(selectFavoriteIds);
  const favorites = products.filter((p) => ids.includes(p.id));

  return (
    <>
      <div className={open ? "overlay show" : "overlay"} onClick={onClose} />
      <aside className={open ? "cart open" : "cart"}>
        <div className="cart-head">
          <h2>Your Favorites ♥</h2>
          <button className="close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {favorites.length === 0 ? (
            <p className="empty">
              No favorites yet. Click the ♥ on a product to save it here.
            </p>
          ) : (
            favorites.map((p) => (
              <div className="cart-item fav-item" key={p.id}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="fav-thumb"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="cart-item-info">
                  <h4>{p.name}</h4>
                  <p>{p.price.toLocaleString()} DA</p>
                  <button className="mini-btn" onClick={() => dispatch(addToCart(p))}>
                    Add to cart
                  </button>
                </div>
                <button className="remove" onClick={() => dispatch(toggleFavorite(p.id))}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}

export function SignInModal({ open, onClose }) {
  // Local state
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(
      mode === "signin"
        ? `Welcome back, ${email}! (demo only, no backend in this lab)`
        : `Account created for ${name || email}! (demo only)`
    );
    setPassword("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close modal-close" onClick={onClose}>✕</button>
        <h2>{mode === "signin" ? "Sign in" : "Create account"}</h2>
        <p className="modal-sub">
          {mode === "signin" ? "Welcome back to Sara Elegance" : "Join Sara Elegance"}
        </p>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" className="add-btn">
            {mode === "signin" ? "Sign in" : "Register"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <p className="switch">
          {mode === "signin" ? "New here? " : "Already have an account? "}
          <button
            className="link-btn"
            onClick={() => {
              setMode(mode === "signin" ? "register" : "signin");
              setMessage("");
            }}
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
const categoryIcons = { Clothes: "👗", Accessories: "💍", Shoes: "👠" };

export function ProductModal({ product, onClose, onAdded }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteIds);
  const isFavorite = favorites.includes(product.id);

  // Local state
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);

  // If the input is empty while typing, count 1
  const quantity = qty === "" ? 1 : qty;
  const total = product.price * quantity;

  const handleInput = (e) => {
    const value = parseInt(e.target.value, 10);
    setQty(isNaN(value) ? "" : Math.min(99, Math.max(1, value)));
  };

  const handleAdd = () => {
    dispatch(addToCart({ ...product, quantity }));
    onAdded();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close modal-close" onClick={onClose}>✕</button>

        <div className="pm-img">
          {!imgError ? (
            <img src={product.image} alt={product.name} onError={() => setImgError(true)} />
          ) : (
            <div className="placeholder">{categoryIcons[product.category]}</div>
          )}
          <button
            className={isFavorite ? "fav active" : "fav"}
            onClick={() => dispatch(toggleFavorite(product.id))}
            aria-label="Add to favorites"
          >
            ♥
          </button>
        </div>

        <div className="pm-info">
          <p className="card-cat">{product.category}</p>
          <h2>{product.name}</h2>

          <div className="price-row">
            <span className="price pm-price">{product.price.toLocaleString()} DA</span>
            {product.oldPrice && (
              <span className="old-price">{product.oldPrice.toLocaleString()} DA</span>
            )}
          </div>

          <p className="pm-desc">{product.description}</p>

          <label className="pm-label">Quantity</label>
          <div className="qty-box">
            <button onClick={() => setQty(Math.max(1, quantity - 1))}>−</button>
            <input
              type="number"
              min="1"
              max="99"
              value={qty}
              onChange={handleInput}
              onBlur={() => qty === "" && setQty(1)}
            />
            <button onClick={() => setQty(Math.min(99, quantity + 1))}>+</button>
          </div>

          <div className="pm-total">
            <div>
              <span>{quantity} × {product.price.toLocaleString()} DA</span>
              <small>Total price</small>
            </div>
            <strong>{total.toLocaleString()} DA</strong>
          </div>

          <button className="add-btn" onClick={handleAdd}>
            Add {quantity} to cart
          </button>
        </div>
      </div>
    </div>
  );
}
