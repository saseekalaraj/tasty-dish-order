
import { Menu, Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface NavbarProps {
  toggleSidebar: () => void;
  toggleCart: () => void;
}

const Navbar = ({ toggleSidebar, toggleCart }: NavbarProps) => {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="container px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden mr-2" 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-foodBrand">
              Tasty<span className="text-black">Dish</span>
            </span>
          </div>
        </div>
        
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for food..."
              className="pl-10 bg-secondary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={toggleCart} 
            variant="ghost" 
            size="icon" 
            className="relative"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-foodBrand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          
          <div className="hidden sm:flex gap-2">
            <Button variant="outline">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
      
      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for food..."
            className="pl-10 bg-secondary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
