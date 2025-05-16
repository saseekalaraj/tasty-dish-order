import React, { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderStatus, UserRole } from "@/types";

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  // Changed to type assertion instead of type declaration
  const userRole = "super_admin" as UserRole; // Options: super_admin, kitchen_staff, waiter

  useEffect(() => {
    // Fetch orders from Supabase
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // This would be replaced with a real API call to Supabase
        // For now, we'll use mockOrders as we haven't created the orders table yet
        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error",
          description: "Failed to fetch orders. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      // This would be replaced with a real API call to update the status in Supabase
      // For now, we'll just update the local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast({
        title: "Order Status Updated",
        description: `Order ${orderId} has been updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getAvailableActions = (status: OrderStatus, role: UserRole) => {
    // For kitchen staff
    if (role === "kitchen_staff") {
      if (status === "pending") {
        return <Button size="sm" onClick={() => handleStatusUpdate(orders.find(o => o.status === status)?.id || "", "preparing")}>Start Preparing</Button>;
      }
      if (status === "preparing") {
        return <Button size="sm" onClick={() => handleStatusUpdate(orders.find(o => o.status === status)?.id || "", "ready")}>Mark Ready</Button>;
      }
    }
    
    // For waiters
    if (role === "waiter") {
      if (status === "ready") {
        return <Button size="sm" onClick={() => handleStatusUpdate(orders.find(o => o.status === status)?.id || "", "completed")}>Deliver Order</Button>;
      }
    }
    
    // For admins
    if (role === "super_admin") {
      if (status !== "completed") {
        return <Button size="sm">Update Status</Button>;
      }
    }
    
    return null;
  };

  // Mock data for orders
  const mockOrders: Order[] = [
    {
      id: "ORD-001",
      items: ["Grilled Chicken Sandwich", "Fries", "Soda"],
      status: "pending",
      total: "$24.99",
      time: "10:30 AM"
    },
    {
      id: "ORD-002",
      items: ["Caesar Salad", "Iced Tea"],
      status: "preparing",
      total: "$15.50",
      time: "10:45 AM"
    },
    {
      id: "ORD-003",
      items: ["Cheeseburger", "Onion Rings", "Milkshake"],
      status: "ready",
      total: "$28.75",
      time: "11:00 AM"
    },
    {
      id: "ORD-004",
      items: ["Margherita Pizza", "Garlic Bread", "Coke"],
      status: "completed",
      total: "$32.00",
      time: "11:15 AM"
    }
  ];

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
      
      {loading ? (
        <p className="text-center py-6">Loading orders...</p>
      ) : (
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.items.join(", ")}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>
                  {getAvailableActions(order.status, userRole)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderList;
