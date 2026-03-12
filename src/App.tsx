import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SellerDashboard from './components/SellerDashboard';
import OrderConfirmation from './components/OrderConfirmation';
import ProductFilters from './components/ProductFilters';
import { mockProducts, mockOrders } from './data/mockData';
import { Product, CartItem, Order } from './types';

type View = 'home' | 'product-detail' | 'cart' | 'checkout' | 'seller-dashboard' | 'order-confirmation';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orders] = useState<Order[]>(mockOrders);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...products];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return discountB - discountA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.product.id !== productId)
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleBackToProducts = () => {
    setCurrentView('home');
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setCurrentView('cart');
  };

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    // Create a new order
    const newOrder: Order = {
      id: `o${Date.now()}`,
      userId: 'u1',
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      status: 'pending',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    setCurrentOrder(newOrder);
    setCurrentView('order-confirmation');
    setCartItems([]);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={handleBackToProducts}
          />
        ) : null;

      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onClose={() => setCurrentView('home')}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        );

      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            onClose={() => setCurrentView('cart')}
            onOrderComplete={handleOrderComplete}
          />
        );

      case 'seller-dashboard':
        return (
          <SellerDashboard
            orders={orders}
            products={products}
            onBack={handleBackToProducts}
          />
        );

      case 'order-confirmation':
        return currentOrder ? (
          <OrderConfirmation
            order={currentOrder}
            cartItems={cartItems}
            onContinueShopping={handleBackToProducts}
            onViewOrders={() => setCurrentView('seller-dashboard')}
          />
        ) : null;

      default:
        const categories = Array.from(new Set(products.map(p => p.category)));
        
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ShopEZ</h2>
              <p className="text-gray-600">Discover amazing products at great prices</p>
            </div>
            
            {/* Featured Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Shop by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSearch(category)}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-2xl mb-2">
                      {category === 'Electronics' && '📱'}
                      {category === 'Clothing' && '👕'}
                      {category === 'Home' && '🏠'}
                      {category === 'Sports' && '⚽'}
                      {category === 'Accessories' && '🎒'}
                    </div>
                    <p className="font-medium text-gray-900">{category}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <ProductFilters
                  categories={categories}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                <ProductGrid
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductClick}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'seller-dashboard' && (
        <Header
          cartItems={cartItems}
          onCartClick={handleCartClick}
          onSearch={handleSearch}
        />
      )}
      {renderContent()}
    </div>
  );
}

export default App;
