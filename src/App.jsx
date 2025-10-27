import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    title: "Classic Cotton Tee",
    description: "Soft, breathable cotton t-shirt for everyday comfort.",
    price: 1999,
    category: "Apparel",
    badge: "New",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p2",
    title: "Minimalist Backpack",
    description: "Sleek design with padded laptop sleeve and hidden pockets.",
    price: 6499,
    category: "Bags",
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1760236963218-424a715d1816?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxNaW5pbWFsaXN0JTIwQmFja3BhY2t8ZW58MHwwfHx8MTc2MTUyOTMyMXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: "p3",
    title: "Wireless Earbuds",
    description: "Crystal-clear sound with active noise cancellation.",
    price: 12999,
    category: "Electronics",
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxXaXJlbGVzcyUyMEVhcmJ1ZHN8ZW58MHwwfHx8MTc2MTU1OTUxOHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: "p4",
    title: "Ceramic Mug",
    description: "Matte finish mug that keeps beverages warm longer.",
    price: 1599,
    category: "Home",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p5",
    title: "Running Sneakers",
    description: "Lightweight cushioning for daily runs and casual wear.",
    price: 8999,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p6",
    title: "Leather Wallet",
    description: "Slim profile with RFID protection and 8 card slots.",
    price: 3999,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1620109176813-e91290f6c795?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMZWF0aGVyJTIwV2FsbGV0fGVufDB8MHx8fDE3NjE1NTk1MTl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: "p7",
    title: "Desk Lamp",
    description: "Adjustable brightness and color temperature.",
    price: 4999,
    category: "Home",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p8",
    title: "Stainless Water Bottle",
    description: "Insulated bottle keeps drinks cold for 24 hours.",
    price: 2499,
    category: "Outdoors",
    badge: "Eco",
    image: "https://images.unsplash.com/photo-1611057240064-8be8250d7afa?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdGFpbmxlc3MlMjBXYXRlciUyMEJvdHRsZXxlbnwwfDB8fHwxNzYxNTU5NTE5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: "p9",
    title: "Yoga Mat",
    description: "Non-slip grip and extra cushioning for joint support.",
    price: 3499,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1646239646963-b0b9be56d6b5?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxZb2dhJTIwTWF0fGVufDB8MHx8fDE3NjE1NTk1MjB8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: "p10",
    title: "Scented Candle",
    description: "Calming lavender and cedarwood blend.",
    price: 1899,
    category: "Home",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "p11",
    title: "Bluetooth Speaker",
    description: "Compact design with rich bass and 12-hour battery life.",
    price: 7999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCbHVldG9vdGglMjBTcGVha2VyfGVufDB8MHx8fDE3NjE1NTk1MjF8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80"
  },
  {
    id: "p12",
    title: "Denim Jacket",
    description: "Classic fit with durable stitching and soft lining.",
    price: 9999,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop"
  }
];

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = useMemo(() => SAMPLE_PRODUCTS, []);

  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  }

  function inc(id) {
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  }
  function dec(id) {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
        .filter((p) => p.qty > 0)
    );
  }
  function removeItem(id) {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/40">
      <Header
        cartCount={cartCount}
        query={query}
        onQueryChange={setQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <section className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 shadow-lg overflow-hidden relative">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Discover products you’ll love</h1>
            <p className="mt-2 text-white/90">Curated essentials with clean design and everyday functionality.</p>
            <div className="mt-4 flex items-center gap-3">
              <a href="#products" className="inline-flex items-center rounded-md bg-white text-gray-900 px-4 py-2 font-semibold shadow hover:shadow-md">Shop now</a>
              <a href="#" className="inline-flex items-center rounded-md border border-white/30 px-4 py-2 font-semibold text-white hover:bg-white/10">Learn more</a>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        </section>

        {/* Products */}
        <section id="products" className="mt-10">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured products</h2>
              <p className="text-gray-600">Add items to your cart and preview the totals in the header.</p>
            </div>
          </div>
          <ProductGrid products={products} query={query} onAddToCart={addToCart} />
        </section>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onInc={inc}
        onDec={dec}
        onRemove={removeItem}
      />
    </div>
  );
}

export default App;
