import { Link, useParams } from "react-router-dom";
import {
  addToCart,
  getCartQuantity,
  useCartItems,
} from "@/storefront/cart";
import {
  formatCurrency,
  getCollectionBySlug,
  getCollectionPath,
  getInventoryLabel,
  getProductBySlug,
  getProductGallery,
  getPrimaryProductImage,
  getStockPhotoSource,
} from "@/storefront";
import { StorefrontShell } from "./StorefrontShell";

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const cartItems = useCartItems();
  const product = slug ? getProductBySlug(slug) : undefined;
  const gallery = product ? getProductGallery(product) : [];
  const primaryImage = product ? getPrimaryProductImage(product) : undefined;
  const collection = product ? getCollectionBySlug(product.collectionSlug) : undefined;
  const quantityInCart = product ? getCartQuantity(product.id, cartItems) : 0;
  const details = product
    ? [
        { label: "Price", value: formatCurrency(product.priceCents) },
        { label: "Availability", value: getInventoryLabel(product) },
        { label: "Materials", value: product.materials },
        { label: "Dimensions", value: product.dimensions },
        { label: "Glaze", value: product.glaze },
        { label: "Lead time", value: product.leadTime },
      ]
    : [];

  return (
    <StorefrontShell
      title={product?.name ?? "Product not found"}
      intro={
        product?.story ??
        "This product could not be found in the current storefront catalog seed."
      }
      backHref={collection ? getCollectionPath(collection.slug) : "/shop"}
      backLabel={collection ? `Back to ${collection.name}` : "Back to shop"}
    >
      {product ? (
        <div className="space-y-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div className="flex min-h-[280px] items-center justify-center border border-border p-6 text-center">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Primary image reference</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-foreground">
                  {primaryImage?.alt ?? "Image unavailable"}
                </p>
                {primaryImage ? (
                  <a
                    href={getStockPhotoSource(primaryImage.sourceKey).sourcePageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-xs uppercase tracking-widest text-foreground underline"
                  >
                    {getStockPhotoSource(primaryImage.sourceKey).sourceName} source
                  </a>
                ) : null}
              </div>
            </div>

            <div className="space-y-0">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-center justify-between gap-4 border-b border-border py-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-right text-sm text-foreground">{detail.value}</span>
                </div>
              ))}
              <div className="border-b border-border py-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shipping</p>
                <p className="mt-2 text-sm text-foreground">{product.shippingNote}</p>
              </div>
              <div className="border-b border-border py-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Care</p>
                <p className="mt-2 text-sm text-foreground">{product.care}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-6">
                <button
                  type="button"
                  disabled={!product.available || product.stock <= 0}
                  onClick={() => addToCart(product.id, 1)}
                  className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {product.available && product.stock > 0 ? "Add to cart" : "Sold out"}
                </button>
                <Link
                  to={collection ? getCollectionPath(collection.slug) : "/collections"}
                  className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground"
                >
                  View collection
                </Link>
                {quantityInCart > 0 ? (
                  <Link to="/cart" className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground">
                    In cart: {quantityInCart}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-0">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Gallery references</p>
            </div>
            {gallery.map((image) => {
              const source = getStockPhotoSource(image.sourceKey);

              return (
                <div key={image.id} className="flex items-center justify-between gap-4 border-b border-border py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold uppercase tracking-widest text-foreground">{image.kind}</span>
                    <span className="text-sm text-muted-foreground">{image.alt}</span>
                  </div>
                  <a
                    href={source.sourcePageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-widest text-foreground underline"
                  >
                    {source.sourceName}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border border-border px-6 py-8 text-sm text-muted-foreground">
          Choose one of the live storefront products from the shop or collection pages to continue.
        </div>
      )}
    </StorefrontShell>
  );
}
