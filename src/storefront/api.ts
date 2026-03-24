export type StoreAddress = {
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

export type StoreUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  defaultAddress: StoreAddress | null;
  role: "customer" | "admin";
};

export type StoreSession = {
  token: string;
  user: StoreUser;
};

export type StoreOrderItem = {
  productId: string;
  name: string;
  quantity: number;
  priceCents: number;
};

export type StoreOrder = {
  id: string;
  number: string;
  createdAt: string;
  userId: string | null;
  email: string;
  items: StoreOrderItem[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  estimatedDelivery?: string | null;
  shippingAddress: StoreAddress;
  notes?: string | null;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  defaultAddress?: Partial<StoreAddress>;
};

export type UpdateProfileInput = {
  name?: string;
  phone?: string;
  defaultAddress?: StoreAddress;
};

export type CreateOrderInput = {
  items: StoreOrderItem[];
  email: string;
  address: StoreAddress;
};

export type OrderLookupInput = {
  orderNumber: string;
  email: string;
};

export type AccountOrdersResponse = {
  orders: StoreOrder[];
};

export type OrderDetailResponse = {
  order: StoreOrder | null;
};

export type AdminProduct = {
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
  images: Array<{
    id: string;
    label: string;
    background: string;
  }>;
};

export type AdminBootstrapResponse = {
  products: AdminProduct[];
  orders: StoreOrder[];
};

export type CreateAdminProductInput = {
  name: string;
  collectionSlug: string;
  priceCents: number;
  stock?: number;
  materials?: string;
  dimensions?: string;
  care?: string;
  shippingNote?: string;
  leadTime?: string;
  glaze?: string;
  story?: string;
  imageLabels?: string[];
};

export type UpdateAdminProductInput = Partial<{
  name: string;
  collectionSlug: string;
  priceCents: number;
  stock: number;
  published: boolean;
  featured: boolean;
  materials: string;
  dimensions: string;
  care: string;
  shippingNote: string;
  leadTime: string;
  glaze: string;
  story: string;
}>;

export type UpdateAdminOrderInput = Partial<{
  fulfillmentStatus: string;
  trackingNumber: string;
  carrier: string;
}>;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";
const AUTH_TOKEN_KEY = "made-local-auth-token";

type RequestOptions = RequestInit & {
  token?: string | null;
};

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

async function backendRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers,
  });

  const payload = await parseJsonResponse<{ error?: string } & T>(response);

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed with status ${response.status}`);
  }

  return payload as T;
}

export function loadAuthToken() {
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

export function storeAuthToken(token: string) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken() {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function createAddressFallback(name: string, email: string): StoreAddress {
  return {
    fullName: name,
    email,
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  };
}

export async function fetchSession(token: string) {
  return backendRequest<{ user: StoreUser }>("/api/auth/session", { token });
}

export async function login(input: { email: string; password: string }) {
  return backendRequest<StoreSession>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  });
}

export async function register(input: RegisterInput) {
  return backendRequest<StoreSession>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      password: input.password,
      phone: input.phone,
      defaultAddress: input.defaultAddress,
    }),
  });
}

export async function logout(token: string) {
  await backendRequest<void>("/api/auth/logout", {
    method: "POST",
    token,
  });
}

export async function updateProfile(token: string, input: UpdateProfileInput) {
  return backendRequest<{ user: StoreUser }>("/api/account/profile", {
    method: "PUT",
    token,
    body: JSON.stringify(input),
  });
}

export async function getAccountOrders(token: string) {
  return backendRequest<AccountOrdersResponse>("/api/account/orders", { token });
}

export async function getOrderDetail(token: string, orderId: string) {
  return backendRequest<OrderDetailResponse>(`/api/account/orders/${orderId}`, { token });
}

export async function lookupOrder(input: OrderLookupInput) {
  return backendRequest<OrderDetailResponse>("/api/orders/lookup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function createOrder(token: string | null, input: CreateOrderInput) {
  return backendRequest<OrderDetailResponse>("/api/orders", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export async function fetchAdminBootstrap(token: string) {
  return backendRequest<AdminBootstrapResponse>("/api/admin/bootstrap", { token });
}

export async function createAdminProduct(token: string, input: CreateAdminProductInput) {
  return backendRequest<{ product: AdminProduct }>("/api/admin/products", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export async function updateAdminProduct(token: string, productId: string, input: UpdateAdminProductInput) {
  return backendRequest<{ product: AdminProduct }>(`/api/admin/products/${productId}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input),
  });
}

export async function updateAdminOrder(token: string, orderId: string, input: UpdateAdminOrderInput) {
  return backendRequest<{ order: StoreOrder }>(`/api/admin/orders/${orderId}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input),
  });
}
