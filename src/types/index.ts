/* eslint-disable @typescript-eslint/no-explicit-any */
// Generic response
export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// User related types
export const Role = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;
export type Role = typeof Role[keyof typeof Role];

export const IsActive = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  BLOCKED: "BLOCKED",
} as const;
export type IsActive = typeof IsActive[keyof typeof IsActive];

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  role: Role[];
  address?: IAddress;
  isVerified?: boolean;
  isActive?: IsActive;
  isDeleted?: boolean;
  auths: IAuthProvider[];
  createdAt?: string;
  updatedAt?: string;
}

// Auth related
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<IUser, "password">;
}

export interface IResetPasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateProfileRequest {
  name?: string;
  phone?: string;
  address?: IAddress;
  picture?: string;
}

export interface IChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: Role;
  isActive?: IsActive;
}

export interface IUsersResponse {
  users: IUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Product related
export interface IProductVariant {
  size: string;
  color: string;
  stock: number;
  sku: string;
}

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  picture: string;
  description: string;
  category: string;
  subcategory?: string;
  brand?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  variants: IProductVariant[];
  tags?: string[];
  featured?: boolean;
  isActive?: boolean;
  totalStock?: number;
  ratings?: number;
  numReviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductQuery {
  search?: string;
  category?: string;
  subcategory?: string;
  size?: string;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sort?: string;
  page?: number;
  limit?: number;
  gender?: string;
}

export interface IProductsResponse {
  data: IProduct[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ICreateProductRequest {
  name: string;
  slug?: string;
  description: string;
  category: string;
  subcategory?: string;
  brand?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  variants: IProductVariant[];
  tags?: string[];
  featured?: boolean;
}

// Cart related
export interface ICartItem {
  _id: string;
  product: IProduct
  variant: {
    size: string;
    color: string;
    sku: string;
  };
  quantity: number;
  price: number;
}

export interface ICart {
  _id?: string;
  user: string;
  items: ICartItem[];
  totalItems?: number;
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAddToCartRequest {
  productId: string;
  variant: {
    size: string;
    color: string;
    sku: string;
  };
  quantity: number;
}

export interface IUpdateCartItemRequest {
  quantity: number;
}

// Order related
export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
} as const;
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const PaymentStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;
export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

export const PaymentMethod = {
  CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
  CARD: "CARD",
  MOBILE_BANKING: "MOBILE_BANKING",
} as const;
export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface IOrderItem {
  product: IProduct;
  variant: {
    size: string;
    color: string;
    sku: string;
  };
  quantity: number;
  price: number;
  total: number;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface IOrder {
  _id?: string;
  orderNumber: string;
  user: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateOrderRequest {
  shippingAddress: IShippingAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface IOrderQuery {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

export interface IOrdersResponse {
  data: IOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IUpdateOrderStatusRequest {
  orderStatus?: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

// dashboard
export type ISidebarSubItem = {
  title: string;
  url: string;
  component: React.ComponentType<any>;
  icon?: React.ComponentType<any>;
};

export type ISidebarItem = {
  title: string;
  items: ISidebarSubItem[];
};
