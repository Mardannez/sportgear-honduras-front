'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function LoginForm({ onSwitchToRegister, onForgotPassword }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData?.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
      const mockEmail = 'cliente@sportgear.hn';
      const mockPassword = 'SportGear2025';

      if (formData?.email === mockEmail && formData?.password === mockPassword) {
        alert('¡Inicio de sesión exitoso! Bienvenido a SportGear Honduras');
        window.location.href = '/product-catalog';
      } else {
        setErrors({
          submit: `Credenciales incorrectas. Use: ${mockEmail} / ${mockPassword}`
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.submit && (
        <div className="p-4 bg-error/10 border border-error rounded-lg flex items-start space-x-3">
          <Icon name="ExclamationCircleIcon" size={20} variant="solid" className="text-error flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{errors?.submit}</p>
        </div>
      )}
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
            placeholder="Ingrese su contraseña"
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
        {errors?.password && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.password}</span>
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
          <span className="text-sm text-foreground">Recordarme</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-fast"
          disabled={isLoading}
        >
          ¿Olvidó su contraseña?
        </button>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-heading font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <Icon name="ArrowPathIcon" size={20} variant="outline" className="animate-spin" />
            <span>Iniciando sesión...</span>
          </>
        ) : (
          <>
            <Icon name="ArrowRightOnRectangleIcon" size={20} variant="outline" />
            <span>Iniciar Sesión</span>
          </>
        )}
      </button>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          ¿No tiene una cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-fast"
            disabled={isLoading}
          >
            Regístrese aquí
          </button>
        </p>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onSwitchToRegister: PropTypes?.func?.isRequired,
  onForgotPassword: PropTypes?.func?.isRequired
};