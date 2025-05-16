
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Order, OrderStatus, UserRole } from "@/types";
import { 
  getStatusBadge, 
  getAvailableActions, 
  formatOrderTime,
  formatCurrency,
  formatOrderItems
} from "@/utils/orderUtils";

interface OrderTableProps {
  orders: Order[];
  userRole: UserRole;
  handleStatusUpdate: (orderId: string, newStatus: OrderStatus) => Promise<void>;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, userRole, handleStatusUpdate }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{formatOrderItems(order.items)}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{formatCurrency(order.total)}</TableCell>
            <TableCell>{formatOrderTime(order.created_at)}</TableCell>
            <TableCell>
              {getAvailableActions(order.status, userRole, handleStatusUpdate, order.id)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
