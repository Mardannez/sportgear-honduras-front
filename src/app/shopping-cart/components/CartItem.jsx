'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item?.stock) return;
    
    setIsUpdating(true);
    await onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    setShowRemoveConfirm(true);
  };

  const confirmRemove = async () => {
    setIsUpdating(true);
    await onRemove(item?.id);
    setShowRemoveConfirm(false);
  };

  const cancelRemove = () => {
    setShowRemoveConfirm(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
      minimumFractionDigits: 2
    })?.format(price)?.replace('HNL', 'L');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-fast">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-muted rounded-lg overflow-hidden">
          <AppImage
            src={item?.image}
            alt={item?.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground text-base sm:text-lg line-clamp-2">
                {item?.name}
              </h3>
              {item?.variant && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item?.variant}
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                SKU: {item?.sku}
              </p>
            </div>

            {/* Remove Button - Desktop */}
            <button
              onClick={handleRemove}
              disabled={isUpdating}
              className="hidden sm:flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-error hover:bg-error/10 rounded-lg transition-colors duration-fast disabled:opacity-50"
              aria-label="Eliminar producto"
            >
              <Icon name="TrashIcon" size={20} variant="outline" />
            </button>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Cantidad:</span>
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item?.quantity - 1)}
                  disabled={item?.quantity <= 1 || isUpdating}
                  className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-fast"
                  aria-label="Disminuir cantidad"
                >
                  <Icon name="MinusIcon" size={16} variant="solid" />
                </button>
                <span className="w-12 text-center font-medium text-foreground">
                  {item?.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item?.quantity + 1)}
                  disabled={item?.quantity >= item?.stock || isUpdating}
                  className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-fast"
                  aria-label="Aumentar cantidad"
                >
                  <Icon name="PlusIcon" size={16} variant="solid" />
                </button>
              </div>
              {item?.quantity >= item?.stock && (
                <span className="text-xs text-warning">Máximo disponible</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Precio unitario:</p>
                <p className="font-heading font-semibold text-foreground">
                  {formatPrice(item?.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Subtotal:</p>
                <p className="font-heading font-bold text-primary text-lg">
                  {formatPrice(item?.price * item?.quantity)}
                </p>
              </div>
            </div>
          </div>

          {/* Remove Button - Mobile */}
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="sm:hidden flex items-center justify-center gap-2 w-full mt-3 py-2 text-error hover:bg-error/10 rounded-lg transition-colors duration-fast disabled:opacity-50"
          >
            <Icon name="TrashIcon" size={18} variant="outline" />
            <span className="text-sm font-medium">Eliminar producto</span>
          </button>
        </div>
      </div>
      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-elevation max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="ExclamationTriangleIcon" size={24} variant="solid" className="text-error" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-foreground text-lg">
                  ¿Eliminar producto?
                </h3>
                <p className="text-muted-foreground mt-2">
                  ¿Estás seguro de que deseas eliminar "{item?.name}" de tu carrito?
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelRemove}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-fast font-heading font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRemove}
                className="flex-1 px-4 py-2 bg-error text-error-foreground rounded-lg hover:bg-error/90 transition-colors duration-fast font-heading font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    imageAlt: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    quantity: PropTypes?.number?.isRequired,
    stock: PropTypes?.number?.isRequired,
    sku: PropTypes?.string?.isRequired,
    variant: PropTypes?.string
  })?.isRequired,
  onUpdateQuantity: PropTypes?.func?.isRequired,
  onRemove: PropTypes?.func?.isRequired
};