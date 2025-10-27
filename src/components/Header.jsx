import { ShoppingCart, Search } from "lucide-react";

function Header({ cartCount, query, onQueryChange, onOpenCart }) {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <a href="#" className="font-extrabold text-xl tracking-tight">
          <span className="text-blue-600">Vibe</span>
          <span className="text-gray-900">Shop</span>
        </a>
        <div className="relative flex-1 max-w-xl ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Search products"
          />
        </div>
        <button
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Open cart"
       >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold h-5 min-w-[20px] px-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
