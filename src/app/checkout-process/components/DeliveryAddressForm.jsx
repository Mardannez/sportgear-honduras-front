'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function DeliveryAddressForm({ formData, onFormChange, errors }) {
  const departments = [
    'Atlántida',
    'Choluteca',
    'Colón',
    'Comayagua',
    'Copán',
    'Cortés',
    'El Paraíso',
    'Francisco Morazán',
    'Gracias a Dios',
    'Intibucá',
    'Islas de la Bahía',
    'La Paz',
    'Lempira',
    'Ocotepeque',
    'Olancho',
    'Santa Bárbara',
    'Valle',
    'Yoro',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onFormChange(name, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">
          Dirección de Entrega
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Proporciona la dirección completa para la entrega a domicilio
        </p>
      </div>
      {/* Department */}
      <div>
        <label htmlFor="department" className="block text-sm font-medium text-foreground mb-2">
          Departamento <span className="text-error">*</span>
        </label>
        <select
          id="department"
          name="department"
          value={formData?.department}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${
            errors?.department ? 'border-error' : 'border-input'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
        >
          <option value="">Selecciona un departamento</option>
          {departments?.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors?.department && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.department}</span>
          </p>
        )}
      </div>
      {/* Municipality */}
      <div>
        <label htmlFor="municipality" className="block text-sm font-medium text-foreground mb-2">
          Municipio <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="municipality"
          name="municipality"
          value={formData?.municipality}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${
            errors?.municipality ? 'border-error' : 'border-input'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
          placeholder="Ej: Tegucigalpa, San Pedro Sula"
        />
        {errors?.municipality && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.municipality}</span>
          </p>
        )}
      </div>
      {/* Street Address */}
      <div>
        <label htmlFor="streetAddress" className="block text-sm font-medium text-foreground mb-2">
          Dirección Completa <span className="text-error">*</span>
        </label>
        <textarea
          id="streetAddress"
          name="streetAddress"
          value={formData?.streetAddress}
          onChange={handleInputChange}
          rows={3}
          className={`w-full px-4 py-2 border ${
            errors?.streetAddress ? 'border-error' : 'border-input'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground resize-none`}
          placeholder="Colonia, calle, número de casa, referencias"
        />
        {errors?.streetAddress && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.streetAddress}</span>
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Incluye referencias como edificios cercanos, colores de casa, etc.
        </p>
      </div>
      {/* Additional References */}
      <div>
        <label htmlFor="additionalReferences" className="block text-sm font-medium text-foreground mb-2">
          Referencias Adicionales (Opcional)
        </label>
        <textarea
          id="additionalReferences"
          name="additionalReferences"
          value={formData?.additionalReferences}
          onChange={handleInputChange}
          rows={2}
          className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground resize-none"
          placeholder="Información adicional para el repartidor"
        />
      </div>
      {/* Delivery Instructions */}
      <div className="p-4 bg-accent/10 border border-accent rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} variant="solid" className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-heading font-semibold text-foreground mb-1">
              Instrucciones de Entrega
            </h3>
            <p className="text-xs text-muted-foreground">
              Nuestro servicio de mensajería en motocicleta entrega en todo Honduras. El tiempo de entrega varía según la ubicación (1-3 días hábiles en ciudades principales, 3-7 días en zonas rurales).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

DeliveryAddressForm.propTypes = {
  formData: PropTypes?.shape({
    department: PropTypes?.string?.isRequired,
    municipality: PropTypes?.string?.isRequired,
    streetAddress: PropTypes?.string?.isRequired,
    additionalReferences: PropTypes?.string?.isRequired,
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  errors: PropTypes?.object?.isRequired,
};