'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ProductInfo({ product, onAddToCart, onAddToWishlist }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
      minimumFractionDigits: 2,
    })?.format(price);
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={20}
                variant={index < Math.floor(product?.rating) ? 'solid' : 'outline'}
                className={index < Math.floor(product?.rating) ? 'text-warning' : 'text-muted'}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.rating} ({product?.reviewCount} reseñas)
          </span>
        </div>
      </div>
      {/* Price and Availability */}
      <div className="border-t border-b border-border py-4">
        <div className="flex items-baseline space-x-3 mb-2">
          <span className="text-4xl font-heading font-bold text-primary">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && (
            <span className="text-xl text-muted-foreground line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Icon
            name={product?.inStock ? 'CheckCircleIcon' : 'XCircleIcon'}
            size={20}
            variant="solid"
            className={product?.inStock ? 'text-success' : 'text-error'}
          />
          <span className={`text-sm font-medium ${product?.inStock ? 'text-success' : 'text-error'}`}>
            {product?.inStock ? `En stock (${product?.stock} disponibles)` : 'Agotado'}
          </span>
        </div>
      </div>
      {/* Product Description */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-foreground mb-2">
          Descripción
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {product?.description}
        </p>
      </div>
      {/* Size Selection */}
      {product?.sizes && product?.sizes?.length > 0 && (
        <div>
          <h3 className="text-sm font-heading font-semibold text-foreground mb-3">
            Talla
          </h3>
          <div className="flex flex-wrap gap-2">
            {product?.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-fast font-medium ${
                  selectedSize === size
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-muted-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Color Selection */}
      {product?.colors && product?.colors?.length > 0 && (
        <div>
          <h3 className="text-sm font-heading font-semibold text-foreground mb-3">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {product?.colors?.map((color) => (
              <button
                key={color?.name}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-lg border-2 transition-all duration-fast font-medium ${
                  selectedColor?.name === color?.name
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-muted-foreground'
                }`}
              >
                {color?.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-heading font-semibold text-foreground mb-3">
          Cantidad
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-fast"
              aria-label="Disminuir cantidad"
            >
              <Icon name="MinusIcon" size={20} variant="solid" />
            </button>
            <span className="w-12 text-center font-heading font-semibold text-foreground">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product?.stock}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-fast"
              aria-label="Aumentar cantidad"
            >
              <Icon name="PlusIcon" size={20} variant="solid" />
            </button>
          </div>
          <span className="text-sm text-muted-foreground">
            Máximo: {product?.stock} unidades
          </span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!product?.inStock}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-fast font-heading font-semibold"
        >
          <Icon name="ShoppingCartIcon" size={20} variant="solid" />
          <span>Agregar al Carrito</span>
        </button>
        <button
          onClick={onAddToWishlist}
          className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-border bg-card text-foreground rounded-lg hover:border-primary hover:text-primary transition-all duration-fast font-heading font-semibold"
          aria-label="Agregar a lista de deseos"
        >
          <Icon name="HeartIcon" size={20} variant="outline" />
          <span className="hidden sm:inline">Lista de Deseos</span>
        </button>
      </div>
      {/* Product Features */}
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Características
        </h3>
        <ul className="space-y-3">
          {product?.features?.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Icon name="CheckIcon" size={20} variant="solid" className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Shipping Info */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="flex items-start space-x-3">
          <Icon name="TruckIcon" size={20} variant="outline" className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-heading font-semibold text-foreground">Envío a Domicilio</p>
            <p className="text-sm text-muted-foreground">Entrega en todo Honduras</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Icon name="CreditCardIcon" size={20} variant="outline" className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-heading font-semibold text-foreground">Pago Seguro</p>
            <p className="text-sm text-muted-foreground">Efectivo o transferencia bancaria</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    rating: PropTypes?.number?.isRequired,
    reviewCount: PropTypes?.number?.isRequired,
    description: PropTypes?.string?.isRequired,
    inStock: PropTypes?.bool?.isRequired,
    stock: PropTypes?.number?.isRequired,
    sizes: PropTypes?.arrayOf(PropTypes?.string),
    colors: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
      })
    ),
    features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  })?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
  onAddToWishlist: PropTypes?.func?.isRequired,
};