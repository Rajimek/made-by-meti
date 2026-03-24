import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/storefront";
import { createOrder, type StoreOrder } from "@/storefront/api";
import {
  clearCart,
  getCartLines,
  getCartTotals,
  type CheckoutAddress,
  useCartItems,
} from "@/storefront/cart";
import { StorefrontShell } from "./StorefrontShell";

const initialAddress: CheckoutAddress = {
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
};

export default function Checkout() {
  const items = useCartItems();
  const lines = getCartLines(items);
  const totals = getCartTotals(items);
  const [address, setAddress] = useState<CheckoutAddress>(initialAddress);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<StoreOrder | null>(null);

  const handleFieldChange = (field: keyof CheckoutAddress, value: string) => {
    setAddress((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!lines.length) {
      setError("Add items to the cart before checking out.");
      return;
    }

    if (!address.fullName || !address.email || !address.line1 || !address.city || !address.state || !address.postalCode) {
      setError("Please complete the required shipping fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await createOrder(null, {
        email: address.email.trim().toLowerCase(),
        address: {
          ...address,
          email: address.email.trim().toLowerCase(),
        },
        items: lines.map((line) => ({
          productId: line.product.id,
          name: line.product.name,
          quantity: line.quantity,
          priceCents: line.product.priceCents,
        })),
      });

      if (!response.order) {
        throw new Error("Order was not created.");
      }

      setOrder(response.order);
      clearCart();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to place order.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StorefrontShell
      title="Checkout"
      intro="Checkout now posts the local cart to the backend order endpoint and keeps the current shell intact."
      backHref="/cart"
      backLabel="Back to cart"
    >
      {order ? (
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order placed</p>
            </div>
            <div className="border-b border-border py-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-foreground">{order.number}</p>
              <p className="mt-2 text-sm text-foreground/80">
                Payment status: {order.paymentStatus}. Fulfillment status: {order.fulfillmentStatus}.
              </p>
            </div>
            <div className="border-b border-border py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Total</p>
              <p className="mt-2 text-sm text-foreground">{formatCurrency(order.totalCents)}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/track-order"
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Track order
              </Link>
              <Link
                to="/shop"
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Continue shopping
              </Link>
            </div>
          </section>

          <aside className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Items ordered</p>
            </div>
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b border-border py-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{item.name}</span>
                  <span className="text-sm text-muted-foreground">Quantity {item.quantity}</span>
                </div>
                <span className="text-sm text-foreground">{formatCurrency(item.priceCents * item.quantity)}</span>
              </div>
            ))}
          </aside>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shipping details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  value={address.fullName}
                  onChange={(event) => handleFieldChange("fullName", event.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  required
                />
                <Input
                  type="email"
                  value={address.email}
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  value={address.phone}
                  onChange={(event) => handleFieldChange("phone", event.target.value)}
                  placeholder="Phone"
                  autoComplete="tel"
                />
                <Input
                  value={address.country}
                  onChange={(event) => handleFieldChange("country", event.target.value)}
                  placeholder="Country"
                  autoComplete="country-name"
                  required
                />
              </div>

              <Input
                value={address.line1}
                onChange={(event) => handleFieldChange("line1", event.target.value)}
                placeholder="Address line 1"
                autoComplete="address-line1"
                required
              />
              <Input
                value={address.line2}
                onChange={(event) => handleFieldChange("line2", event.target.value)}
                placeholder="Address line 2"
                autoComplete="address-line2"
              />

              <div className="grid gap-4 md:grid-cols-[1.1fr_0.7fr_0.6fr]">
                <Input
                  value={address.city}
                  onChange={(event) => handleFieldChange("city", event.target.value)}
                  placeholder="City"
                  autoComplete="address-level2"
                  required
                />
                <Input
                  value={address.state}
                  onChange={(event) => handleFieldChange("state", event.target.value)}
                  placeholder="State"
                  autoComplete="address-level1"
                  required
                />
                <Input
                  value={address.postalCode}
                  onChange={(event) => handleFieldChange("postalCode", event.target.value)}
                  placeholder="Postal code"
                  autoComplete="postal-code"
                  required
                />
              </div>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting || !lines.length}
                  className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? "Placing order..." : "Place order"}
                </button>
                <Link
                  to="/cart"
                  className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Back to cart
                </Link>
              </div>
            </form>
          </section>

          <aside className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order summary</p>
            </div>

            <div className="space-y-0">
              {lines.map((line) => (
                <div key={line.product.id} className="flex items-center justify-between border-b border-border py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{line.product.name}</span>
                    <span className="text-sm text-muted-foreground">Quantity {line.quantity}</span>
                  </div>
                  <span className="text-sm text-foreground">{formatCurrency(line.lineTotalCents)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-0">
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Subtotal</span>
                <span className="text-sm text-foreground">{formatCurrency(totals.subtotalCents)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shipping</span>
                <span className="text-sm text-foreground">
                  {totals.shippingCents === 0 ? "Free" : formatCurrency(totals.shippingCents)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Total</span>
                <span className="text-sm text-foreground">{formatCurrency(totals.totalCents)}</span>
              </div>
            </div>

            <p className="mt-6 text-sm text-foreground/80">
              This checkout posts directly to the local backend order endpoint at `http://localhost:8787`.
            </p>
          </aside>
        </div>
      )}
    </StorefrontShell>
  );
}
