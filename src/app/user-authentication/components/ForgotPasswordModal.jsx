'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('El correo electrónico es requerido');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
      setError('Ingrese un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-elevation max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Recuperar Contraseña
            </h2>
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-fast"
              aria-label="Cerrar modal"
            >
              <Icon name="XMarkIcon" size={20} variant="outline" />
            </button>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-4 bg-accent/10 border border-accent rounded-lg flex items-start space-x-3">
                <Icon name="InformationCircleIcon" size={20} variant="solid" className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Ingrese su correo electrónico y le enviaremos instrucciones para restablecer su contraseña.
                </p>
              </div>

              <div>
                <label htmlFor="forgot-email" className="block text-sm font-medium text-foreground mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="EnvelopeIcon" size={20} variant="outline" className="text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    id="forgot-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e?.target?.value);
                      setError('');
                    }}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-fast ${
                      error ? 'border-error' : 'border-input'
                    }`}
                    placeholder="ejemplo@correo.com"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1">
                    <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 px-4 border border-input rounded-lg font-heading font-semibold text-foreground hover:bg-muted transition-all duration-fast"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-heading font-semibold hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Icon name="ArrowPathIcon" size={20} variant="outline" className="animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="PaperAirplaneIcon" size={20} variant="outline" />
                      <span>Enviar</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full">
                  <Icon name="CheckCircleIcon" size={32} variant="solid" className="text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    ¡Correo Enviado!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Hemos enviado las instrucciones de recuperación a <span className="font-medium text-foreground">{email}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-accent/10 border border-accent rounded-lg">
                <p className="text-sm text-foreground">
                  Por favor revise su bandeja de entrada y siga las instrucciones para restablecer su contraseña. Si no recibe el correo en unos minutos, revise su carpeta de spam.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-heading font-semibold hover:bg-primary/90 transition-all duration-fast"
              >
                Entendido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ForgotPasswordModal.propTypes = {
  isOpen: PropTypes?.bool?.isRequired,
  onClose: PropTypes?.func?.isRequired
};