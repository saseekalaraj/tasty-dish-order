
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";

// Mock data for menu items
const mockMenuItems = [
  {
    id: "1",
    name: "Grilled Chicken Sandwich",
    category: "Sandwiches",
    price: "$12.99",
    popular: true,
    available: true
  },
  {
    id: "2",
    name: "Caesar Salad",
    category: "Salads",
    price: "$9.50",
    popular: false,
    available: true
  },
  {
    id: "3",
    name: "Cheeseburger",
    category: "Burgers",
    price: "$14.75",
    popular: true,
    available: true
  },
  {
    id: "4",
    name: "Seasonal Dessert",
    category: "Desserts",
    price: "$8.00",
    popular: false,
    available: false
  }
];

const MenuManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Manage food items and availability</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockMenuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                {item.available ? (
                  <Badge className="bg-green-500 text-white">Available</Badge>
                ) : (
                  <Badge variant="secondary">Unavailable</Badge>
                )}
              </TableCell>
              <TableCell>
                {item.popular ? (
                  <Badge variant="default">Popular</Badge>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuManagement;
