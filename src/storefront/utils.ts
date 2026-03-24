import { catalog, stockPhotoSources } from "@/storefront/data";
import type {
  Collection,
  Product,
  ProductImage,
  StockPhotoSource,
  StockPhotoSourceKey,
} from "@/storefront/types";

export function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isSoldOut(product: Product) {
  return !product.available || product.stock <= 0;
}

export function isLowStock(product: Product) {
  return !isSoldOut(product) && product.stock <= 3;
}

export function getInventoryLabel(product: Product) {
  if (isSoldOut(product)) {
    return "Sold out";
  }

  if (isLowStock(product)) {
    return `Low stock: ${product.stock} left`;
  }

  return "Ready to ship";
}

export function getProductBySlug(slug: string, products = catalog.products) {
  return products.find((product) => product.slug === slug);
}

export function getCollectionBySlug(slug: string, collections = catalog.collections) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsForCollection(collectionSlug: string, products = catalog.products) {
  return products.filter((product) => product.collectionSlug === collectionSlug);
}

export function getAvailableProducts(products = catalog.products) {
  return products.filter((product) => product.published && !isSoldOut(product));
}

export function getFeaturedProducts(products = catalog.products) {
  return products.filter((product) => product.published && product.featured);
}

export function getCollectionFeaturedProducts(collection: Collection, products = catalog.products) {
  return collection.featuredProductSlugs
    .map((slug) => getProductBySlug(slug, products))
    .filter((product): product is Product => Boolean(product));
}

export function getCollectionPrimaryProduct(collection: Collection, products = catalog.products) {
  return getCollectionFeaturedProducts(collection, products)[0];
}

export function getPrimaryProductImage(product: Product) {
  return product.images.find((image) => image.kind === "primary") ?? product.images[0];
}

export function getProductGallery(product: Product) {
  return product.images;
}

export function getCollectionName(collectionSlug: string, collections = catalog.collections) {
  return getCollectionBySlug(collectionSlug, collections)?.name ?? "Collection";
}

export function getProductPath(slug: string) {
  return `/products/${slug}`;
}

export function getCollectionPath(slug: string) {
  return `/collections/${slug}`;
}

export function getStockPhotoSource(sourceKey: StockPhotoSourceKey): StockPhotoSource {
  return stockPhotoSources[sourceKey];
}
