
import { categories } from "../data/menuData";
import { cn } from "@/lib/utils";

interface CategoryMenuProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryMenu = ({ activeCategory, setActiveCategory }: CategoryMenuProps) => {
  return (
    <div className="overflow-x-auto py-4 sticky top-16 bg-background z-20 border-b">
      <div className="flex space-x-2 px-4 min-w-max">
        <button
          onClick={() => setActiveCategory("all")}
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
            onClick={() => setActiveCategory(category.id)}
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
    </div>
  );
};

export default CategoryMenu;
