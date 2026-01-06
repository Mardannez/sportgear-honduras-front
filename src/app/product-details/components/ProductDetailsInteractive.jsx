'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductSpecifications from './ProductSpecifications';
import CustomerReviews from './CustomerReviews';
import RelatedProducts from './RelatedProducts';
import Icon from '@/components/ui/AppIcon';

export default function ProductDetailsInteractive({ productData, relatedProductsData }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleAddToCart = (productDetails) => {
    try {
      const cartItem = {
        id: productData?.id,
        name: productData?.name,
        price: productData?.price,
        quantity: productDetails?.quantity,
        size: productDetails?.selectedSize,
        color: productDetails?.selectedColor?.name,
        image: productData?.images?.[0]?.url,
        alt: productData?.images?.[0]?.alt || `Imagen de ${productData?.name}`,
      };

      // Use consistent localStorage key 'sportgear_cart'
      const existingCart = JSON.parse(localStorage.getItem('sportgear_cart') || '[]');
      const existingItemIndex = existingCart?.findIndex(
        (item) =>
          item?.id === cartItem?.id &&
          item?.size === cartItem?.size &&
          item?.color === cartItem?.color
      );

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += cartItem?.quantity;
      } else {
        existingCart?.push(cartItem);
      }

      localStorage.setItem('sportgear_cart', JSON.stringify(existingCart));
      
      // Dispatch custom event to notify Header component
      window.dispatchEvent(new Event('cartUpdated'));
      
      setNotificationMessage('Producto agregado al carrito exitosamente');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setNotificationMessage('Error al agregar producto al carrito');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleAddToWishlist = () => {
    const wishlistItem = {
      id: productData?.id,
      name: productData?.name,
      price: productData?.price,
      image: productData?.images?.[0]?.url,
    };

    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const itemExists = existingWishlist?.some((item) => item?.id === wishlistItem?.id);

    if (!itemExists) {
      existingWishlist?.push(wishlistItem);
      localStorage.setItem('wishlist', JSON.stringify(existingWishlist));
      setNotificationMessage('Producto agregado a lista de deseos');
    } else {
      setNotificationMessage('Este producto ya está en tu lista de deseos');
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSubmitReview = (reviewData) => {
    setNotificationMessage('Gracias por tu reseña. Será publicada después de revisión.');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hola, tengo una consulta sobre: ${productData?.name}`;
    const phoneNumber = '50412345678';
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <>
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-20 right-4 z-[200] bg-success text-success-foreground px-6 py-3 rounded-lg shadow-elevation flex items-center space-x-3 animate-slide-in">
          <Icon name="CheckCircleIcon" size={24} variant="solid" />
          <span className="font-heading font-medium">{notificationMessage}</span>
        </div>
      )}
      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductImageGallery images={productData?.images} />
        <ProductInfo
          product={productData}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </div>
      {/* WhatsApp Inquiry Button */}
      <div className="mb-12">
        <button
          onClick={handleWhatsAppInquiry}
          className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-all duration-fast font-heading font-semibold shadow-sm"
        >
          <Icon name="ChatBubbleLeftRightIcon" size={24} variant="solid" />
          <span>¿Tienes preguntas? Contáctanos por WhatsApp</span>
        </button>
      </div>
      {/* Specifications */}
      <div className="mb-12">
        <ProductSpecifications specifications={productData?.specifications} />
      </div>
      {/* Customer Reviews */}
      <div className="mb-12">
        <CustomerReviews
          reviews={productData?.reviews}
          averageRating={productData?.rating}
          totalReviews={productData?.reviewCount}
          onSubmitReview={handleSubmitReview}
        />
      </div>
      {/* Related Products */}
      <div>
        <RelatedProducts products={relatedProductsData} />
      </div>
    </>
  );
}

ProductDetailsInteractive.propTypes = {
  productData: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    rating: PropTypes?.number?.isRequired,
    reviewCount: PropTypes?.number?.isRequired,
    description: PropTypes?.string?.isRequired,
    inStock: PropTypes?.bool?.isRequired,
    stock: PropTypes?.number?.isRequired,
    images: PropTypes?.arrayOf(
      PropTypes?.shape({
        url: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    sizes: PropTypes?.arrayOf(PropTypes?.string),
    colors: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
      })
    ),
    features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    specifications: PropTypes?.arrayOf(
      PropTypes?.shape({
        label: PropTypes?.string?.isRequired,
        value: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    reviews: PropTypes?.arrayOf(
      PropTypes?.shape({
        id: PropTypes?.number?.isRequired,
        userName: PropTypes?.string?.isRequired,
        userImage: PropTypes?.string?.isRequired,
        userImageAlt: PropTypes?.string?.isRequired,
        rating: PropTypes?.number?.isRequired,
        title: PropTypes?.string?.isRequired,
        comment: PropTypes?.string?.isRequired,
        date: PropTypes?.string?.isRequired,
        verified: PropTypes?.bool?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
  relatedProductsData: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      rating: PropTypes?.number?.isRequired,
      reviewCount: PropTypes?.number?.isRequired,
      discount: PropTypes?.number,
    })
  )?.isRequired,
};