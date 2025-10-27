import { useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

function formatPrice(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export default function Checkout({ items, onBackToShop, onOrderPlaced }) {
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const tax = Math.round(subtotal * 0.07);
  const shipping = subtotal > 0 ? 1200 : 0;
  const total = subtotal + tax + shipping;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const canSubmit =
    items.length > 0 &&
    form.name &&
    /.+@.+\..+/.test(form.email) &&
    form.address &&
    form.city &&
    form.state &&
    form.zip &&
    form.card &&
    form.expiry &&
    form.cvc;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // Simulate processing
    await new Promise((r) => setTimeout(r, 1200));
    const oid = "VC-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(oid);
    setSubmitting(false);
    setSuccess(true);
    onOrderPlaced?.();
  };

  if (success) {
    return (
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Thank you for your order!</h2>
        <p className="mt-2 text-slate-600">Your order has been placed successfully. A confirmation email has been sent.</p>
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Order number</span>
            <span className="font-medium text-slate-900">{orderId}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate-500">Total</span>
            <span className="font-medium text-slate-900">{formatPrice(total)}</span>
          </div>
        </div>
        <button
          onClick={onBackToShop}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Continue shopping
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-medium text-slate-900 mb-4">Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">Full name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-medium text-slate-900 mb-4">Shipping</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm text-slate-600 mb-1">Address</label>
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">City</label>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="San Francisco"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">State</label>
                <input
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="CA"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">ZIP</label>
                <input
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="94103"
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-medium text-slate-900 mb-4">Payment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-sm text-slate-600 mb-1">Card number</label>
                <input
                  inputMode="numeric"
                  maxLength={19}
                  value={form.card}
                  onChange={(e) => setForm({ ...form, card: e.target.value.replace(/[^0-9\s]/g, "") })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Expiry</label>
                <input
                  inputMode="numeric"
                  maxLength={5}
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value.replace(/[^0-9/]/g, "") })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">CVC</label>
                <input
                  inputMode="numeric"
                  maxLength={4}
                  value={form.cvc}
                  onChange={(e) => setForm({ ...form, cvc: e.target.value.replace(/[^0-9]/g, "") })}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onBackToShop}
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>Place order ({formatPrice(total)})</>
              )}
            </button>
          </div>
        </form>

        <aside className="lg:col-span-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="font-medium text-slate-900 mb-4">Order summary</h3>
            {items.length === 0 ? (
              <p className="text-sm text-slate-600">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3">
                    <img src={i.image} alt={i.title} className="h-12 w-12 rounded object-cover border border-slate-200" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{i.title}</p>
                      <p className="text-xs text-slate-500">Qty {i.qty}</p>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 border-t border-slate-200 pt-3 space-y-1 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium text-slate-900">{formatPrice(tax)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-slate-900 pt-1">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
