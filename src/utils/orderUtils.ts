
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OrderStatus, UserRole, Order } from "@/types";

// Format order status as a badge with appropriate styling
export const getStatusBadge = (status: OrderStatus) => {
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

// Get the appropriate action button based on order status and user role
export const getAvailableActions = (
  status: OrderStatus, 
  role: UserRole,
  handleStatusUpdate: (orderId: string, newStatus: OrderStatus) => Promise<void>,
  orderId: string
) => {
  // For kitchen staff
  if (role === "kitchen_staff") {
    if (status === "pending") {
      return <Button size="sm" onClick={() => handleStatusUpdate(orderId, "preparing")}>Start Preparing</Button>;
    }
    if (status === "preparing") {
      return <Button size="sm" onClick={() => handleStatusUpdate(orderId, "ready")}>Mark Ready</Button>;
    }
  }
  
  // For waiters
  if (role === "waiter") {
    if (status === "ready") {
      return <Button size="sm" onClick={() => handleStatusUpdate(orderId, "completed")}>Deliver Order</Button>;
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

// Format the order time from ISO string to readable format
export const formatOrderTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Format order total to currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format order items for display
export const formatOrderItems = (items: Order['items']): string => {
  return items.map(item => item.name).join(", ");
};
