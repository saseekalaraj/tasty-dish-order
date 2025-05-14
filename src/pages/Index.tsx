
import { useState, useEffect } from 'react';
import { menuItems } from '../data/menuData';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import CategoryMenu from '../components/CategoryMenu';
import MenuItemCard from '../components/MenuItemCard';
import CartDrawer from '../components/CartDrawer';
import PromoCarousel from '../components/PromoCarousel';
import Sidebar from '../components/Sidebar';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [popularItems, setPopularItems] = useState(() => 
    menuItems.filter(item => item.popular)
  );

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Update filtered items when activeCategory changes
  useEffect(() => {
    console.log("Active category changed to:", activeCategory);
    if (activeCategory === "all") {
      setFilteredItems(menuItems);
      setPopularItems(menuItems.filter(item => item.popular));
    } else {
      const filtered = menuItems.filter(item => item.category === activeCategory);
      setFilteredItems(filtered);
      // Also filter popular items by the selected category
      setPopularItems(menuItems.filter(item => item.popular && item.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar toggleSidebar={toggleSidebar} toggleCart={toggleCart} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="container px-4 py-6">
            {/* Promo Carousel */}
            <PromoCarousel />
            
            {/* Category Menu */}
            <div className="w-full">
              <CategoryMenu 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
              />
            </div>
            
            {/* Popular Items */}
            {popularItems.length > 0 && (
              <section className="mb-10 mt-6">
                <h2 className="text-2xl font-bold mb-6">Popular Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {popularItems.slice(0, 4).map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}
            
            {/* Menu Items */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                {activeCategory === "all" ? "All Items" : 
                  filteredItems.length > 0 ? 
                  `${filteredItems[0].category.charAt(0).toUpperCase() + filteredItems[0].category.slice(1)}` : 
                  "Menu Items"}
              </h2>
              
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredItems.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-lg text-muted-foreground">No items found in this category.</p>
                </div>
              )}
            </section>
          </div>
        </main>
        
        {/* Cart Drawer */}
        <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      </div>
    </div>
  );
};

export default Index;
