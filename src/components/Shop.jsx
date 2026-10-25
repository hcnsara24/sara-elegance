import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { products, categories } from "../data/products";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite, selectFavoriteIds } from "../store/favoritesSlice";

const icons = { Clothes: "👗", Accessories: "💍", Shoes: "👠" };

// Props: values and setter functions come from the parent
export function Filters({ search, setSearch, category, setCategory, sort, setSort }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search a product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            className={c === category ? "chip active" : "chip"}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="default">Sort by</option>
        <option value="low">Price: low to high</option>
        <option value="high">Price: high to low</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}
export function ProductCard({ product, onSelect }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteIds);
  const isFavorite = favorites.includes(product.id);

  // Local state: image failed to load?
  const [imgError, setImgError] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <article className="card" onClick={() => onSelect(product)}>
      <div className="card-img">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="placeholder">{icons[product.category]}</div>
        )}

        {discount && <span className="discount">-{discount}%</span>}

        <button
          className={isFavorite ? "fav active" : "fav"}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleFavorite(product.id));
          }}
          aria-label="Add to favorites"
        >
          ♥
        </button>
      </div>

      <div className="card-body">
        <p className="card-cat">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="card-desc">{product.description}</p>

        <div className="price-row">
          <span className="price">{product.price.toLocaleString()} DA</span>
          {product.oldPrice && (
            <span className="old-price">
              {product.oldPrice.toLocaleString()} DA
            </span>
          )}
        </div>

        <span className="view-link">View details →</span>

        <button
          className="add-btn"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export function ProductList({ onSelect }) {
  // Local state for the UI filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  let visible = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "low") visible = [...visible].sort((a, b) => a.price - b.price);
  if (sort === "high") visible = [...visible].sort((a, b) => b.price - a.price);
  if (sort === "name")
    visible = [...visible].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section id="shop" className="shop">
      <h2>Our Collection</h2>
      <Filters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {visible.length === 0 ? (
        <p className="empty">No product found.</p>
      ) : (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}
