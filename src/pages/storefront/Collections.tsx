import { Link } from "react-router-dom";
import { collections, getCollectionPath, getProductsForCollection } from "@/storefront";
import { StorefrontShell } from "./StorefrontShell";

export default function Collections() {
  return (
    <StorefrontShell
      title="Collections"
      intro="Collection routes now use the storefront catalog seed so the current shell can navigate real ceramic groupings without introducing a new design system."
    >
      <div className="space-y-0">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            to={getCollectionPath(collection.slug)}
            className="flex items-center justify-between py-4 border-b border-border"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{collection.name}</span>
              <span className="text-sm text-muted-foreground">{collection.shortDescription}</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {getProductsForCollection(collection.slug).length} items
            </span>
          </Link>
        ))}
      </div>
    </StorefrontShell>
  );
}
