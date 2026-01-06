'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';


export default function PaymentMethodForm({ formData, onFormChange, errors }) {
  const handlePaymentMethodChange = (method) => {
    onFormChange('paymentMethod', method);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onFormChange(name, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">
          Método de Pago
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Selecciona tu método de pago preferido
        </p>
      </div>
      {/* Payment Method Selection */}
      <div className="space-y-4">
        {/* Cash on Delivery */}
        <div
          onClick={() => handlePaymentMethodChange('cash')}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-fast ${
            formData?.paymentMethod === 'cash' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData?.paymentMethod === 'cash' ?'border-primary bg-primary' :'border-input'
                }`}
              >
                {formData?.paymentMethod === 'cash' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BanknotesIcon" size={24} variant="outline" className="text-primary" />
                <h3 className="text-base font-heading font-semibold text-foreground">
                  Pago Contra Entrega
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Paga en efectivo cuando recibas tu pedido. Asegúrate de tener el monto exacto.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Transfer */}
        <div
          onClick={() => handlePaymentMethodChange('transfer')}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-fast ${
            formData?.paymentMethod === 'transfer' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData?.paymentMethod === 'transfer' ?'border-primary bg-primary' :'border-input'
                }`}
              >
                {formData?.paymentMethod === 'transfer' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BuildingLibraryIcon" size={24} variant="outline" className="text-primary" />
                <h3 className="text-base font-heading font-semibold text-foreground">
                  Transferencia Bancaria
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Realiza una transferencia a nuestra cuenta bancaria y envía el comprobante.
              </p>
            </div>
          </div>
        </div>
      </div>
      {errors?.paymentMethod && (
        <p className="text-sm text-error flex items-center space-x-1">
          <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
          <span>{errors?.paymentMethod}</span>
        </p>
      )}
      {/* Bank Transfer Details */}
      {formData?.paymentMethod === 'transfer' && (
        <div className="space-y-4 p-4 bg-muted/50 border border-border rounded-lg">
          <h3 className="text-sm font-heading font-semibold text-foreground">
            Información de Transferencia
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Banco:</span>
              <span className="font-medium text-foreground">Banco Atlántida</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nombre:</span>
              <span className="font-medium text-foreground">SportGear Honduras S.A.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cuenta:</span>
              <span className="font-medium text-foreground font-mono">1234-5678-9012-3456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo:</span>
              <span className="font-medium text-foreground">Cuenta de Ahorros</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <label htmlFor="transferReference" className="block text-sm font-medium text-foreground mb-2">
              Número de Referencia de Transferencia <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="transferReference"
              name="transferReference"
              value={formData?.transferReference}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border ${
                errors?.transferReference ? 'border-error' : 'border-input'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
              placeholder="Ej: ATL123456789"
            />
            {errors?.transferReference && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                <span>{errors?.transferReference}</span>
              </p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              Ingresa el número de referencia que aparece en tu comprobante de transferencia
            </p>
          </div>

          <div className="p-3 bg-accent/10 border border-accent rounded-lg flex items-start space-x-2">
            <Icon name="InformationCircleIcon" size={20} variant="solid" className="text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground">
              Tu pedido será procesado una vez verifiquemos la transferencia. Esto puede tomar hasta 24 horas hábiles.
            </p>
          </div>
        </div>
      )}
      {/* Cash on Delivery Info */}
      {formData?.paymentMethod === 'cash' && (
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="InformationCircleIcon" size={20} variant="solid" className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground mb-1">
                Instrucciones de Pago
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Prepara el monto exacto en efectivo</li>
                <li>El repartidor te entregará tu pedido y recibirá el pago</li>
                <li>Recibirás un recibo de compra al momento de la entrega</li>
                <li>Verifica tu pedido antes de realizar el pago</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

PaymentMethodForm.propTypes = {
  formData: PropTypes?.shape({
    paymentMethod: PropTypes?.string?.isRequired,
    transferReference: PropTypes?.string?.isRequired,
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  errors: PropTypes?.object?.isRequired,
};