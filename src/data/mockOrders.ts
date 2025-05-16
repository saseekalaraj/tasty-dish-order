
import { Order } from "@/types";

// Mock data for orders
export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      {
        id: "item-1",
        order_id: "ORD-001",
        menu_item_id: "menu-1",
        name: "Grilled Chicken Sandwich",
        price: 12.99,
        quantity: 1
      },
      {
        id: "item-2",
        order_id: "ORD-001",
        menu_item_id: "menu-2",
        name: "Fries",
        price: 4.99,
        quantity: 1
      },
      {
        id: "item-3",
        order_id: "ORD-001",
        menu_item_id: "menu-3",
        name: "Soda",
        price: 2.99,
        quantity: 1
      }
    ],
    status: "pending",
    total: 20.97,
    created_at: "2023-05-16T10:30:00Z",
    updated_at: "2023-05-16T10:30:00Z"
  },
  {
    id: "ORD-002",
    items: [
      {
        id: "item-4",
        order_id: "ORD-002",
        menu_item_id: "menu-4",
        name: "Caesar Salad",
        price: 11.50,
        quantity: 1
      },
      {
        id: "item-5",
        order_id: "ORD-002",
        menu_item_id: "menu-5",
        name: "Iced Tea",
        price: 3.99,
        quantity: 1
      }
    ],
    status: "preparing",
    total: 15.49,
    created_at: "2023-05-16T10:45:00Z",
    updated_at: "2023-05-16T10:45:00Z"
  },
  {
    id: "ORD-003",
    items: [
      {
        id: "item-6",
        order_id: "ORD-003",
        menu_item_id: "menu-6",
        name: "Cheeseburger",
        price: 13.99,
        quantity: 1
      },
      {
        id: "item-7",
        order_id: "ORD-003",
        menu_item_id: "menu-7",
        name: "Onion Rings",
        price: 5.99,
        quantity: 1
      },
      {
        id: "item-8",
        order_id: "ORD-003",
        menu_item_id: "menu-8",
        name: "Milkshake",
        price: 5.99,
        quantity: 1
      }
    ],
    status: "ready",
    total: 25.97,
    created_at: "2023-05-16T11:00:00Z",
    updated_at: "2023-05-16T11:00:00Z"
  },
  {
    id: "ORD-004",
    items: [
      {
        id: "item-9",
        order_id: "ORD-004",
        menu_item_id: "menu-9",
        name: "Margherita Pizza",
        price: 16.99,
        quantity: 1
      },
      {
        id: "item-10",
        order_id: "ORD-004",
        menu_item_id: "menu-10",
        name: "Garlic Bread",
        price: 7.99,
        quantity: 1
      },
      {
        id: "item-11",
        order_id: "ORD-004",
        menu_item_id: "menu-11",
        name: "Coke",
        price: 2.99,
        quantity: 2
      }
    ],
    status: "completed",
    total: 30.96,
    created_at: "2023-05-16T11:15:00Z",
    updated_at: "2023-05-16T11:15:00Z"
  }
];
