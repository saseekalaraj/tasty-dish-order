
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { CartItem } from "@/types";
import { useAuth } from "./useAuth";
import { v4 as uuidv4 } from "uuid";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const processOrder = async (cartItems: CartItem[], total: number) => {
    try {
      setLoading(true);
      
      // Create a new order
      const orderId = uuidv4();
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          user_id: user?.id || null,
          status: 'pending',
          total: total
        });
        
      if (orderError) throw orderError;
      
      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderId,
        menu_item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed!",
      });
      
      return orderId;
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    processOrder
  };
};
