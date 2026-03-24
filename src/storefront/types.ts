export type Collection = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  featuredProductSlugs: string[];
};

export type ProductImageKind = "primary" | "detail" | "alternate" | "thumbnail";

export type ProductImage = {
  id: string;
  alt: string;
  kind: ProductImageKind;
  aspectRatio: string;
  sourceKey: StockPhotoSourceKey;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  collectionSlug: string;
  priceCents: number;
  stock: number;
  available: boolean;
  featured: boolean;
  published: boolean;
  materials: string;
  dimensions: string;
  care: string;
  shippingNote: string;
  leadTime: string;
  glaze: string;
  story: string;
  images: ProductImage[];
};

export type StockPhotoSource = {
  sourceName: "Pexels" | "Unsplash" | "Adobe Stock";
  sourcePageUrl: string;
  license: string;
};

export type StockPhotoSourceKey =
  | "pexelsMinimalCeramicObjects"
  | "pexelsCeramicShelves"
  | "pexelsPotteryWorkshop"
  | "unsplashCeramicBowls"
  | "unsplashMonochromeVase"
  | "unsplashPotteryWheel"
  | "adobeMinimalCeramicVase"
  | "adobeWhiteCeramicBowl";

export type Catalog = {
  collections: Collection[];
  products: Product[];
  featuredCollectionSlugs: string[];
  featuredProductSlugs: string[];
};
