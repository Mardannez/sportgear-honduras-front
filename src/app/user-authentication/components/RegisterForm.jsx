'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[^a-zA-Z\d]/?.test(password)) strength++;
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (formData?.fullName?.trim()?.length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData?.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData?.phone) {
      newErrors.phone = 'El número de teléfono es requerido';
    } else if (!/^[0-9]{8}$/?.test(formData?.phone?.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Ingrese un número de teléfono válido (8 dígitos)';
    }

    if (!formData?.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Confirme su contraseña';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'Debe aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      alert('¡Registro exitoso! Su cuenta ha sido creada. Ahora puede iniciar sesión.');
      onSwitchToLogin();
      setIsLoading(false);
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-muted';
    if (passwordStrength === 1) return 'bg-error';
    if (passwordStrength === 2) return 'bg-warning';
    if (passwordStrength === 3) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Débil';
    if (passwordStrength === 2) return 'Media';
    if (passwordStrength === 3) return 'Fuerte';
    return 'Muy Fuerte';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
          Nombre Completo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="UserIcon" size={20} variant="outline" className="text-muted-foreground" />
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData?.fullName}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-fast ${
              errors?.fullName ? 'border-error' : 'border-input'
            }`}
            placeholder="Juan Pérez"
            disabled={isLoading}
          />
        </div>
        {errors?.fullName && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.fullName}</span>
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Correo Electrónico
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="EnvelopeIcon" size={20} variant="outline" className="text-muted-foreground" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-fast ${
              errors?.email ? 'border-error' : 'border-input'
            }`}
            placeholder="ejemplo@correo.com"
            disabled={isLoading}
          />
        </div>
        {errors?.email && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.email}</span>
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Número de Teléfono
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="PhoneIcon" size={20} variant="outline" className="text-muted-foreground" />
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-fast ${
              errors?.phone ? 'border-error' : 'border-input'
            }`}
            placeholder="9999-9999"
            disabled={isLoading}
          />
        </div>
        {errors?.phone && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.phone}</span>
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="LockClosedIcon" size={20} variant="outline" className="text-muted-foreground" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-fast ${
              errors?.password ? 'border-error' : 'border-input'
            }`}
            placeholder="Mínimo 8 caracteres"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Icon 
              name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} 
              size={20} 
              variant="outline" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-fast"
            />
          </button>
        </div>
        {formData?.password && (
          <div className="mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-fast ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {getPasswordStrengthText()}
              </span>
            </div>
          </div>
        )}
        {errors?.password && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.password}</span>
          </p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
          Confirmar Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="LockClosedIcon" size={20} variant="outline" className="text-muted-foreground" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-fast ${
              errors?.confirmPassword ? 'border-error' : 'border-input'
            }`}
            placeholder="Repita su contraseña"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            <Icon 
              name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} 
              size={20} 
              variant="outline" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-fast"
            />
          </button>
        </div>
        {errors?.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.confirmPassword}</span>
          </p>
        )}
      </div>
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData?.acceptTerms}
            onChange={handleChange}
            className={`w-4 h-4 mt-1 text-primary border-input rounded focus:ring-2 focus:ring-ring ${
              errors?.acceptTerms ? 'border-error' : ''
            }`}
            disabled={isLoading}
          />
          <span className="text-sm text-foreground">
            Acepto los{' '}
            <a href="/terms" className="text-primary hover:text-primary/80 font-medium transition-colors duration-fast">
              términos y condiciones
            </a>
            {' '}y la{' '}
            <a href="/privacy" className="text-primary hover:text-primary/80 font-medium transition-colors duration-fast">
              política de privacidad
            </a>
          </span>
        </label>
        {errors?.acceptTerms && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.acceptTerms}</span>
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-heading font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <Icon name="ArrowPathIcon" size={20} variant="outline" className="animate-spin" />
            <span>Creando cuenta...</span>
          </>
        ) : (
          <>
            <Icon name="UserPlusIcon" size={20} variant="outline" />
            <span>Crear Cuenta</span>
          </>
        )}
      </button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tiene una cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-fast"
            disabled={isLoading}
          >
            Inicie sesión aquí
          </button>
        </p>
      </div>
    </form>
  );
}

RegisterForm.propTypes = {
  onSwitchToLogin: PropTypes?.func?.isRequired
};