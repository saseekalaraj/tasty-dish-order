
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Order, OrderStatus } from "@/types";
import { mockOrders } from "@/data/mockOrders";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { orders, loading, handleStatusUpdate };
};
