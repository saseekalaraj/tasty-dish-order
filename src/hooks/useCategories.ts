
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/types";

export const useCategories = () => {
  const queryClient = useQueryClient();
  
  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('menu_categories')
          .select('*');
          
        if (error) throw error;
        
        // Transform to match our Category type
        return data.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          icon: cat.icon || ''
        }));
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
  
  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory: Omit<Category, 'id'>) => {
      const { data, error } = await supabase
        .from('menu_categories')
        .insert(newCategory)
        .select();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category added successfully.",
      });
    },
    onError: (error) => {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Update category mutation
  const updateCategoryMutation = useMutation({
    mutationFn: async (category: Category) => {
      const { data, error } = await supabase
        .from('menu_categories')
        .update({
          name: category.name,
          icon: category.icon
        })
        .eq('id', category.id)
        .select();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('menu_categories')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const addCategory = (category: Omit<Category, 'id'>) => {
    addCategoryMutation.mutate(category);
  };
  
  const updateCategory = (category: Category) => {
    updateCategoryMutation.mutate(category);
  };
  
  const deleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id);
  };
  
  return {
    categories,
    loading: isLoading,
    addCategory,
    updateCategory,
    deleteCategory
  };
};
