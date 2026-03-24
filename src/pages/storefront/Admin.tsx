import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  catalog,
  createAdminProduct,
  fetchAdminBootstrap,
  type AdminBootstrapResponse,
  type AdminProduct,
  type StoreOrder,
  updateAdminOrder,
  updateAdminProduct,
} from "@/storefront";
import { formatCurrency } from "@/storefront/utils";
import { StorefrontShell } from "./StorefrontShell";

type ProductDraft = {
  name: string;
  collectionSlug: string;
  priceCents: string;
  stock: string;
  materials: string;
  dimensions: string;
  care: string;
  shippingNote: string;
  leadTime: string;
  glaze: string;
  story: string;
  imageLabels: string;
};

type ProductEditState = {
  stock: string;
  published: boolean;
};

type OrderEditState = {
  fulfillmentStatus: string;
  carrier: string;
  trackingNumber: string;
};

const initialProductDraft: ProductDraft = {
  name: "",
  collectionSlug: catalog.collections[0]?.slug || "ritual-vessels",
  priceCents: "",
  stock: "0",
  materials: "",
  dimensions: "",
  care: "",
  shippingNote: "",
  leadTime: "",
  glaze: "",
  story: "",
  imageLabels: "",
};

function buildProductEditMap(products: AdminProduct[]) {
  return Object.fromEntries(
    products.map((product) => [
      product.id,
      {
        stock: String(product.stock),
        published: product.published,
      },
    ]),
  ) as Record<string, ProductEditState>;
}

function buildOrderEditMap(orders: StoreOrder[]) {
  return Object.fromEntries(
    orders.map((order) => [
      order.id,
      {
        fulfillmentStatus: order.fulfillmentStatus,
        carrier: order.carrier || "",
        trackingNumber: order.trackingNumber || "",
      },
    ]),
  ) as Record<string, OrderEditState>;
}

function parseImageLabels(value: string) {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export default function Admin() {
  const { user, session, loading } = useAuth();
  const queryClient = useQueryClient();
  const [productDraft, setProductDraft] = useState<ProductDraft>(initialProductDraft);
  const [productEdits, setProductEdits] = useState<Record<string, ProductEditState>>({});
  const [orderEdits, setOrderEdits] = useState<Record<string, OrderEditState>>({});
  const [feedback, setFeedback] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-bootstrap", session?.token],
    queryFn: async () => {
      if (!session) {
        throw new Error("Sign in as an admin to continue.");
      }

      return fetchAdminBootstrap(session.token);
    },
    enabled: Boolean(session && user?.role === "admin"),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setProductEdits((current) => (Object.keys(current).length ? current : buildProductEditMap(data.products)));
    setOrderEdits((current) => (Object.keys(current).length ? current : buildOrderEditMap(data.orders)));
  }, [data]);

  useEffect(() => {
    setProductDraft((current) => ({
      ...current,
      collectionSlug: catalog.collections.some((collection) => collection.slug === current.collectionSlug)
        ? current.collectionSlug
        : catalog.collections[0]?.slug || current.collectionSlug,
    }));
  }, []);

  const invalidateAdminData = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-bootstrap"] });
  };

  const createProductMutation = useMutation({
    mutationFn: async () => {
      if (!session) {
        throw new Error("Sign in as an admin to continue.");
      }

      return createAdminProduct(session.token, {
        name: productDraft.name.trim(),
        collectionSlug: productDraft.collectionSlug,
        priceCents: Number(productDraft.priceCents),
        stock: Number(productDraft.stock),
        materials: productDraft.materials.trim(),
        dimensions: productDraft.dimensions.trim(),
        care: productDraft.care.trim(),
        shippingNote: productDraft.shippingNote.trim(),
        leadTime: productDraft.leadTime.trim(),
        glaze: productDraft.glaze.trim(),
        story: productDraft.story.trim(),
        imageLabels: parseImageLabels(productDraft.imageLabels),
      });
    },
    onSuccess: async () => {
      setFeedback("Product created as a draft.");
      setProductDraft(initialProductDraft);
      await invalidateAdminData();
    },
    onError: (mutationError) => {
      setFeedback(mutationError instanceof Error ? mutationError.message : "Unable to create product.");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ productId, patch }: { productId: string; patch: { stock: number; published: boolean } }) => {
      if (!session) {
        throw new Error("Sign in as an admin to continue.");
      }

      return updateAdminProduct(session.token, productId, patch);
    },
    onSuccess: async () => {
      setFeedback("Product updated.");
      await invalidateAdminData();
    },
    onError: (mutationError) => {
      setFeedback(mutationError instanceof Error ? mutationError.message : "Unable to update product.");
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({
      orderId,
      patch,
    }: {
      orderId: string;
      patch: { fulfillmentStatus: string; carrier: string; trackingNumber: string };
    }) => {
      if (!session) {
        throw new Error("Sign in as an admin to continue.");
      }

      return updateAdminOrder(session.token, orderId, patch);
    },
    onSuccess: async () => {
      setFeedback("Order updated.");
      await invalidateAdminData();
    },
    onError: (mutationError) => {
      setFeedback(mutationError instanceof Error ? mutationError.message : "Unable to update order.");
    },
  });

  const products = data?.products || [];
  const orders = data?.orders || [];

  const publishedCount = useMemo(
    () => products.filter((product) => product.published).length,
    [products],
  );

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");

    if (!productDraft.name.trim() || !productDraft.priceCents.trim()) {
      setFeedback("Name and price are required.");
      return;
    }

    await createProductMutation.mutateAsync();
  };

  const updateProductField = (productId: string, field: keyof ProductEditState, value: string | boolean) => {
    setProductEdits((current) => ({
      ...current,
      [productId]: {
        stock: current[productId]?.stock || "0",
        published: current[productId]?.published || false,
        [field]: value,
      },
    }));
  };

  const updateOrderField = (orderId: string, field: keyof OrderEditState, value: string) => {
    setOrderEdits((current) => ({
      ...current,
      [orderId]: {
        fulfillmentStatus: current[orderId]?.fulfillmentStatus || "preparing",
        carrier: current[orderId]?.carrier || "",
        trackingNumber: current[orderId]?.trackingNumber || "",
        [field]: value,
      },
    }));
  };

  const saveProduct = async (product: AdminProduct) => {
    setFeedback("");
    const nextState = productEdits[product.id] || {
      stock: String(product.stock),
      published: product.published,
    };

    await updateProductMutation.mutateAsync({
      productId: product.id,
      patch: {
        stock: Number(nextState.stock),
        published: nextState.published,
      },
    });
  };

  const saveOrder = async (order: StoreOrder) => {
    setFeedback("");
    const nextState = orderEdits[order.id] || {
      fulfillmentStatus: order.fulfillmentStatus,
      carrier: order.carrier || "",
      trackingNumber: order.trackingNumber || "",
    };

    await updateOrderMutation.mutateAsync({
      orderId: order.id,
      patch: nextState,
    });
  };

  if (loading) {
    return (
      <StorefrontShell title="Admin Account" intro="Loading admin access..." backHref="/shop" backLabel="Back to shop">
        <div className="border border-border p-6 text-sm text-muted-foreground">Checking account role.</div>
      </StorefrontShell>
    );
  }

  if (!user) {
    return (
      <StorefrontShell
        title="Admin Account"
        intro="Sign in with the configured admin email to access catalog and order operations."
        backHref="/shop"
        backLabel="Back to shop"
      >
        <div className="space-y-0">
          <div className="border-b border-border py-4">
            <p className="text-sm text-foreground/80">Admin access is protected behind the normal account login flow.</p>
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

  if (user.role !== "admin") {
    return (
      <StorefrontShell
        title="Admin Account"
        intro="This account does not have admin privileges."
        backHref="/account"
        backLabel="Back to account"
      >
        <div className="border border-border p-6 text-sm text-foreground/80">
          Sign in with the configured admin email if you need product and order operations.
        </div>
      </StorefrontShell>
    );
  }

  return (
    <StorefrontShell
      title="Admin Account"
      intro="The local admin surface now supports draft product creation, publish state changes, stock updates, and fulfillment tracking updates without changing the existing site styling."
      backHref="/account"
      backLabel="Back to account"
    >
      {isLoading ? (
        <div className="border border-border p-6 text-sm text-muted-foreground">Loading admin data...</div>
      ) : error ? (
        <div className="border border-border p-6 text-sm text-destructive">
          {error instanceof Error ? error.message : "Unable to load admin data."}
        </div>
      ) : (
        <div className="space-y-12">
          {feedback ? <div className="border border-border p-4 text-sm text-foreground/80">{feedback}</div> : null}

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="space-y-0">
              <div className="border-b border-border pb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Overview</p>
              </div>
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Products</span>
                <span className="text-sm text-muted-foreground">{products.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Orders</span>
                <span className="text-sm text-muted-foreground">{orders.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Published products</span>
                <span className="text-sm text-muted-foreground">{publishedCount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border py-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-foreground">Source of truth</span>
                <span className="text-sm text-muted-foreground">Local Node service</span>
              </div>
            </section>

            <section className="space-y-0">
              <div className="border-b border-border pb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Create product draft</p>
              </div>
              <form onSubmit={handleCreateProduct} className="grid gap-4 pt-6 md:grid-cols-2">
                <Input
                  value={productDraft.name}
                  onChange={(event) => setProductDraft((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Product name"
                  className="md:col-span-2"
                />
                <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Collection
                  <select
                    value={productDraft.collectionSlug}
                    onChange={(event) => setProductDraft((current) => ({ ...current, collectionSlug: event.target.value }))}
                    className="h-10 border border-input bg-background px-3 py-2 text-sm text-foreground"
                  >
                    {catalog.collections.map((collection) => (
                      <option key={collection.slug} value={collection.slug}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Input
                  type="number"
                  min="0"
                  value={productDraft.priceCents}
                  onChange={(event) => setProductDraft((current) => ({ ...current, priceCents: event.target.value }))}
                  placeholder="Price cents"
                />
                <Input
                  type="number"
                  min="0"
                  value={productDraft.stock}
                  onChange={(event) => setProductDraft((current) => ({ ...current, stock: event.target.value }))}
                  placeholder="Stock"
                />
                <Input
                  value={productDraft.materials}
                  onChange={(event) => setProductDraft((current) => ({ ...current, materials: event.target.value }))}
                  placeholder="Materials"
                />
                <Input
                  value={productDraft.dimensions}
                  onChange={(event) => setProductDraft((current) => ({ ...current, dimensions: event.target.value }))}
                  placeholder="Dimensions"
                />
                <Input
                  value={productDraft.care}
                  onChange={(event) => setProductDraft((current) => ({ ...current, care: event.target.value }))}
                  placeholder="Care"
                />
                <Input
                  value={productDraft.glaze}
                  onChange={(event) => setProductDraft((current) => ({ ...current, glaze: event.target.value }))}
                  placeholder="Glaze"
                />
                <Input
                  value={productDraft.shippingNote}
                  onChange={(event) => setProductDraft((current) => ({ ...current, shippingNote: event.target.value }))}
                  placeholder="Shipping note"
                  className="md:col-span-2"
                />
                <Input
                  value={productDraft.leadTime}
                  onChange={(event) => setProductDraft((current) => ({ ...current, leadTime: event.target.value }))}
                  placeholder="Lead time"
                  className="md:col-span-2"
                />
                <Input
                  value={productDraft.imageLabels}
                  onChange={(event) => setProductDraft((current) => ({ ...current, imageLabels: event.target.value }))}
                  placeholder="Image labels, comma separated"
                  className="md:col-span-2"
                />
                <Textarea
                  value={productDraft.story}
                  onChange={(event) => setProductDraft((current) => ({ ...current, story: event.target.value }))}
                  placeholder="Product story"
                  className="min-h-28 md:col-span-2"
                />
                <div className="md:col-span-2">
                  <Button type="submit" disabled={createProductMutation.isPending} className="text-xs uppercase tracking-widest">
                    {createProductMutation.isPending ? "Saving..." : "Create draft"}
                  </Button>
                </div>
              </form>
            </section>
          </div>

          <section className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Catalog operations</p>
            </div>
            <div className="space-y-0">
              {products.map((product) => {
                const currentEdit = productEdits[product.id] || {
                  stock: String(product.stock),
                  published: product.published,
                };

                return (
                  <div key={product.id} className="grid gap-4 border-b border-border py-4 lg:grid-cols-[1.2fr_0.45fr_0.45fr_0.55fr] lg:items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{product.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {product.collectionSlug} / {formatCurrency(product.priceCents)}
                      </span>
                    </div>

                    <Input
                      type="number"
                      min="0"
                      value={currentEdit.stock}
                      onChange={(event) => updateProductField(product.id, "stock", event.target.value)}
                      placeholder="Stock"
                    />

                    <label className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={currentEdit.published}
                        onChange={(event) => updateProductField(product.id, "published", event.target.checked)}
                      />
                      Published
                    </label>

                    <Button
                      type="button"
                      variant="outline"
                      disabled={updateProductMutation.isPending}
                      onClick={() => void saveProduct(product)}
                      className="text-xs uppercase tracking-widest"
                    >
                      Save product
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Fulfillment operations</p>
            </div>
            <div className="space-y-0">
              {orders.map((order) => {
                const currentEdit = orderEdits[order.id] || {
                  fulfillmentStatus: order.fulfillmentStatus,
                  carrier: order.carrier || "",
                  trackingNumber: order.trackingNumber || "",
                };

                return (
                  <div key={order.id} className="grid gap-4 border-b border-border py-4 lg:grid-cols-[0.9fr_0.7fr_0.6fr_0.8fr_0.55fr] lg:items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{order.number}</span>
                      <span className="text-sm text-muted-foreground">{order.email}</span>
                    </div>

                    <label className="flex flex-col gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                      Status
                      <select
                        value={currentEdit.fulfillmentStatus}
                        onChange={(event) => updateOrderField(order.id, "fulfillmentStatus", event.target.value)}
                        className="h-10 border border-input bg-background px-3 py-2 text-sm text-foreground"
                      >
                        <option value="preparing">Preparing</option>
                        <option value="packed">Packed</option>
                        <option value="in_transit">In transit</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </label>

                    <Input
                      value={currentEdit.carrier}
                      onChange={(event) => updateOrderField(order.id, "carrier", event.target.value)}
                      placeholder="Carrier"
                    />

                    <Input
                      value={currentEdit.trackingNumber}
                      onChange={(event) => updateOrderField(order.id, "trackingNumber", event.target.value)}
                      placeholder="Tracking number"
                    />

                    <Button
                      type="button"
                      variant="outline"
                      disabled={updateOrderMutation.isPending}
                      onClick={() => void saveOrder(order)}
                      className="text-xs uppercase tracking-widest"
                    >
                      Save order
                    </Button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </StorefrontShell>
  );
}
