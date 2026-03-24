import { Link } from "react-router-dom";
import {
  catalog,
  formatCurrency,
  getCollectionBySlug,
  getCollectionPath,
  getInventoryLabel,
} from "@/storefront";
import { StorefrontShell } from "./StorefrontShell";

export default function Shop() {
  const featuredCollections = catalog.featuredCollectionSlugs
    .map((slug) => getCollectionBySlug(slug))
    .filter((collection) => Boolean(collection));
  const featuredProducts = catalog.products.slice(0, 3);

  return (
    <StorefrontShell
      title="Shop"
      intro="The storefront catalog is now seeded with ceramic collections and products. This page keeps the current MADE shell intact while introducing live collection and product entry points."
    >
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <div className="border-b border-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Featured collections</p>
          </div>
          <div className="space-y-0">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.slug}
                to={getCollectionPath(collection.slug)}
                className="flex items-center justify-between border-b border-border py-4 transition-colors hover:text-muted-foreground"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{collection.name}</span>
                  <span className="text-sm text-muted-foreground">{collection.shortDescription}</span>
                </div>
                <span className="text-xs uppercase tracking-widest text-foreground">Open</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="border-b border-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Featured ceramics</p>
          </div>
          <div className="space-y-0">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b border-border py-4"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {getCollectionBySlug(product.collectionSlug)?.name} / {getInventoryLabel(product)}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-foreground">{formatCurrency(product.priceCents)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </StorefrontShell>
  );
}
