
import { categories } from "@/data/menuData";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setActiveCategory: (category: string) => void;
  activeCategory: string;
}

const Sidebar = ({ isOpen, setActiveCategory, activeCategory }: SidebarProps) => {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out border-r shadow-sm",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-foodBrand">
          Tasty<span className="text-black">Dish</span>
        </h2>
      </div>
      <div className="py-4">
        <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Menu Categories
        </h3>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "w-full flex items-center px-4 py-2 text-sm font-medium",
              activeCategory === "all"
                ? "bg-foodBrand/10 text-foodBrand border-r-2 border-foodBrand"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            🍽️ All Items
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "w-full flex items-center px-4 py-2 text-sm font-medium",
                activeCategory === category.id
                  ? "bg-foodBrand/10 text-foodBrand border-r-2 border-foodBrand"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
