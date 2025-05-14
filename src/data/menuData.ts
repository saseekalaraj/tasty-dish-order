
import { MenuItem, Category, PromoOffer } from "../types";

export const categories: Category[] = [
  { 
    id: "burgers", 
    name: "Burgers", 
    icon: "🍔" 
  },
  { 
    id: "pizzas", 
    name: "Pizzas", 
    icon: "🍕" 
  },
  { 
    id: "sandwiches", 
    name: "Sandwiches", 
    icon: "🥪" 
  },
  { 
    id: "drinks", 
    name: "Drinks", 
    icon: "🥤" 
  },
  { 
    id: "desserts", 
    name: "Desserts", 
    icon: "🍰" 
  },
  { 
    id: "sides", 
    name: "Sides", 
    icon: "🍟" 
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Cheese Burger",
    description: "Juicy beef patty with cheddar cheese, lettuce, tomato and our special sauce",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
    category: "burgers",
    popular: true,
  },
  {
    id: "2",
    name: "Double Angus Burger",
    description: "Two premium Angus beef patties with double cheese, bacon, and our signature sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=500&auto=format&fit=crop",
    category: "burgers",
    specialOffer: true,
  },
  {
    id: "3",
    name: "Spicy Chicken Burger",
    description: "Crispy chicken breast with spicy sauce, jalapeños, lettuce and mayo",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=500&auto=format&fit=crop",
    category: "burgers",
    popular: true,
  },
  {
    id: "4",
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables and vegan sauce",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=500&auto=format&fit=crop",
    category: "burgers",
    tags: ["vegetarian"],
  },
  {
    id: "5",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella cheese, and fresh basil",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500&auto=format&fit=crop",
    category: "pizzas",
    popular: true,
  },
  {
    id: "6",
    name: "Pepperoni Pizza",
    description: "Tomato sauce, mozzarella cheese and pepperoni slices",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500&auto=format&fit=crop",
    category: "pizzas",
    specialOffer: true,
  },
  {
    id: "7",
    name: "Club Sandwich",
    description: "Triple-decker sandwich with chicken, bacon, lettuce, tomato and mayo",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=500&auto=format&fit=crop",
    category: "sandwiches",
    popular: true,
  },
  {
    id: "8",
    name: "Chocolate Milkshake",
    description: "Rich chocolate milkshake topped with whipped cream",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1624781740834-fbfbf5fd221e?q=80&w=500&auto=format&fit=crop",
    category: "drinks",
  },
  {
    id: "9",
    name: "Cheesecake",
    description: "New York style cheesecake with berry compote",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1567171466295-4afa63d45416?q=80&w=500&auto=format&fit=crop",
    category: "desserts",
    popular: true,
  },
  {
    id: "10",
    name: "French Fries",
    description: "Crispy golden French fries served with ketchup",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=500&auto=format&fit=crop",
    category: "sides",
    specialOffer: true,
  },
];

export const promoOffers: PromoOffer[] = [
  {
    id: "promo1",
    title: "Earn 10% Reward Points",
    description: "You will earn 10% reward points from your orders, you can convert your reward points on next order.",
    code: "REWARD10",
    discount: 10,
  },
  {
    id: "promo2",
    title: "Free Delivery",
    description: "Free delivery on all orders over $20.",
    code: "FREEDEL",
  },
  {
    id: "promo3",
    title: "30% Off Desserts",
    description: "Get 30% off on all desserts with any main course.",
    code: "SWEET30",
    discount: 30,
  }
];
