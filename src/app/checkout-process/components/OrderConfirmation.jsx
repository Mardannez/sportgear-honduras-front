'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function OrderConfirmation({ formData, onFormChange, errors, onSubmit, isSubmitting }) {
  const handleCheckboxChange = (e) => {
    onFormChange('acceptTerms', e?.target?.checked);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">
          Confirmación del Pedido
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Revisa y confirma tu pedido antes de finalizar
        </p>
      </div>
      {/* Terms and Conditions */}
      <div className="p-4 border border-border rounded-lg">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={formData?.acceptTerms}
            onChange={handleCheckboxChange}
            className={`mt-1 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring ${
              errors?.acceptTerms ? 'border-error' : ''
            }`}
          />
          <div className="flex-1">
            <label htmlFor="acceptTerms" className="text-sm text-foreground cursor-pointer">
              Acepto los{' '}
              <a href="/terms" target="_blank" className="text-primary hover:underline font-medium">
                términos y condiciones
              </a>{' '}
              y la{' '}
              <a href="/privacy" target="_blank" className="text-primary hover:underline font-medium">
                política de privacidad
              </a>{' '}
              de SportGear Honduras <span className="text-error">*</span>
            </label>
          </div>
        </div>
        {errors?.acceptTerms && (
          <p className="mt-2 text-sm text-error flex items-center space-x-1 ml-7">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.acceptTerms}</span>
          </p>
        )}
      </div>
      {/* Order Summary Info */}
      <div className="space-y-3">
        <div className="p-4 bg-accent/10 border border-accent rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="ShoppingBagIcon" size={20} variant="solid" className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground mb-1">
                Confirmación de Pedido
              </h3>
              <p className="text-xs text-muted-foreground">
                Recibirás un correo electrónico con los detalles de tu pedido y el número de seguimiento una vez confirmado.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/10 border border-primary rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="TruckIcon" size={20} variant="solid" className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground mb-1">
                Tiempo de Entrega
              </h3>
              <p className="text-xs text-muted-foreground">
                Tu pedido será entregado en 1-3 días hábiles en ciudades principales y 3-7 días en zonas rurales.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-success/10 border border-success rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="ChatBubbleLeftRightIcon" size={20} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-heading font-semibold text-foreground mb-1">
                Soporte al Cliente
              </h3>
              <p className="text-xs text-muted-foreground">
                ¿Necesitas ayuda? Contáctanos por WhatsApp al +504 1234-5678 o visita nuestra página de soporte.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-heading font-semibold hover:bg-primary/90 transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <Icon name="ArrowPathIcon" size={20} variant="outline" className="animate-spin" />
            <span>Procesando...</span>
          </>
        ) : (
          <>
            <Icon name="CheckCircleIcon" size={20} variant="solid" />
            <span>Confirmar Pedido</span>
          </>
        )}
      </button>
      <p className="text-xs text-center text-muted-foreground">
        Al confirmar tu pedido, aceptas que SportGear Honduras procesará tu información de acuerdo con nuestra política de privacidad.
      </p>
    </div>
  );
}

OrderConfirmation.propTypes = {
  formData: PropTypes?.shape({
    acceptTerms: PropTypes?.bool?.isRequired,
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  errors: PropTypes?.object?.isRequired,
  onSubmit: PropTypes?.func?.isRequired,
  isSubmitting: PropTypes?.bool?.isRequired,
};