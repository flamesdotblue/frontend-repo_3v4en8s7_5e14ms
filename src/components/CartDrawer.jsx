import { X, Plus, Minus, Trash2 } from "lucide-react";

function formatPrice(cents) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(cents / 100);
}

function CartDrawer({ isOpen, onClose, items, onInc, onDec, onRemove }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const tax = Math.round(subtotal * 0.07);
  const shipping = subtotal > 0 ? 799 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div
      className={`fixed inset-0 z-30 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Shopping cart"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100%-220px)] overflow-y-auto p-4 space-y-4">
          {items.length === 0 && (
            <p className="text-gray-500 text-center mt-8">Your cart is empty.</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img src={item.image} alt={item.title} className="h-20 w-20 rounded object-cover border" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1" title={item.title}>{item.title}</h3>
                    <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 rounded hover:bg-gray-100 text-gray-500"
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 border rounded-md">
                    <button
                      onClick={() => onDec(item.id)}
                      className="p-2 hover:bg-gray-100"
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2ch] text-center">{item.qty}</span>
                    <button
                      onClick={() => onInc(item.id)}
                      className="p-2 hover:bg-gray-100"
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-base pt-2 border-t">
            <span className="font-semibold">Total</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </div>
          <button
            className="mt-2 w-full rounded-md bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50"
            disabled={items.length === 0}
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;
