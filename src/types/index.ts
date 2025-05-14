
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
