
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Package, Users, ChefHat, Settings, Utensils, FolderTree, User } from "lucide-react";
import OrderList from "@/components/admin/OrderList";
import UserManagement from "@/components/admin/UserManagement";
import MenuManagement from "@/components/admin/MenuManagement";
import CategoryManagement from "@/components/admin/CategoryManagement";
import Dashboard from "@/components/admin/Dashboard";
import { useAuth } from "@/hooks/useAuth";

export default function Admin() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const { user, userRole, loading, signOut } = useAuth();
  
  // Redirect to signin if not authenticated
  if (!loading && !user) {
    return <Navigate to="/signin" replace />;
  }
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // Redirect non-staff members to home
  if (user && !userRole) {
    return <Navigate to="/" replace />;
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <OrderList />;
      case "users":
        return <UserManagement />;
      case "menu":
        return <MenuManagement />;
      case "categories":
        return <CategoryManagement />;
      default:
        return <Dashboard />;
    }
  };

  const canAccessUsers = userRole === "super_admin";
  
  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="py-4 px-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Restaurant Admin</h2>
                <p className="text-xs text-muted-foreground">Management Portal</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveView("dashboard")}
                    isActive={activeView === "dashboard"}
                  >
                    <Package />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveView("orders")}
                    isActive={activeView === "orders"}
                  >
                    <Utensils />
                    <span>Orders</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {userRole === "super_admin" && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveView("categories")}
                        isActive={activeView === "categories"}
                      >
                        <FolderTree />
                        <span>Categories</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveView("menu")}
                        isActive={activeView === "menu"}
                      >
                        <ChefHat />
                        <span>Menu Items</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}
                
                {canAccessUsers && (
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setActiveView("users")}
                      isActive={activeView === "users"}
                    >
                      <Users />
                      <span>Staff Management</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarGroup>
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {userRole?.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
