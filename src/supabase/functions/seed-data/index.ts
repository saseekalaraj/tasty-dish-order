
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
        auth: { persistSession: false }
      }
    );

    // Insert sample categories
    const categories = [
      { name: "Burgers", icon: "🍔" },
      { name: "Salads", icon: "🥗" },
      { name: "Sandwiches", icon: "🥪" },
      { name: "Desserts", icon: "🍰" },
      { name: "Drinks", icon: "🥤" }
    ];
    
    const { data: categoryData, error: categoryError } = await supabaseClient
      .from('menu_categories')
      .upsert(categories, { onConflict: 'name' })
      .select();
      
    if (categoryError) throw categoryError;
    
    // Get category IDs for inserting menu items
    const categoryMap = categoryData.reduce((acc, cat) => {
      acc[cat.name] = cat.id;
      return acc;
    }, {});
    
    // Insert sample menu items
    const menuItems = [
      {
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, and special sauce",
        price: 10.99,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        category_id: categoryMap["Burgers"],
        popular: true
      },
      {
        name: "Veggie Burger",
        description: "Plant-based patty with avocado and sprouts",
        price: 9.99,
        image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2",
        category_id: categoryMap["Burgers"],
        popular: false
      },
      {
        name: "Caesar Salad",
        description: "Romaine lettuce with croutons and Caesar dressing",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1551248429-40975aa4de74",
        category_id: categoryMap["Salads"],
        popular: true
      },
      {
        name: "Grilled Chicken Sandwich",
        description: "Grilled chicken breast with lettuce and mayo",
        price: 11.99,
        image: "https://images.unsplash.com/photo-1521390188846-e2a3a97453a0",
        category_id: categoryMap["Sandwiches"],
        popular: true
      },
      {
        name: "Chocolate Cake",
        description: "Rich chocolate cake with fudge frosting",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        category_id: categoryMap["Desserts"],
        popular: false
      },
      {
        name: "Iced Tea",
        description: "Refreshing iced tea with lemon",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1556679343-c1917e0c1863",
        category_id: categoryMap["Drinks"],
        popular: false
      }
    ];
    
    const { error: menuError } = await supabaseClient
      .from('menu_items')
      .upsert(menuItems, { onConflict: 'name' });
      
    if (menuError) throw menuError;

    return new Response(
      JSON.stringify({ success: true, message: "Sample data seeded successfully" }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
        status: 400 
      }
    );
  }
});
