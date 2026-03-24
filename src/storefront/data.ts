import type {
  Catalog,
  Collection,
  Product,
  ProductImage,
  StockPhotoSource,
  StockPhotoSourceKey,
} from "@/storefront/types";

export const stockPhotoSources: Record<StockPhotoSourceKey, StockPhotoSource> = {
  pexelsMinimalCeramicObjects: {
    sourceName: "Pexels",
    sourcePageUrl: "https://www.pexels.com/photo/minimalist-still-life-with-ceramic-objects-34589778/",
    license: "Pexels License",
  },
  pexelsCeramicShelves: {
    sourceName: "Pexels",
    sourcePageUrl: "https://www.pexels.com/photo/minimalist-still-life-with-ceramic-vases-on-shelves-35082703/",
    license: "Pexels License",
  },
  pexelsPotteryWorkshop: {
    sourceName: "Pexels",
    sourcePageUrl: "https://www.pexels.com/photo/hands-crafting-clay-pottery-workshop-35718829/",
    license: "Pexels License",
  },
  unsplashCeramicBowls: {
    sourceName: "Unsplash",
    sourcePageUrl: "https://unsplash.com/photos/white-and-brown-ceramic-bowls-NPPIq1XFdck",
    license: "Unsplash License",
  },
  unsplashMonochromeVase: {
    sourceName: "Unsplash",
    sourcePageUrl: "https://unsplash.com/photos/black-and-white-ceramic-vase-hO3IAacuDQw",
    license: "Unsplash License",
  },
  unsplashPotteryWheel: {
    sourceName: "Unsplash",
    sourcePageUrl: "https://unsplash.com/photos/hands-shaping-clay-on-a-pottery-wheel-_fxvuMucGDs",
    license: "Unsplash License",
  },
  adobeMinimalCeramicVase: {
    sourceName: "Adobe Stock",
    sourcePageUrl: "https://stock.adobe.com/am/images/minimal-circular-ceramic-vase/510184500",
    license: "Adobe Stock license",
  },
  adobeWhiteCeramicBowl: {
    sourceName: "Adobe Stock",
    sourcePageUrl: "https://stock.adobe.com/images/empty-white-ceramic-bowl-isolated-on-white-background/74879481",
    license: "Adobe Stock license",
  },
};

export const collections: Collection[] = [
  {
    slug: "ritual-vessels",
    name: "Ritual Vessels",
    shortDescription: "Tall forms with quiet shoulders and a sculptural presence.",
    longDescription:
      "This collection gathers display vessels with lifted necks, softened rims, and slow transitions in clay and glaze for shelves, consoles, and corners that need a focal object.",
    featuredProductSlugs: ["river-stone-vase", "hearth-vessel"],
  },
  {
    slug: "ash-glaze",
    name: "Ash Glaze",
    shortDescription: "Muted glaze studies with mineral bloom and soft contrast.",
    longDescription:
      "Ash Glaze pieces lean into clouded greens, charcoal edges, and surfaces that shift with light rather than relying on decorative finish.",
    featuredProductSlugs: ["cinder-bowl", "lichen-cup-set"],
  },
  {
    slug: "table-forms",
    name: "Table Forms",
    shortDescription: "Functional forms with a restrained, gallery-adjacent finish.",
    longDescription:
      "Table Forms is the most daily-use collection, built around serving pieces and utility objects that still carry the same hand-built calm as the display work.",
    featuredProductSlugs: ["ember-serving-platter", "shelf-bowl"],
  },
];

function createImage(
  id: string,
  alt: string,
  kind: ProductImage["kind"],
  aspectRatio: string,
  sourceKey: StockPhotoSourceKey
): ProductImage {
  return {
    id,
    alt,
    kind,
    aspectRatio,
    sourceKey,
  };
}

function createGallery(collectionSlug: string, productSlug: string, images: Array<Omit<ProductImage, "id">>): ProductImage[] {
  return images.map((image, index) =>
    createImage(`${collectionSlug}-${productSlug}-${index + 1}`, image.alt, image.kind, image.aspectRatio, image.sourceKey)
  );
}

export const products: Product[] = [
  {
    id: "p-river-vase",
    slug: "river-stone-vase",
    name: "River Stone Vase",
    collectionSlug: "ritual-vessels",
    priceCents: 16800,
    stock: 4,
    available: true,
    featured: true,
    published: true,
    materials: "Stoneware, satin transparent glaze, kiln-washed foot",
    dimensions: '13.5" h x 6" w',
    care: "Hand wash. Avoid thermal shock.",
    shippingNote: "Ships double-boxed with foam wrap. Signature required.",
    leadTime: "Ready to ship in 3 business days",
    glaze: "Fog over iron-rich clay",
    story:
      "Thrown in two sections and collared upward by hand, this vessel keeps the clay body visible around the shoulder to emphasize the pull marks.",
    images: createGallery("ritual-vessels", "river-stone-vase", [
      {
        alt: "River Stone Vase front profile",
        kind: "primary",
        aspectRatio: "4:5",
        sourceKey: "pexelsMinimalCeramicObjects",
      },
      {
        alt: "River Stone Vase glaze detail",
        kind: "detail",
        aspectRatio: "1:1",
        sourceKey: "unsplashMonochromeVase",
      },
      {
        alt: "River Stone Vase scale view",
        kind: "alternate",
        aspectRatio: "5:6",
        sourceKey: "adobeMinimalCeramicVase",
      },
    ]),
  },
  {
    id: "p-hearth-vessel",
    slug: "hearth-vessel",
    name: "Hearth Vessel",
    collectionSlug: "ritual-vessels",
    priceCents: 21400,
    stock: 2,
    available: true,
    featured: false,
    published: true,
    materials: "Grogged stoneware with layered iron wash",
    dimensions: '16" h x 7.5" w',
    care: "Display piece. Dust with dry cloth.",
    shippingNote: "Ships on a custom insert due to shoulder width.",
    leadTime: "Ready to ship in 5 business days",
    glaze: "Raw umber flash",
    story:
      "A tall display vessel with a broad shoulder and shadowed foot. The iron wash breaks warm at the rim and cools toward the base.",
    images: createGallery("ritual-vessels", "hearth-vessel", [
      {
        alt: "Hearth Vessel front profile",
        kind: "primary",
        aspectRatio: "4:5",
        sourceKey: "pexelsCeramicShelves",
      },
      {
        alt: "Hearth Vessel shoulder detail",
        kind: "detail",
        aspectRatio: "1:1",
        sourceKey: "adobeWhiteCeramicBowl",
      },
      {
        alt: "Hearth Vessel scale view",
        kind: "alternate",
        aspectRatio: "5:6",
        sourceKey: "unsplashPotteryWheel",
      },
    ]),
  },
  {
    id: "p-cinder-bowl",
    slug: "cinder-bowl",
    name: "Cinder Bowl",
    collectionSlug: "ash-glaze",
    priceCents: 9200,
    stock: 8,
    available: true,
    featured: true,
    published: true,
    materials: "Stoneware with ash glaze and waxed foot ring",
    dimensions: '4" h x 8.25" w',
    care: "Food safe. Dishwasher safe on gentle cycle.",
    shippingNote: "Packed with recyclable kraft padding.",
    leadTime: "Ready to ship in 2 business days",
    glaze: "Ash bloom green",
    story:
      "A serving bowl with a broad, low rim and glaze breaks that shift from pale moss to charcoal depending on light.",
    images: createGallery("ash-glaze", "cinder-bowl", [
      {
        alt: "Cinder Bowl overhead view",
        kind: "primary",
        aspectRatio: "1:1",
        sourceKey: "unsplashCeramicBowls",
      },
      {
        alt: "Cinder Bowl side profile",
        kind: "detail",
        aspectRatio: "4:5",
        sourceKey: "adobeWhiteCeramicBowl",
      },
      {
        alt: "Cinder Bowl glaze close-up",
        kind: "alternate",
        aspectRatio: "5:6",
        sourceKey: "pexelsMinimalCeramicObjects",
      },
    ]),
  },
  {
    id: "p-lichen-cup",
    slug: "lichen-cup-set",
    name: "Lichen Cup Set",
    collectionSlug: "ash-glaze",
    priceCents: 7600,
    stock: 0,
    available: false,
    featured: false,
    published: true,
    materials: "Two hand-thrown cups in speckled stoneware",
    dimensions: '3.5" h x 3.25" w each',
    care: "Food safe. Hand wash for longest glaze life.",
    shippingNote: "Sold as a pair.",
    leadTime: "Next small batch in 4 to 6 weeks",
    glaze: "Moss ash with charcoal rim",
    story:
      "A stackable pair built for espresso or tea service. Each set shows subtle kiln variation and iron freckles through the glaze.",
    images: createGallery("ash-glaze", "lichen-cup-set", [
      {
        alt: "Lichen Cup Set together",
        kind: "primary",
        aspectRatio: "4:5",
        sourceKey: "pexelsPotteryWorkshop",
      },
      {
        alt: "Lichen Cup Set stacked profile",
        kind: "detail",
        aspectRatio: "1:1",
        sourceKey: "unsplashPotteryWheel",
      },
      {
        alt: "Lichen Cup Set foot ring",
        kind: "alternate",
        aspectRatio: "5:6",
        sourceKey: "unsplashMonochromeVase",
      },
    ]),
  },
  {
    id: "p-ember-platter",
    slug: "ember-serving-platter",
    name: "Ember Serving Platter",
    collectionSlug: "table-forms",
    priceCents: 14800,
    stock: 3,
    available: true,
    featured: true,
    published: true,
    materials: "Stoneware slab form with satin liner glaze",
    dimensions: '15" w x 11" d',
    care: "Food safe. Hand wash recommended.",
    shippingNote: "Large-format item with edge protection.",
    leadTime: "Ready to ship in 3 business days",
    glaze: "Warm sand",
    story:
      "A generous platter for service or display, softened by rolled edges and subtle compression lines left visible around the lip.",
    images: createGallery("table-forms", "ember-serving-platter", [
      {
        alt: "Ember Serving Platter top view",
        kind: "primary",
        aspectRatio: "5:6",
        sourceKey: "pexelsCeramicShelves",
      },
      {
        alt: "Ember Serving Platter quarter angle",
        kind: "detail",
        aspectRatio: "1:1",
        sourceKey: "adobeWhiteCeramicBowl",
      },
      {
        alt: "Ember Serving Platter edge detail",
        kind: "alternate",
        aspectRatio: "4:5",
        sourceKey: "unsplashCeramicBowls",
      },
    ]),
  },
  {
    id: "p-shelf-bowl",
    slug: "shelf-bowl",
    name: "Shelf Bowl",
    collectionSlug: "table-forms",
    priceCents: 9800,
    stock: 6,
    available: true,
    featured: false,
    published: true,
    materials: "Stoneware with transparent glaze interior",
    dimensions: '5" h x 9" w',
    care: "Food safe. Dishwasher safe on low heat.",
    shippingNote: "Ships nested in molded pulp insert.",
    leadTime: "Ready to ship in 2 business days",
    glaze: "Raw clay exterior / clear interior",
    story:
      "An everyday fruit or catch-all bowl with enough depth to function in the kitchen and enough presence to live on a shelf.",
    images: createGallery("table-forms", "shelf-bowl", [
      {
        alt: "Shelf Bowl front view",
        kind: "primary",
        aspectRatio: "1:1",
        sourceKey: "unsplashCeramicBowls",
      },
      {
        alt: "Shelf Bowl interior detail",
        kind: "detail",
        aspectRatio: "4:5",
        sourceKey: "pexelsMinimalCeramicObjects",
      },
      {
        alt: "Shelf Bowl back profile",
        kind: "alternate",
        aspectRatio: "5:6",
        sourceKey: "unsplashMonochromeVase",
      },
    ]),
  },
];

export const catalog: Catalog = {
  collections,
  products,
  featuredCollectionSlugs: ["ritual-vessels", "table-forms"],
  featuredProductSlugs: ["river-stone-vase", "cinder-bowl", "ember-serving-platter"],
};
