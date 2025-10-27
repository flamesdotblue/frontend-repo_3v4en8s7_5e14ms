import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

function formatPrice(cents) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(cents / 100);
}

const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    title: "Minimal Chair",
    description: "Ergonomic lounge chair with breathable mesh and lumbar support.",
    price: 18900,
    category: "Furniture",
    badge: "New",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Studio Headphones",
    description: "Closed-back headphones with rich, detailed sound and soft cushions.",
    price: 12900,
    category: "Audio",
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1646500366920-b4c5ce29237d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTdHVkaW8lMjBIZWFkcGhvbmVzfGVufDB8MHx8fDE3NjE1NTk4Mjl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: "p3",
    title: "Smart Lamp",
    description: "Dimmable LED lamp with touch controls and ambient modes.",
    price: 7900,
    category: "Lighting",
    image: "https://images.unsplash.com/photo-1706894854720-f5b6338443f8?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTbWFydCUyMExhbXB8ZW58MHwwfHx8MTc2MTU1OTgzMHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: "p4",
    title: "Ceramic Mug",
    description: "Handmade 12oz mug — microwave and dishwasher safe.",
    price: 2400,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    title: "Leather Journal",
    description: "A5 dotted journal with 160gsm paper and durable binding.",
    price: 3500,
    category: "Stationery",
    badge: "Limited",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p6",
    title: "Travel Backpack",
    description: "Carry-on backpack with 3 compartments and padded laptop sleeve.",
    price: 9800,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p7",
    title: "Aroma Diffuser",
    description: "Ultrasonic diffuser with 4 timer settings and auto shutoff.",
    price: 4200,
    category: "Home",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p8",
    title: "Desk Mat",
    description: "Vegan leather desk mat with anti-slip backing.",
    price: 2900,
    category: "Office",
    image: "https://images.unsplash.com/photo-1508796079212-a4b83cbf734d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p9",
    title: "Wireless Charger",
    description: "15W fast wireless charging pad with USB-C.",
    price: 3800,
    category: "Tech",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p10",
    title: "Throw Blanket",
    description: "Soft cotton knit throw for cozy evenings.",
    price: 4500,
    category: "Home",
    image: "https://images.unsplash.com/photo-1639109743189-91a3ec8b0437?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUaHJvdyUyMEJsYW5rZXR8ZW58MHwwfHx8MTc2MTU1OTgzMXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: "p11",
    title: "Scented Candle",
    description: "Soy candle with notes of cedarwood and citrus.",
    price: 2200,
    category: "Home",
    image: "https://images.unsplash.com/photo-1643122966676-29e8597257f7?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTY2VudGVkJTIwQ2FuZGxlfGVufDB8MHx8fDE3NjE1NTk4MzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: "p12",
    title: "Glass Water Bottle",
    description: "Borosilicate glass with silicone sleeve and bamboo cap.",
    price: 2600,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1660303438028-b59af33c618c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxHbGFzcyUyMFdhdGVyJTIwQm90dGxlfGVufDB8MHx8fDE3NjE1NTk4MzJ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
  },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useLocalStorage("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useLocalStorage("view", "browse"); // browse | checkout

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increment = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decrement = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );
  const remove = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView("checkout");
  };

  const handleOrderPlaced = () => {
    clearCart();
  };

  const handleBackToShop = () => {
    setView("browse");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        query={query}
        setQuery={setQuery}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        canGoBack={view !== "browse"}
        onBack={handleBackToShop}
      />

      {view === "browse" && (
        <>
          <section className="relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 md:p-12">
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">Discover things you’ll love</h1>
                  <p className="mt-3 text-slate-600">Curated essentials for your workspace and home — crafted with care, designed for everyday joy.</p>
                  <div className="mt-6 inline-flex items-center gap-3">
                    <a href="#products" className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
                      Shop now
                    </a>
                    <a href="#" className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="products">
            <ProductGrid products={SAMPLE_PRODUCTS} query={query} onAdd={addToCart} />
          </div>
        </>
      )}

      {view === "checkout" && (
        <Checkout items={cart} onBackToShop={handleBackToShop} onOrderPlaced={handleOrderPlaced} />
      )}

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        increment={increment}
        decrement={decrement}
        remove={remove}
        onCheckout={handleCheckout}
      />

      <footer className="border-t border-slate-200 py-8 mt-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} VibeCommerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
