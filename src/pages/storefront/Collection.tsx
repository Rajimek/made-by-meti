import { Link, useParams } from "react-router-dom";
import {
  formatCurrency,
  getCollectionBySlug,
  getInventoryLabel,
  getProductsForCollection,
} from "@/storefront";
import { StorefrontShell } from "./StorefrontShell";

export default function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? getCollectionBySlug(slug) : undefined;
  const products = collection ? getProductsForCollection(collection.slug) : [];

  return (
    <StorefrontShell
      title={collection?.name ?? "Collection not found"}
      intro={
        collection?.longDescription ??
        "This collection could not be found in the current storefront catalog seed."
      }
      backHref="/collections"
      backLabel="Back to collections"
    >
      {collection ? (
        <div className="space-y-0">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b border-border py-4"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{product.name}</span>
                <span className="text-sm text-muted-foreground">{getInventoryLabel(product)}</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-foreground">{formatCurrency(product.priceCents)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-border px-6 py-8 text-sm text-muted-foreground">
          Choose one of the live storefront collections from the collections index to continue.
        </div>
      )}
    </StorefrontShell>
  );
}
