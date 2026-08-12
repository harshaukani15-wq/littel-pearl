// ============================================================
// Database Types - Generated from Supabase schema
// ============================================================

export type UserRole = 'customer' | 'admin';
export type OrderStatus = 'pending' | 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
export type PaymentMethod = 'razorpay' | 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';
export type CouponType = 'percentage' | 'fixed';

// ============================================================
// Table Row Types
// ============================================================

export interface Profile {
  id: string;
  role: UserRole;
  display_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  base_price: number;
  compare_at_price: number | null;
  category_id: string | null;
  is_active: boolean;
  is_featured: boolean;
  material: string | null;
  occasion: string | null;
  age_group: string | null;
  tags: string[];
  avg_rating: number;
  review_count: number;
  total_sold: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string | null;
  name: string | null;
  size: string | null;
  color: string | null;
  material: string | null;
  price_override: number | null;
  stock_quantity: number;
  low_stock_threshold: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  cart_id: string;
  variant_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  min_order_amount: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  total: number;
  shipping_address: AddressData;
  billing_address: AddressData | null;
  coupon_id: string | null;
  coupon_code: string | null;
  notes: string | null;
  contact_email: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id: string | null;
  product_name: string;
  variant_label: string | null;
  price: number;
  quantity: number;
  image_url: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id: string | null;
  rating: number;
  title: string | null;
  body: string | null;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  is_read: boolean;
  data: Record<string, unknown>;
  created_at: string;
}

// ============================================================
// Composite / Joined Types
// ============================================================

export interface AddressData {
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
  category: Category | null;
}

export interface ProductWithDetails extends ProductWithImages {
  variants: ProductVariant[];
  reviews?: ReviewWithUser[];
}

export interface CartItemWithProduct extends CartItem {
  variant: ProductVariant & {
    product: Product & {
      images: ProductImage[];
    };
  };
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
  payment: Payment | null;
}

export interface ReviewWithUser extends Review {
  profile: Pick<Profile, 'display_name' | 'avatar_url'>;
}

// ============================================================
// API / Form Types
// ============================================================

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  occasions?: string[];
  minRating?: number;
  hasDiscount?: boolean;
  search?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popularity';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CheckoutData {
  contact: {
    email: string;
    phone: string;
  };
  address: AddressData;
  payment_method: PaymentMethod;
  coupon_code?: string;
  notes?: string;
}

export interface AdminDashboardStats {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  activeProducts: number;
  revenueChange: number;
  ordersChange: number;
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface CategorySalesData {
  category: string;
  revenue: number;
  orders: number;
}
