'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function OrderSummary({ subtotal, onApplyPromoCode, onCalculateShipping }) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const [shippingCity, setShippingCity] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const MINIMUM_ORDER = 500;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
      minimumFractionDigits: 2
    })?.format(price)?.replace('HNL', 'L');
  };

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) {
      setPromoError('Por favor ingresa un código promocional');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const validPromoCodes = {
      'DEPORTES10': { type: 'percentage', value: 10, description: '10% de descuento' },
      'FITNESS15': { type: 'percentage', value: 15, description: '15% de descuento' },
      'BIENVENIDO': { type: 'fixed', value: 100, description: 'L 100.00 de descuento' }
    };

    const promo = validPromoCodes?.[promoCode?.toUpperCase()];

    if (promo) {
      const discountAmount = promo?.type === 'percentage' 
        ? subtotal * (promo?.value / 100)
        : promo?.value;
      
      setDiscount(discountAmount);
      setPromoSuccess(`¡Código aplicado! ${promo?.description}`);
      onApplyPromoCode(promoCode, discountAmount);
    } else {
      setPromoError('Código promocional inválido');
      setDiscount(0);
    }

    setIsApplyingPromo(false);
  };

  const handleCalculateShipping = async () => {
    if (!shippingCity?.trim()) {
      return;
    }

    setIsCalculatingShipping(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));

    const shippingRates = {
      'tegucigalpa': 50,
      'san pedro sula': 75,
      'la ceiba': 100,
      'choluteca': 90,
      'comayagua': 60
    };

    const cost = shippingRates?.[shippingCity?.toLowerCase()] || 80;
    setShippingCost(cost);
    onCalculateShipping(cost);
    setIsCalculatingShipping(false);
  };

  const total = subtotal - discount + shippingCost;
  const canCheckout = total >= MINIMUM_ORDER;

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
      <h2 className="font-heading font-bold text-foreground text-xl mb-6">
        Resumen del Pedido
      </h2>
      {/* Promo Code Section */}
      <div className="mb-6">
        <label htmlFor="promoCode" className="block text-sm font-medium text-foreground mb-2">
          Código Promocional
        </label>
        <div className="flex gap-2">
          <input
            id="promoCode"
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e?.target?.value)}
            placeholder="Ingresa tu código"
            className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
          />
          <button
            onClick={handleApplyPromoCode}
            disabled={isApplyingPromo}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-fast font-heading font-medium disabled:opacity-50"
          >
            {isApplyingPromo ? 'Aplicando...' : 'Aplicar'}
          </button>
        </div>
        {promoError && (
          <p className="text-error text-sm mt-2 flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="text-success text-sm mt-2 flex items-center gap-1">
            <Icon name="CheckCircleIcon" size={16} variant="solid" />
            {promoSuccess}
          </p>
        )}
      </div>
      {/* Shipping Calculator */}
      <div className="mb-6 pb-6 border-b border-border">
        <label htmlFor="shippingCity" className="block text-sm font-medium text-foreground mb-2">
          Calcular Envío
        </label>
        <div className="flex gap-2">
          <select
            id="shippingCity"
            value={shippingCity}
            onChange={(e) => setShippingCity(e?.target?.value)}
            className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground bg-background"
          >
            <option value="">Selecciona tu ciudad</option>
            <option value="tegucigalpa">Tegucigalpa</option>
            <option value="san pedro sula">San Pedro Sula</option>
            <option value="la ceiba">La Ceiba</option>
            <option value="choluteca">Choluteca</option>
            <option value="comayagua">Comayagua</option>
          </select>
          <button
            onClick={handleCalculateShipping}
            disabled={!shippingCity || isCalculatingShipping}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-fast font-heading font-medium disabled:opacity-50"
          >
            {isCalculatingShipping ? 'Calculando...' : 'Calcular'}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Icon name="TruckIcon" size={14} variant="outline" />
          Entrega a domicilio en motocicleta
        </p>
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-foreground">
          <span>Subtotal:</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Descuento:</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}

        {shippingCost > 0 && (
          <div className="flex justify-between text-foreground">
            <span>Envío:</span>
            <span className="font-medium">{formatPrice(shippingCost)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-heading font-bold text-foreground text-lg">Total:</span>
            <span className="font-heading font-bold text-primary text-2xl">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
      {/* Minimum Order Warning */}
      {!canCheckout && (
        <div className="mb-4 p-3 bg-warning/10 border border-warning rounded-lg">
          <p className="text-warning text-sm flex items-start gap-2">
            <Icon name="ExclamationTriangleIcon" size={16} variant="solid" className="flex-shrink-0 mt-0.5" />
            <span>
              Pedido mínimo: {formatPrice(MINIMUM_ORDER)}. Faltan {formatPrice(MINIMUM_ORDER - total)} para continuar.
            </span>
          </p>
        </div>
      )}
      {/* Checkout Button */}
      <Link
        href={canCheckout ? "/checkout-process" : "#"}
        className={`block w-full py-3 rounded-lg text-center font-heading font-bold transition-all duration-fast ${
          canCheckout
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
        onClick={(e) => !canCheckout && e?.preventDefault()}
      >
        {canCheckout ? 'Proceder al Pago' : 'Pedido Mínimo No Alcanzado'}
      </Link>
      {/* Continue Shopping */}
      <Link
        href="/product-catalog"
        className="block w-full mt-3 py-3 border border-border text-foreground rounded-lg text-center font-heading font-medium hover:bg-muted transition-colors duration-fast"
      >
        Continuar Comprando
      </Link>
      {/* Payment Methods Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm font-medium text-foreground mb-3">Métodos de Pago:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="BanknotesIcon" size={16} variant="outline" />
            <span>Efectivo contra entrega</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="BuildingLibraryIcon" size={16} variant="outline" />
            <span>Transferencia bancaria</span>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  subtotal: PropTypes?.number?.isRequired,
  onApplyPromoCode: PropTypes?.func?.isRequired,
  onCalculateShipping: PropTypes?.func?.isRequired
};