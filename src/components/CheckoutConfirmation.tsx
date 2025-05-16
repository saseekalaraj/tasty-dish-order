
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useCheckout } from "@/hooks/useCheckout";

interface CheckoutConfirmationProps {
  onBack: () => void;
  onComplete: () => void;
}

const CheckoutConfirmation = ({ onBack, onComplete }: CheckoutConfirmationProps) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isCompleted, setIsCompleted] = useState(false);
  const { loading: isProcessing, processOrder } = useCheckout();
  
  const taxRate = 0.1; // 10% tax
  const tax = cartTotal * taxRate;
  const orderTotal = cartTotal + tax;

  const handlePlaceOrder = async () => {
    const orderId = await processOrder(cartItems, orderTotal);
    
    if (orderId) {
      setIsCompleted(true);
      
      // Reset order after showing confirmation
      setTimeout(() => {
        clearCart();
        onComplete();
      }, 2000);
    }
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground text-center mb-6">
          Thank you for your order. Your food will be prepared shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="rounded-full h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">Confirm Your Order</h2>
        </div>
      </div>
      
      {/* Order Items */}
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          <h3 className="font-medium mb-2">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <div className="flex gap-2">
                <div className="text-muted-foreground">{item.quantity} ×</div>
                <div>{item.name}</div>
              </div>
              <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      {/* Order Summary */}
      <div className="border-t p-4">
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
        <Button 
          className="w-full bg-foodBrand hover:bg-foodBrand/90"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
