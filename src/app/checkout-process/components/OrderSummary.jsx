import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function OrderSummary({ items, subtotal, shipping, total, isMinimumMet }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-heading font-bold text-foreground mb-4">
        Resumen del Pedido
      </h2>
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-start space-x-4">
            <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <AppImage
                src={item?.image}
                alt={item?.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-heading font-semibold text-foreground truncate">
                {item?.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Cantidad: {item?.quantity}
              </p>
              <p className="text-sm font-bold text-primary mt-1">
                L {item?.price?.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Price Breakdown */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            L {subtotal?.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Envío Nacional</span>
          <span className="font-medium text-foreground">
            L {shipping?.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="text-lg font-heading font-bold text-foreground">Total</span>
          <span className="text-lg font-heading font-bold text-primary">
            L {total?.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      {/* Minimum Order Warning */}
      {!isMinimumMet && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning rounded-lg flex items-start space-x-2">
          <Icon name="ExclamationTriangleIcon" size={20} variant="solid" className="text-warning flex-shrink-0 mt-0.5" />
          <p className="text-sm text-warning-foreground">
            El pedido mínimo es de L 500.00. Faltan L {(500 - subtotal)?.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} para completar tu pedido.
          </p>
        </div>
      )}
      {/* Delivery Info */}
      <div className="mt-4 p-3 bg-accent/10 border border-accent rounded-lg flex items-start space-x-2">
        <Icon name="TruckIcon" size={20} variant="solid" className="text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          Entrega a domicilio en todo Honduras mediante servicio de mensajería en motocicleta
        </p>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  items: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      quantity: PropTypes?.number?.isRequired,
      price: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
  subtotal: PropTypes?.number?.isRequired,
  shipping: PropTypes?.number?.isRequired,
  total: PropTypes?.number?.isRequired,
  isMinimumMet: PropTypes?.bool?.isRequired,
};