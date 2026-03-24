import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getAccountOrders, type StoreOrder } from "@/storefront";
import { StorefrontShell } from "./StorefrontShell";

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function OrderRow({ order }: { order: StoreOrder }) {
  return (
    <Link
      to={`/account/orders/${order.id}`}
      className="flex items-center justify-between border-b border-border py-4"
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{order.number}</span>
        <span className="text-sm text-muted-foreground">
          {formatDate(order.createdAt)} / {order.items.length} item{order.items.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="text-right">
        <p className="text-sm text-foreground">{formatMoney(order.totalCents)}</p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{order.fulfillmentStatus.replace(/_/g, " ")}</p>
      </div>
    </Link>
  );
}

export default function AccountOrders() {
  const { user, session, loading } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["account-orders", session?.token],
    queryFn: async () => {
      if (!session?.token) {
        return { orders: [] as StoreOrder[] };
      }

      return getAccountOrders(session.token);
    },
    enabled: Boolean(session?.token),
  });

  if (loading) {
    return (
      <StorefrontShell title="Order History" intro="Loading account orders..." backHref="/account" backLabel="Back to account">
        <div className="border border-border p-6 text-sm text-muted-foreground">Checking the local session.</div>
      </StorefrontShell>
    );
  }

  if (!user) {
    return (
      <StorefrontShell
        title="Order History"
        intro="Sign in to see your previous orders and shipment status."
        backHref="/account"
        backLabel="Back to account"
      >
        <div className="space-y-0">
          <div className="border-b border-border py-4">
            <p className="text-sm text-foreground/80">Order history is available after you sign in.</p>
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

  const orders = data?.orders || [];

  return (
    <StorefrontShell
      title="Order History"
      intro="Your local backend order history is now connected to the account page and order detail route."
      backHref="/account"
      backLabel="Back to account"
    >
      {isLoading ? (
        <div className="border border-border p-6 text-sm text-muted-foreground">Loading orders...</div>
      ) : error ? (
        <div className="border border-border p-6 text-sm text-destructive">
          {error instanceof Error ? error.message : "Unable to load orders."}
        </div>
      ) : orders.length === 0 ? (
        <div className="border border-border p-6 text-sm text-muted-foreground">
          No orders found for this account yet.
        </div>
      ) : (
        <div className="space-y-0">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </StorefrontShell>
  );
}
