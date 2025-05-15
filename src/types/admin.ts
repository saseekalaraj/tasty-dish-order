
export type UserRole = 'super_admin' | 'kitchen_staff' | 'waiter';

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  permissions?: string[];
};

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';

export type Order = {
  id: string;
  items: string[] | OrderItem[];
  status: OrderStatus;
  total: string;
  time: string;
  customerInfo?: {
    name: string;
    table?: string;
  };
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type FoodCategory = {
  id: string;
  name: string;
  icon: string;
  itemCount?: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string | number;
  categoryId: string;
  category?: string;
  image?: string;
  popular: boolean;
  available: boolean;
};
