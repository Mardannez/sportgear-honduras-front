'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import ProgressIndicator from './ProgressIndicator';
import CustomerInfoForm from './CustomerInfoForm';
import DeliveryAddressForm from './DeliveryAddressForm';
import PaymentMethodForm from './PaymentMethodForm';
import OrderConfirmation from './OrderConfirmation';
import OrderSummary from './OrderSummary';

export default function CheckoutInteractive({ initialCartData }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const steps = [
    { id: 1, label: 'Información' },
    { id: 2, label: 'Dirección' },
    { id: 3, label: 'Pago' },
    { id: 4, label: 'Confirmación' },
  ];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identityDocument: '',
    createAccount: false,
    password: '',
    department: '',
    municipality: '',
    streetAddress: '',
    additionalReferences: '',
    paymentMethod: '',
    transferReference: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  const cartItems = initialCartData?.items;
  const subtotal = initialCartData?.subtotal;
  const shipping = initialCartData?.shipping;
  const total = subtotal + shipping;
  const isMinimumMet = subtotal >= 500;

  useEffect(() => {
    if (!isMinimumMet && currentStep > 1) {
      setCurrentStep(1);
    }
  }, [isMinimumMet, currentStep]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.firstName?.trim()) {
        newErrors.firstName = 'El nombre es requerido';
      }
      if (!formData?.lastName?.trim()) {
        newErrors.lastName = 'El apellido es requerido';
      }
      if (!formData?.email?.trim()) {
        newErrors.email = 'El correo electrónico es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = 'Correo electrónico inválido';
      }
      if (!formData?.phone?.trim()) {
        newErrors.phone = 'El teléfono es requerido';
      } else if (!/^\d{4}-?\d{4}$/?.test(formData?.phone)) {
        newErrors.phone = 'Formato inválido (9999-9999)';
      }
      if (!formData?.identityDocument?.trim()) {
        newErrors.identityDocument = 'El número de identidad es requerido';
      } else if (!/^\d{4}-\d{4}-\d{5}$/?.test(formData?.identityDocument)) {
        newErrors.identityDocument = 'Formato inválido (0801-1990-12345)';
      }
      if (formData?.createAccount && !formData?.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (formData?.createAccount && formData?.password?.length < 8) {
        newErrors.password = 'Mínimo 8 caracteres';
      }
    }

    if (step === 2) {
      if (!formData?.department) {
        newErrors.department = 'Selecciona un departamento';
      }
      if (!formData?.municipality?.trim()) {
        newErrors.municipality = 'El municipio es requerido';
      }
      if (!formData?.streetAddress?.trim()) {
        newErrors.streetAddress = 'La dirección es requerida';
      }
    }

    if (step === 3) {
      if (!formData?.paymentMethod) {
        newErrors.paymentMethod = 'Selecciona un método de pago';
      }
      if (formData?.paymentMethod === 'transfer' && !formData?.transferReference?.trim()) {
        newErrors.transferReference = 'El número de referencia es requerido';
      }
    }

    if (step === 4) {
      if (!formData?.acceptTerms) {
        newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (!isMinimumMet) {
      return;
    }

    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps?.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderNumber = `SPG${Date.now()?.toString()?.slice(-8)}`;
      
      router?.push(`/order-confirmation?orderNumber=${orderNumber}`);
    } catch (error) {
      setErrors({ submit: 'Error al procesar el pedido. Por favor, intenta de nuevo.' });
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CustomerInfoForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <DeliveryAddressForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <PaymentMethodForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <OrderConfirmation
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <ProgressIndicator currentStep={currentStep} steps={steps} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              {renderStepContent()}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Icon name="ChevronLeftIcon" size={20} variant="outline" />
                    <span>Atrás</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!isMinimumMet}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-heading font-semibold hover:bg-primary/90 transition-all duration-fast disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <span>Continuar</span>
                    <Icon name="ChevronRightIcon" size={20} variant="outline" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                isMinimumMet={isMinimumMet}
              />
            </div>
          </div>
        </div>

        {/* Mobile Order Summary Toggle */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevation z-50">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingBagIcon" size={20} variant="outline" />
              <span className="font-heading font-semibold text-foreground">
                Total: L {total?.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <Icon
              name="ChevronUpIcon"
              size={20}
              variant="solid"
              className={`transition-transform duration-fast ${showOrderSummary ? '' : 'rotate-180'}`}
            />
          </button>

          {showOrderSummary && (
            <div className="px-4 pb-4 max-h-[60vh] overflow-y-auto">
              <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                isMinimumMet={isMinimumMet}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CheckoutInteractive.propTypes = {
  initialCartData: PropTypes?.shape({
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
  })?.isRequired,
};