import { Link } from "react-router-dom";
import {
  clearCart,
  decrementCartItem,
  getCartLines,
  getCartTotals,
  incrementCartItem,
  removeFromCart,
  useCartItems,
} from "@/storefront/cart";
import { formatCurrency, getCollectionBySlug, getInventoryLabel } from "@/storefront";
import { StorefrontShell } from "./StorefrontShell";

export default function Cart() {
  const items = useCartItems();
  const lines = getCartLines(items);
  const totals = getCartTotals(items);

  return (
    <StorefrontShell
      title="Cart"
      intro="Cart quantities and totals are now persisted locally and kept in sync across storefront pages."
      backHref="/shop"
      backLabel="Continue shopping"
    >
      {lines.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-0">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {totals.itemCount} item{totals.itemCount === 1 ? "" : "s"}
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs uppercase tracking-widest text-foreground transition-colors hover:text-muted-foreground"
              >
                Clear cart
              </button>
            </div>

            <div className="space-y-0">
              {lines.map((line) => {
                const collection = getCollectionBySlug(line.product.collectionSlug);

                return (
                  <div
                    key={line.product.id}
                    className="grid gap-4 border-b border-border py-4 md:grid-cols-[1fr_auto_auto]"
                  >
                    <div className="flex flex-col gap-1">
                      <Link
                        to={`/products/${line.product.slug}`}
                        className="text-sm font-semibold uppercase tracking-widest text-foreground"
                      >
                        {line.product.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        {collection?.name} / {getInventoryLabel(line.product)}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        {formatCurrency(line.product.priceCents)} each
                      </span>
                    </div>

                    <div className="flex items-center justify-start gap-2 md:justify-center">
                      <button
                        type="button"
                        onClick={() => decrementCartItem(line.product.id)}
                        className="h-9 w-9 border border-border text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
                        aria-label={`Decrease quantity for ${line.product.name}`}
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center text-sm text-foreground">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => incrementCartItem(line.product.id)}
                        disabled={line.quantity >= line.product.stock}
                        className="h-9 w-9 border border-border text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label={`Increase quantity for ${line.product.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-end justify-between gap-4 md:flex-col md:items-end md:justify-center">
                      <span className="text-sm text-foreground">{formatCurrency(line.lineTotalCents)}</span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.product.id)}
                        className="text-xs uppercase tracking-widest text-foreground transition-colors hover:text-muted-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Summary</p>
            </div>

            <div className="space-y-0">
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

            <div className="mt-6 space-y-4">
              <p className="text-sm text-foreground/80">
                Shipping is free over {formatCurrency(18000)}. Taxes are collected by the backend checkout flow.
              </p>
              <Link
                to="/checkout"
                className="inline-flex w-full items-center justify-center border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Proceed to checkout
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <div className="border border-border p-6">
          <p className="text-sm text-foreground/80">Your cart is empty.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Browse ceramics
            </Link>
          </div>
        </div>
      )}
    </StorefrontShell>
  );
}
