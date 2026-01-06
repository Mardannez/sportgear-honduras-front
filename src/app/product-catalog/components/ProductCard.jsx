'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ProductCard({ product, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setShowQuantity(true);
  };

  const handleConfirmAdd = () => {
    setIsAdding(true);
    onAddToCart(product?.id, quantity);
    
    setTimeout(() => {
      setIsAdding(false);
      setShowQuantity(false);
      setQuantity(1);
    }, 1000);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + delta));
    setQuantity(newQuantity);
  };

  const formatPrice = (price) => {
    return `L ${price?.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation transition-all duration-fast group">
      <Link href="/product-details" className="block">
        <div className="relative h-64 overflow-hidden bg-muted">
          <AppImage
            src={product?.image}
            alt={product?.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product?.inStock && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="bg-error text-error-foreground px-4 py-2 rounded-lg font-heading font-semibold">
                Agotado
              </span>
            </div>
          )}
          {product?.discount > 0 && (
            <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-lg font-heading font-bold text-sm">
              -{product?.discount}%
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href="/product-details">
          <p className="text-xs text-muted-foreground font-body mb-1">{product?.category}</p>
          <h3 className="text-base font-heading font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors duration-fast">
            {product?.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <div>
            {product?.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-heading font-bold text-primary">
                  {formatPrice(product?.price * (1 - product?.discount / 100))}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product?.price)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-heading font-bold text-primary">
                {formatPrice(product?.price)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Icon name="StarIcon" size={16} variant="solid" className="text-warning" />
            <span className="text-sm font-body text-foreground">{product?.rating}</span>
          </div>
        </div>

        {product?.inStock ? (
          <>
            {!showQuantity ? (
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-fast font-heading font-medium"
              >
                <Icon name="ShoppingCartIcon" size={20} variant="outline" />
                <span>Agregar al Carrito</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-muted rounded-lg p-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-card hover:bg-border transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Disminuir cantidad"
                  >
                    <Icon name="MinusIcon" size={16} variant="solid" />
                  </button>
                  <span className="font-heading font-semibold text-foreground">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-card hover:bg-border transition-colors duration-fast disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Aumentar cantidad"
                  >
                    <Icon name="PlusIcon" size={16} variant="solid" />
                  </button>
                </div>
                <button
                  onClick={handleConfirmAdd}
                  disabled={isAdding}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-all duration-fast font-heading font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAdding ? (
                    <>
                      <Icon name="CheckIcon" size={20} variant="solid" />
                      <span>¡Agregado!</span>
                    </>
                  ) : (
                    <span>Confirmar</span>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            disabled
            className="w-full px-4 py-2.5 bg-muted text-muted-foreground rounded-lg cursor-not-allowed font-heading font-medium"
          >
            No Disponible
          </button>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    discount: PropTypes?.number?.isRequired,
    rating: PropTypes?.number?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    inStock: PropTypes?.bool?.isRequired,
  })?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
};