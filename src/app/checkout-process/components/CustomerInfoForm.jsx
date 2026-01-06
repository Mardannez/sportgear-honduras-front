'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function CustomerInfoForm({ formData, onFormChange, errors }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    onFormChange(name, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">
          Información del Cliente
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Completa tus datos para procesar el pedido
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
            Nombre <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData?.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${
              errors?.firstName ? 'border-error' : 'border-input'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
            placeholder="Juan"
          />
          {errors?.firstName && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.firstName}</span>
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
            Apellido <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border ${
              errors?.lastName ? 'border-error' : 'border-input'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
            placeholder="Pérez"
          />
          {errors?.lastName && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.lastName}</span>
            </p>
          )}
        </div>
      </div>
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Correo Electrónico <span className="text-error">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${
            errors?.email ? 'border-error' : 'border-input'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
          placeholder="juan.perez@ejemplo.com"
        />
        {errors?.email && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.email}</span>
          </p>
        )}
      </div>
      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Teléfono <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground">+504</span>
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            className={`w-full pl-16 pr-4 py-2 border ${
              errors?.phone ? 'border-error' : 'border-input'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
            placeholder="9999-9999"
          />
        </div>
        {errors?.phone && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.phone}</span>
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Formato: 9999-9999 (8 dígitos)
        </p>
      </div>
      {/* Identity Document */}
      <div>
        <label htmlFor="identityDocument" className="block text-sm font-medium text-foreground mb-2">
          Número de Identidad <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="identityDocument"
          name="identityDocument"
          value={formData?.identityDocument}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border ${
            errors?.identityDocument ? 'border-error' : 'border-input'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
          placeholder="0801-1990-12345"
        />
        {errors?.identityDocument && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.identityDocument}</span>
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          Formato: 0801-1990-12345 (13 dígitos con guiones)
        </p>
      </div>
      {/* Create Account Option */}
      <div className="p-4 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="createAccount"
            name="createAccount"
            checked={formData?.createAccount}
            onChange={(e) => onFormChange('createAccount', e?.target?.checked)}
            className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
          />
          <div className="flex-1">
            <label htmlFor="createAccount" className="text-sm font-medium text-foreground cursor-pointer">
              Crear una cuenta para futuras compras
            </label>
            <p className="text-xs text-muted-foreground mt-1">
              Guarda tu información para compras más rápidas
            </p>
          </div>
        </div>

        {formData?.createAccount && (
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Contraseña <span className="text-error">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData?.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 pr-10 border ${
                  errors?.password ? 'border-error' : 'border-input'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground`}
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                <Icon
                  name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                  size={20}
                  variant="outline"
                />
              </button>
            </div>
            {errors?.password && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                <span>{errors?.password}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

CustomerInfoForm.propTypes = {
  formData: PropTypes?.shape({
    firstName: PropTypes?.string?.isRequired,
    lastName: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
    phone: PropTypes?.string?.isRequired,
    identityDocument: PropTypes?.string?.isRequired,
    createAccount: PropTypes?.bool?.isRequired,
    password: PropTypes?.string?.isRequired,
  })?.isRequired,
  onFormChange: PropTypes?.func?.isRequired,
  errors: PropTypes?.object?.isRequired,
};