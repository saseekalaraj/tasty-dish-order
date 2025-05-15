
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  specialOffer?: boolean;
  tags?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface PromoOffer {
  id: string;
  title: string;
  description: string;
  image?: string;
  discount?: number;
  code?: string;
}

// Backend integration types
export interface Order {
  id: string;
  user_id?: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "preparing" | "ready" | "completed";
export type UserRole = "super_admin" | "kitchen_staff" | "waiter";
