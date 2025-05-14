
import { Filter } from "lucide-react";
import { categories } from "../data/menuData";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryMenuProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryMenu = ({ activeCategory, setActiveCategory }: CategoryMenuProps) => {
  const [filterView, setFilterView] = useState<"buttons" | "dropdown">("buttons");

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    console.log("Setting category to:", category);
    setActiveCategory(category);
  };

  return (
    <div className="overflow-x-auto py-4 sticky top-16 bg-background z-20 border-b">
      <div className="flex items-center justify-between px-4 mb-2">
        <h3 className="text-sm font-medium">Filter By Category</h3>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-foreground">
                <Filter className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setFilterView("buttons")}>
                  Button View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterView("dropdown")}>
                  Dropdown View
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filterView === "buttons" ? (
        <div className="flex space-x-2 px-4 min-w-max">
          <button
            onClick={() => handleCategorySelect("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors menu-transition",
              activeCategory === "all"
                ? "bg-foodBrand text-white"
                : "bg-secondary/80 hover:bg-secondary text-foreground"
            )}
          >
            🍽️ All Items
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors menu-transition",
                activeCategory === category.id
                  ? "bg-foodBrand text-white"
                  : "bg-secondary/80 hover:bg-secondary text-foreground"
              )}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4">
          <Select 
            value={activeCategory} 
            onValueChange={handleCategorySelect}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">🍽️ All Items</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
