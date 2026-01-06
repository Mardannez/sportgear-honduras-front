'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function FeaturedProductsCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const [itemsToShow, setItemsToShow] = useState(itemsPerView?.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView?.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView?.tablet);
      } else {
        setItemsToShow(itemsPerView?.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products?.length - itemsToShow);

  useEffect(() => {
    if (isAutoPlaying && products?.length > itemsToShow) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
      }, 4000);
    }

    return () => {
      if (autoPlayRef?.current) {
        clearInterval(autoPlayRef?.current);
      }
    };
  }, [isAutoPlaying, maxIndex, products?.length, itemsToShow]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e?.touches?.[0]?.clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e?.touches?.[0]?.clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX?.current - touchEndX?.current > 50) {
      handleNext();
    } else if (touchEndX?.current - touchStartX?.current > 50) {
      handlePrevious();
    }
  };

  const handleAddToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('sportgear_cart') || '[]');
      const existingItemIndex = existingCart?.findIndex(item => item?.id === product?.id);

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart?.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('sportgear_cart', JSON.stringify(existingCart));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!products || products?.length === 0) {
    return null;
  }

  return (
    <section id="featured-products" className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Productos Destacados
            </h2>
            <p className="text-muted-foreground">Los mejores equipos para tu entrenamiento</p>
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-fast"
              aria-label="Producto anterior"
            >
              <Icon name="ChevronLeftIcon" size={20} variant="solid" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-fast"
              aria-label="Siguiente producto"
            >
              <Icon name="ChevronRightIcon" size={20} variant="solid" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`
            }}
          >
            {products?.map((product) => (
              <div
                key={product?.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-elevation transition-all duration-fast group">
                  {/* Product Image */}
                  <Link href="/product-details" className="relative block aspect-square overflow-hidden bg-muted">
                    <img
                      src={product?.image}
                      alt={product?.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product?.badge && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-heading font-semibold">
                        {product?.badge}
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <Link href="/product-details">
                          <h3 className="font-heading font-semibold text-foreground hover:text-primary transition-colors duration-fast truncate">
                            {product?.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">{product?.category}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) => (
                        <Icon
                          key={i}
                          name="StarIcon"
                          size={14}
                          variant="solid"
                          className={i < Math.floor(product?.rating) ? 'text-secondary' : 'text-muted'}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product?.rating})</span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-2xl font-heading font-bold text-primary">
                          L {product?.price?.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-fast shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        aria-label={`Agregar ${product?.name} al carrito`}
                      >
                        <Icon name="ShoppingCartIcon" size={20} variant="solid" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {[...Array(maxIndex + 1)]?.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all duration-fast ${
                index === currentIndex
                  ? 'w-8 bg-primary' :'w-2 bg-muted hover:bg-muted-foreground/50'
              }`}
              aria-label={`Ir a la página ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/product-catalog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-fast font-heading font-semibold"
          >
            <span>Ver Todos los Productos</span>
            <Icon name="ArrowRightIcon" size={20} variant="solid" />
          </Link>
        </div>
      </div>
    </section>
  );
}

FeaturedProductsCarousel.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      category: PropTypes?.string?.isRequired,
      badge: PropTypes?.string,
      rating: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
};