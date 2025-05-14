
import { Plus } from "lucide-react";
import { MenuItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-md">
      <div className="relative">
        {/* Special Offer Badge */}
        {item.specialOffer && (
          <div className="food-item-badge">Special</div>
        )}
        
        {/* Popular Badge */}
        {item.popular && !item.specialOffer && (
          <div className="food-item-badge bg-green-500">Popular</div>
        )}
        
        <div className="h-48 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          size="icon"
          className="absolute right-2 bottom-2 bg-white text-foodBrand hover:bg-foodBrand hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full shadow-lg"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg mb-1 text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-0">
        <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
        <Button 
          variant="default" 
          size="sm" 
          className="bg-foodBrand hover:bg-foodBrand/90"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;
