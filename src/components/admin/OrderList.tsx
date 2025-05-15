
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Define proper types for our component
type OrderStatus = "pending" | "preparing" | "ready" | "completed";
type UserRole = "super_admin" | "kitchen_staff" | "waiter";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    items: ["Grilled Chicken Sandwich", "Fries", "Soda"],
    status: "pending" as OrderStatus,
    total: "$24.99",
    time: "10:30 AM"
  },
  {
    id: "ORD-002",
    items: ["Caesar Salad", "Iced Tea"],
    status: "preparing" as OrderStatus,
    total: "$15.50",
    time: "10:45 AM"
  },
  {
    id: "ORD-003",
    items: ["Cheeseburger", "Onion Rings", "Milkshake"],
    status: "ready" as OrderStatus,
    total: "$28.75",
    time: "11:00 AM"
  },
  {
    id: "ORD-004",
    items: ["Margherita Pizza", "Garlic Bread", "Coke"],
    status: "completed" as OrderStatus,
    total: "$32.00",
    time: "11:15 AM"
  }
];

const OrderList = () => {
  // This would be replaced with a real user role check
  const userRole: UserRole = "super_admin"; // Options: super_admin, kitchen_staff, waiter

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "preparing":
        return <Badge variant="secondary">Preparing</Badge>;
      case "ready":
        return <Badge variant="default">Ready</Badge>;
      case "completed":
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    // This would be replaced with a real API call
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been updated to ${newStatus}`,
    });
  };

  const getAvailableActions = (status: OrderStatus, role: UserRole) => {
    if (role === "kitchen_staff") {
      if (status === "pending") {
        return <Button size="sm" onClick={() => handleStatusUpdate(mockOrders.find(o => o.status === status)?.id || "", "preparing")}>Start Preparing</Button>;
      }
      if (status === "preparing") {
        return <Button size="sm" onClick={() => handleStatusUpdate(mockOrders.find(o => o.status === status)?.id || "", "ready")}>Mark Ready</Button>;
      }
    }
    
    if (role === "waiter") {
      if (status === "ready") {
        return <Button size="sm" onClick={() => handleStatusUpdate(mockOrders.find(o => o.status === status)?.id || "", "completed")}>Deliver Order</Button>;
      }
    }
    
    if (role === "super_admin") {
      if (status !== "completed") {
        return <Button size="sm">Update Status</Button>;
      }
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          {userRole === "kitchen_staff" 
            ? "Orders to be prepared" 
            : userRole === "waiter" 
              ? "Orders to be delivered" 
              : "All restaurant orders"}
        </p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.items.join(", ")}</TableCell>
              <TableCell>{getStatusBadge(order.status as OrderStatus)}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.time}</TableCell>
              <TableCell>
                {getAvailableActions(order.status as OrderStatus, userRole)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
