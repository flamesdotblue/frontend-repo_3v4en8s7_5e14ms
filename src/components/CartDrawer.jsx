import { X, Plus, Minus, Trash } from "lucide-react";

function formatPrice(cents) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(cents / 100);
}

export default function CartDrawer({
  open,
  onClose,
  items,
  increment,
  decrement,
  remove,
  onCheckout,
}) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.07);
  const shipping = subtotal > 0 ? 1200 : 0;
  const total = subtotal + tax + shipping;

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
          <h3 className="text-base font-semibold text-slate-900">Your Cart</h3>
          <button onClick={onClose} aria-label="Close cart" className="rounded-md p-2 hover:bg-slate-50">
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <div className="flex h-[calc(100%-8rem)] flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {items.length === 0 ? (
              <div className="mt-10 text-center text-slate-600">Your cart is empty.</div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <img src={item.image} alt={item.title} className="h-16 w-16 rounded-md object-cover border border-slate-200" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          className="rounded-md p-1.5 text-slate-500 hover:bg-slate-50"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2">
                        <button
                          onClick={() => decrement(item.id)}
                          className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => increment(item.id)}
                          className="rounded-md border border-slate-200 p-1.5 hover:bg-slate-50"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-slate-200 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Tax</span>
              <span className="font-medium text-slate-900">{formatPrice(tax)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Shipping</span>
              <span className="font-medium text-slate-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-slate-900 pt-1">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
