import { Plus } from "lucide-react";

function formatPrice(cents) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(cents / 100);
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2" title={product.title}>
            {product.title}
          </h3>
          {product.badge && (
            <span className="shrink-0 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 border border-blue-200">
              {product.badge}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2" title={product.description}>
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-3 py-2 text-sm font-medium hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            aria-label={`Add ${product.title} to cart`}
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
