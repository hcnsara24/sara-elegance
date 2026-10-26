# Sara Elegance: Women's Fashion Store

**Student name:** HOCINE Sara
**Application name:** Sara Elegance
**Module:** WAMD, ENSTA, TD-TP 2

## Description
A React web application for an online women's fashion store (clothes, accessories and shoes). Users can browse products, view details, choose a quantity, save favorites and manage a shopping cart. Cart and favorites are managed globally with Redux.

## Technologies
React.js, JSX, JavaScript (ES6+), Redux Toolkit, React-Redux, Vite, CSS3

## Main components
- `Layout.jsx`: Logo, Header, Footer
- `Sections.jsx`: Hero, Features, Contact
- `Shop.jsx`: Filters, ProductList, ProductCard
- `Overlays.jsx`: Cart, CartItem, FavoritesPanel, SignInModal, ProductModal

## Redux state
```js
{
  cart:      { items: [ { id, name, price, image, quantity } ] },
  favorites: { ids: [1, 4, 7] }
}
```
Actions: `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`, `toggleFavorite`

## Features
- Product catalog and product detail window (description, quantity, total price)
- Add and remove products from the cart, quantity management, cart total
- Search, category filter, sorting
- Favorites panel
- Discount display
- Navigation, sign-in window and contact form (demo only)
- Local storage persistence
- Responsive design

## Run
```bash
npm install
npm run dev
```

## Links
- GitHub: https://github.com/hcnsara24/sara-elegance
- Live demo: https://hcnsara24.github.io/sara-elegance/
