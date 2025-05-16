
import React from "react";
import OrderTable from "./OrderTable";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const OrderList = () => {
  const { userRole } = useAuth();
  const { orders, loading, handleStatusUpdate } = useOrders();

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
        <OrderTable 
          orders={orders} 
          userRole={userRole!} 
          handleStatusUpdate={handleStatusUpdate} 
        />
      )}
    </div>
  );
};

export default OrderList;
