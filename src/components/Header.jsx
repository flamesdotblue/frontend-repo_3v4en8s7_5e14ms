import { ShoppingCart, Search, ArrowLeft } from "lucide-react";
import { useMemo } from "react";

export default function Header({
  query,
  setQuery,
  cartCount,
  onOpenCart,
  canGoBack,
  onBack,
}) {
  const count = useMemo(() => cartCount ?? 0, [cartCount]);

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {canGoBack && (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="mr-2 inline-flex items-center justify-center rounded-md border border-slate-200 px-2.5 py-2 text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <a href="#" className="font-semibold text-slate-900 tracking-tight text-lg">
            VibeCommerce
          </a>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2.5 rounded-md border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2.5 rounded-md border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>
    </header>
  );
}
