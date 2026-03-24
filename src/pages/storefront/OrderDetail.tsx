import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getOrderDetail, type StoreOrder } from "@/storefront";
import { StorefrontShell } from "./StorefrontShell";

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-right text-sm text-foreground">{value}</span>
    </div>
  );
}

function OrderSection({ order }: { order: StoreOrder }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
        <div className="space-y-0">
          <div className="border-b border-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order</p>
          </div>
          <StatusLine label="Order number" value={order.number} />
          <StatusLine label="Placed" value={formatDate(order.createdAt)} />
          <StatusLine label="Payment" value={order.paymentStatus.replace(/_/g, " ")} />
          <StatusLine label="Fulfillment" value={order.fulfillmentStatus.replace(/_/g, " ")} />
          <StatusLine label="Tracking" value={order.trackingNumber || "Pending"} />
          <StatusLine label="Carrier" value={order.carrier || "Pending"} />
        </div>

        <div className="space-y-0">
          <div className="border-b border-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shipping address</p>
          </div>
          <div className="space-y-1 py-4 text-sm text-foreground">
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 ? <p>{order.shippingAddress.line2}</p> : null}
            <p>
              {order.shippingAddress.city}
              {order.shippingAddress.city && order.shippingAddress.state ? ", " : ""}
              {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="pt-2 text-muted-foreground">{order.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-0">
        <div className="border-b border-border pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Items</p>
        </div>
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between border-b border-border py-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{item.name}</span>
              <span className="text-sm text-muted-foreground">Quantity {item.quantity}</span>
            </div>
            <span className="text-sm text-foreground">{formatMoney(item.priceCents * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Subtotal</p>
          <p className="mt-2 text-sm text-foreground">{formatMoney(order.subtotalCents)}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Shipping</p>
          <p className="mt-2 text-sm text-foreground">{formatMoney(order.shippingCents)}</p>
        </div>
        <div className="border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Total</p>
          <p className="mt-2 text-sm text-foreground">{formatMoney(order.totalCents)}</p>
        </div>
      </div>

      {order.notes ? (
        <div className="border border-border p-6 text-sm text-foreground/80">
          {order.notes}
        </div>
      ) : null}
    </div>
  );
}

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, session, loading } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order-detail", session?.token, id],
    queryFn: async () => {
      if (!session?.token || !id) {
        return { order: null };
      }

      return getOrderDetail(session.token, id);
    },
    enabled: Boolean(session?.token && id),
  });

  if (loading) {
    return (
      <StorefrontShell title={id ? `Order ${id}` : "Order Detail"} intro="Loading order..." backHref="/account/orders" backLabel="Back to orders">
        <div className="border border-border p-6 text-sm text-muted-foreground">Checking the local session.</div>
      </StorefrontShell>
    );
  }

  if (!user) {
    return (
      <StorefrontShell
        title={id ? `Order ${id}` : "Order Detail"}
        intro="Sign in to view the full order record."
        backHref="/account/orders"
        backLabel="Back to orders"
      >
        <div className="space-y-0">
          <div className="border-b border-border py-4">
            <p className="text-sm text-foreground/80">Order details are available after you sign in.</p>
          </div>
          <div className="pt-6">
            <Button asChild className="text-xs uppercase tracking-widest">
              <Link to="/login">Go to login</Link>
            </Button>
          </div>
        </div>
      </StorefrontShell>
    );
  }

  const order = data?.order || null;

  return (
    <StorefrontShell
      title={order ? `Order ${order.number}` : id ? `Order ${id}` : "Order Detail"}
      intro="The order detail page now reads the live local backend record, including shipment and fulfillment information."
      backHref="/account/orders"
      backLabel="Back to orders"
    >
      {isLoading ? (
        <div className="border border-border p-6 text-sm text-muted-foreground">Loading order...</div>
      ) : error ? (
        <div className="border border-border p-6 text-sm text-destructive">
          {error instanceof Error ? error.message : "Unable to load order."}
        </div>
      ) : order ? (
        <OrderSection order={order} />
      ) : (
        <div className="border border-border p-6 text-sm text-muted-foreground">
          No matching order was found for this account.
        </div>
      )}
    </StorefrontShell>
  );
}
