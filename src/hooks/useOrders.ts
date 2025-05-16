
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Order, OrderStatus } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrders = () => {
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  // Fetch orders from Supabase
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            id, 
            user_id, 
            status, 
            total, 
            created_at, 
            updated_at,
            order_items (
              id, 
              order_id, 
              menu_item_id, 
              name, 
              price, 
              quantity
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform data to match our Order type
        const transformedOrders: Order[] = data.map(order => ({
          id: order.id,
          user_id: order.user_id,
          status: order.status as OrderStatus,
          total: order.total,
          created_at: order.created_at,
          updated_at: order.updated_at,
          items: order.order_items.map(item => ({
            id: item.id,
            order_id: item.order_id,
            menu_item_id: item.menu_item_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }));

        return transformedOrders;
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          title: "Error",
          description: "Failed to fetch orders. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    }
  });

  // Update order status mutation
  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: OrderStatus }) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch orders query when an order is updated
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatusMutation.mutateAsync({ orderId, newStatus });
      
      toast({
        title: "Order Status Updated",
        description: `Order ${orderId} has been updated to ${newStatus}`,
      });
    } catch (error) {
      // Error is already handled in the mutation
    }
  };

  return { 
    orders, 
    loading: isLoading, 
    handleStatusUpdate 
  };
};
