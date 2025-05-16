
import { supabase } from "@/integrations/supabase/client";

export const setupInitialAdmin = async (email: string, userId: string) => {
  try {
    // Check if the user already has an admin role
    const { data: existingRole, error: checkError } = await supabase
      .from('user_roles')
      .select('*')
      .eq('user_id', userId)
      .eq('role', 'super_admin');
      
    if (checkError) throw checkError;
    
    // If no admin role exists, create one
    if (!existingRole || existingRole.length === 0) {
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'super_admin'
        });
        
      if (insertError) throw insertError;
      console.log(`Admin role assigned to ${email}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error setting up initial admin:", error);
    return false;
  }
};
