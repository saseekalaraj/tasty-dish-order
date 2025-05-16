
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { MenuItem } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useMenu = () => {
  const queryClient = useQueryClient();
  
  // Fetch menu items
  const { data: menuItems = [], isLoading: loadingItems } = useQuery({
    queryKey: ['menuItems'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*');
          
        if (error) throw error;
        return data as MenuItem[];
      } catch (error) {
        console.error("Error fetching menu items:", error);
        toast({
          title: "Error",
          description: "Failed to fetch menu items. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    }
  });
  
  // Fetch categories
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('menu_categories')
          .select('*');
          
        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories. Please try again.",
          variant: "destructive",
        });
        return [];
      }
    }
  });
  
  // Add menu item mutation
  const addMenuItemMutation = useMutation({
    mutationFn: async (newItem: Omit<MenuItem, 'id'>) => {
      const { data, error } = await supabase
        .from('menu_items')
        .insert(newItem)
        .select();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast({
        title: "Success",
        description: "Menu item added successfully.",
      });
    },
    onError: (error) => {
      console.error("Error adding menu item:", error);
      toast({
        title: "Error",
        description: "Failed to add menu item. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Update menu item mutation
  const updateMenuItemMutation = useMutation({
    mutationFn: async (item: MenuItem) => {
      const { data, error } = await supabase
        .from('menu_items')
        .update({
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          image: item.image,
          popular: item.popular,
          specialOffer: item.specialOffer,
          tags: item.tags
        })
        .eq('id', item.id)
        .select();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast({
        title: "Success",
        description: "Menu item updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating menu item:", error);
      toast({
        title: "Error",
        description: "Failed to update menu item. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Delete menu item mutation
  const deleteMenuItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast({
        title: "Success",
        description: "Menu item deleted successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting menu item:", error);
      toast({
        title: "Error",
        description: "Failed to delete menu item. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    addMenuItemMutation.mutate(item);
  };
  
  const updateMenuItem = (item: MenuItem) => {
    updateMenuItemMutation.mutate(item);
  };
  
  const deleteMenuItem = (id: string) => {
    deleteMenuItemMutation.mutate(id);
  };
  
  return {
    menuItems,
    categories,
    loading: loadingItems || loadingCategories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  };
};
