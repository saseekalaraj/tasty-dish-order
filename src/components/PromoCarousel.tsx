
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { PromoOffer } from "@/types";
import { promoOffers } from "@/data/menuData";

const PromoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promoOffers.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? promoOffers.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl mb-8">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {promoOffers.map((offer, index) => (
          <div key={offer.id} className="w-full flex-shrink-0">
            <div className="relative overflow-hidden rounded-xl h-[200px] bg-gradient-to-r from-orange-300 to-orange-100">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="text-center max-w-md">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {offer.description}
                  </p>
                  {offer.code && (
                    <div className="bg-white py-1 px-3 rounded-md inline-block text-foodBrand font-semibold mb-4">
                      {offer.code}
                    </div>
                  )}
                  <div>
                    <Button className="bg-foodBrand hover:bg-orange-600">
                      View Offer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        size="icon"
        variant="outline"
        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        size="icon"
        variant="outline"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {promoOffers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? "bg-foodBrand" : "bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
