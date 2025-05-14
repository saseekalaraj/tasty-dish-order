
import { ShoppingCart, Trash, X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    cartCount
  } = useCart();

  const taxRate = 0.1; // 10% tax
  const tax = cartTotal * taxRate;
  const orderTotal = cartTotal + tax;
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-foodBrand" />
            <h2 className="text-lg font-semibold">Your Order</h2>
            <span className="bg-foodBrand text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                onClick={clearCart}
              >
                <Trash className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)]">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-center">Your cart is empty</h3>
            <p className="text-muted-foreground text-center mt-2">
              Add some delicious items from our menu!
            </p>
            <Button 
              className="mt-6 bg-foodBrand hover:bg-foodBrand/90"
              onClick={() => setIsOpen(false)}
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 pb-4 border-b">
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium leading-tight line-clamp-1">{item.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} each
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash className="h-3 w-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full bg-foodBrand hover:bg-foodBrand/90">
              Checkout Now
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
