import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { lookupOrder, type StoreOrder } from "@/storefront";
import { useAuth } from "@/hooks/useAuth";
import { StorefrontShell } from "./StorefrontShell";

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function OrderSummary({ order }: { order: StoreOrder }) {
  return (
    <div className="space-y-0">
      <div className="border-b border-border py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Found order</p>
      </div>
      <div className="grid gap-4 py-4 md:grid-cols-2">
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Order</p>
          <p className="mt-2 text-sm text-foreground">{order.number}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Status</p>
          <p className="mt-2 text-sm text-foreground">{order.fulfillmentStatus.replace(/_/g, " ")}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Tracking</p>
          <p className="mt-2 text-sm text-foreground">{order.trackingNumber || "Pending"}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Total</p>
          <p className="mt-2 text-sm text-foreground">{formatMoney(order.totalCents)}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <Button asChild className="text-xs uppercase tracking-widest">
          <Link to={`/account/orders/${order.id}`}>View order detail</Link>
        </Button>
      </div>
    </div>
  );
}

export default function TrackOrder() {
  const { user } = useAuth();
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<StoreOrder | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await lookupOrder({
        orderNumber: orderNumber.trim(),
        email: email.trim(),
      });

      if (!response.order) {
        setError("No order matched that number and email.");
        return;
      }

      setOrder(response.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StorefrontShell
      title="Track Order"
      intro="Track an order with your order number and email address, or sign in to use the account order history instead."
      backHref={user ? "/account/orders" : "/shop"}
      backLabel={user ? "Order history" : "Back to shop"}
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="space-y-0">
          <div className="border-b border-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Guest lookup</p>
          </div>
          <div className="space-y-4 py-6">
            <Input
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="Order number"
              autoComplete="off"
              required
            />
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          {error ? <p className="pb-4 text-sm text-destructive">{error}</p> : null}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={loading} className="text-xs uppercase tracking-widest">
              {loading ? "Looking up..." : "Track order"}
            </Button>
            <Button asChild variant="outline" className="text-xs uppercase tracking-widest">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
            Example from the seeded backend: `MADE-2407`
          </p>
        </form>

        <div className="space-y-0">
          <div className="border-b border-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shipment progress</p>
          </div>
          <div className="py-6">
            {order ? (
              <OrderSummary order={order} />
            ) : (
              <div className="border border-border p-6 text-sm text-muted-foreground">
                Lookup results will appear here once you submit an order number and email pair.
              </div>
            )}
          </div>
        </div>
      </div>
    </StorefrontShell>
  );
}
