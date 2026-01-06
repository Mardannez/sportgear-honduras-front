'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';

export default function ShoppingCartInteractive({ initialCartData, featuredProducts }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('sportgear_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems(initialCartData);
      }
    } else {
      setCartItems(initialCartData);
    }
    setIsLoading(false);
  }, [initialCartData]);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (!isLoading) {
      try {
        localStorage.setItem('sportgear_cart', JSON.stringify(cartItems));
        
        // Dispatch custom event to notify Header component
        window.dispatchEvent(new Event('cartUpdated'));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [cartItems, isLoading]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const handleApplyPromoCode = (code, discountAmount) => {
    // Promo code logic handled in OrderSummary
    console.log('Promo code applied:', code, discountAmount);
  };

  const handleCalculateShipping = (shippingCost) => {
    // Shipping calculation handled in OrderSummary
    console.log('Shipping calculated:', shippingCost);
  };

  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando carrito...</p>
        </div>
      </div>
    );
  }

  if (cartItems?.length === 0) {
    return <EmptyCart featuredProducts={featuredProducts} />;
  }

  // Calculate total items count (sum of all quantities)
  const totalItemsCount = cartItems?.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-foreground text-2xl">
            Mi Carrito ({totalItemsCount} {totalItemsCount === 1 ? 'ítem' : 'ítems'})
          </h2>
        </div>

        {cartItems?.map((item) => (
          <CartItem
            key={item?.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <OrderSummary
          subtotal={subtotal}
          onApplyPromoCode={handleApplyPromoCode}
          onCalculateShipping={handleCalculateShipping}
        />
      </div>
    </div>
  );
}

ShoppingCartInteractive.propTypes = {
  initialCartData: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      quantity: PropTypes?.number?.isRequired,
      stock: PropTypes?.number?.isRequired,
      sku: PropTypes?.string?.isRequired,
      variant: PropTypes?.string
    })
  )?.isRequired,
  featuredProducts: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      discount: PropTypes?.number,
      rating: PropTypes?.number?.isRequired
    })
  )?.isRequired
};