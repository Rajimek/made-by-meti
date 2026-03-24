import { useSyncExternalStore } from "react";

import { catalog } from "./data";
import type { Product } from "./types";

const CART_STORAGE_KEY = "made-by-meti:storefront-cart:v1";
const CART_CHANGE_EVENT = "made-by-meti:storefront-cart-change";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartLine = {
  product: Product;
  quantity: number;
  lineTotalCents: number;
};

export type CartTotals = {
  itemCount: number;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
};

export type CheckoutAddress = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type CartSnapshot = CartItem[];

const fallbackCart: CartSnapshot = [];

let cachedCart = readCart();

function canUseWindow() {
  return typeof window !== "undefined";
}

function readCart(): CartSnapshot {
  if (!canUseWindow()) {
    return fallbackCart;
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return normalizeCart(parsed);
  } catch {
    return [];
  }
}

function persistCart(nextCart: CartSnapshot) {
  cachedCart = nextCart;

  if (canUseWindow()) {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
    window.dispatchEvent(new Event(CART_CHANGE_EVENT));
  }
}

function normalizeCart(items: unknown[]): CartSnapshot {
  const merged = new Map<string, number>();

  for (const item of items) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const candidate = item as Partial<CartItem>;
    const productId = typeof candidate.productId === "string" ? candidate.productId : "";
    const quantity = Number(candidate.quantity);

    if (!productId || !Number.isFinite(quantity) || quantity <= 0) {
      continue;
    }

    merged.set(productId, (merged.get(productId) || 0) + Math.floor(quantity));
  }

  return Array.from(merged.entries()).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));
}

function getStoredCart(): CartSnapshot {
  if (!canUseWindow()) {
    return cachedCart;
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as unknown[];
    return normalizeCart(parsed);
  } catch {
    return [];
  }
}

function emitCartChange() {
  if (!canUseWindow()) {
    return;
  }

  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

function setCart(nextCart: CartSnapshot) {
  const normalized = normalizeCart(nextCart);
  persistCart(normalized);
}

export function useCartItems() {
  return useSyncExternalStore(subscribeToCart, getStoredCart, () => fallbackCart);
}

export function getCartItems() {
  return getStoredCart();
}

export function getProductById(productId: string, products = catalog.products) {
  return products.find((product) => product.id === productId);
}

export function getCartLines(items = getStoredCart()): CartLine[] {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
        lineTotalCents: product.priceCents * item.quantity,
      };
    })
    .filter((line): line is CartLine => Boolean(line));
}

export function getCartTotals(items = getStoredCart()): CartTotals {
  const lines = getCartLines(items);
  const subtotalCents = lines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  const shippingCents = subtotalCents > 18000 ? 0 : subtotalCents > 0 ? 1800 : 0;

  return {
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
  };
}

export function getCartQuantity(productId: string, items = getStoredCart()) {
  return items.find((item) => item.productId === productId)?.quantity || 0;
}

export function addToCart(productId: string, quantity = 1) {
  const current = getStoredCart();
  const nextQuantity = Math.max(1, Math.floor(quantity));
  let found = false;

  const next = current.map((item) => {
    if (item.productId !== productId) {
      return item;
    }

    found = true;
    return {
      productId,
      quantity: item.quantity + nextQuantity,
    };
  });

  if (!found) {
    next.push({
      productId,
      quantity: nextQuantity,
    });
  }

  setCart(next);
}

export function setCartQuantity(productId: string, quantity: number) {
  const nextQuantity = Math.max(0, Math.floor(quantity));
  const next = getStoredCart().flatMap((item) => {
    if (item.productId !== productId) {
      return [item];
    }

    if (nextQuantity === 0) {
      return [];
    }

    return [
      {
        productId,
        quantity: nextQuantity,
      },
    ];
  });

  setCart(next);
}

export function incrementCartItem(productId: string) {
  addToCart(productId, 1);
}

export function decrementCartItem(productId: string) {
  const currentQuantity = getCartQuantity(productId);
  setCartQuantity(productId, currentQuantity - 1);
}

export function removeFromCart(productId: string) {
  const next = getStoredCart().filter((item) => item.productId !== productId);
  setCart(next);
}

export function clearCart() {
  setCart([]);
}

export function subscribeToCart(listener: () => void) {
  if (!canUseWindow()) {
    return () => {};
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(CART_CHANGE_EVENT, listener);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CART_CHANGE_EVENT, listener);
  };
}

export function getStoredCartSnapshot() {
  return cachedCart;
}

