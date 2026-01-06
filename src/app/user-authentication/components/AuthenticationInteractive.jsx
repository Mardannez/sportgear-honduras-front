'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordModal from './ForgotPasswordModal';
import SocialAuthButtons from './SocialAuthButtons';

export default function AuthenticationInteractive() {
  const [activeTab, setActiveTab] = useState('login');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setActiveTab('register');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  const handleForgotPassword = () => {
    setIsForgotPasswordOpen(true);
  };

  return (
    <>
      <div className="bg-card rounded-lg shadow-elevation p-6 sm:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" className="text-primary-foreground"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" className="text-secondary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary">SportGear</h1>
          </div>
          <p className="text-center text-muted-foreground">
            Acceda a su cuenta para gestionar sus pedidos y preferencias
          </p>
        </div>

        <div className="flex border-b border-border mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-4 font-heading font-semibold transition-all duration-fast relative ${
              activeTab === 'login' ?'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center justify-center space-x-2">
              <Icon name="ArrowRightOnRectangleIcon" size={20} variant="outline" />
              <span>Iniciar Sesión</span>
            </span>
            {activeTab === 'login' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 px-4 font-heading font-semibold transition-all duration-fast relative ${
              activeTab === 'register' ?'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center justify-center space-x-2">
              <Icon name="UserPlusIcon" size={20} variant="outline" />
              <span>Registrarse</span>
            </span>
            {activeTab === 'register' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        </div>

        <div className="mb-6">
          {activeTab === 'login' ? (
            <LoginForm 
              onSwitchToRegister={handleSwitchToRegister}
              onForgotPassword={handleForgotPassword}
            />
          ) : (
            <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
          )}
        </div>

        <SocialAuthButtons />
      </div>

      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </>
  );
}