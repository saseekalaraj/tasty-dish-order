
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
import { Edit, Trash2, Plus } from "lucide-react";

// Mock data for categories
const mockCategories = [
  {
    id: "1",
    name: "Burgers",
    icon: "🍔",
    itemCount: 6
  },
  {
    id: "2",
    name: "Salads",
    icon: "🥗",
    itemCount: 4
  },
  {
    id: "3",
    name: "Sandwiches",
    icon: "🥪",
    itemCount: 5
  },
  {
    id: "4",
    name: "Desserts",
    icon: "🍰",
    itemCount: 8
  }
];

const CategoryManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">Manage food categories</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Icon</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="text-2xl">{category.icon}</div>
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.itemCount} items</TableCell>
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

export default CategoryManagement;
