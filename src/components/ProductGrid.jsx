function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export default function ProductGrid({ products, query, onAdd }) {
  const filtered = (products || []).filter((p) => {
    const q = (query || "").toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">Featured products</h2>
        <p className="text-sm text-slate-500">{filtered.length} results</p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 p-12 text-center">
          <p className="text-slate-600">No products match your search. Try another term.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <li key={p.id} className="group rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {p.badge && (
                  <span className="absolute left-2 top-2 rounded-full bg-black/80 text-white text-xs px-2 py-1">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">{p.description}</p>
                  </div>
                  <span className="font-semibold text-slate-900 ml-auto whitespace-nowrap">{formatPrice(p.price)}</span>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => onAdd(p)}
                    className="w-full inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
