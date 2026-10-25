import { useState } from "react";
import { Header, Footer } from "./components/Layout";
import { Hero, Features, Contact } from "./components/Sections";
import { ProductList } from "./components/Shop";
import { Cart, FavoritesPanel, SignInModal, ProductModal } from "./components/Overlays";

function App() {
  // Local state: which side panel is open ("cart", "favorites" or null)
  const [panel, setPanel] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);
  // Local state: the product shown in the detail window
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Header
        onCartClick={() => setPanel("cart")}
        onFavClick={() => setPanel("favorites")}
        onSignInClick={() => setSignInOpen(true)}
      />
      <Hero />
      <Features />
      <ProductList onSelect={setSelected} />
      <Contact />
      <Footer />

      <Cart open={panel === "cart"} onClose={() => setPanel(null)} />
      <FavoritesPanel open={panel === "favorites"} onClose={() => setPanel(null)} />
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />

      {selected && (
        <ProductModal
          key={selected.id}
          product={selected}
          onClose={() => setSelected(null)}
          onAdded={() => {
            setSelected(null);
            setPanel("cart");
          }}
        />
      )}
    </>
  );
}

export default App;
