'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ContactForm({ categories }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{8}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono debe tener 8 dígitos';
    }

    if (!formData?.category) {
      newErrors.category = 'Selecciona una categoría';
    }

    if (!formData?.subject?.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData?.message?.trim()?.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="bg-card border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name="EnvelopeIcon" size={24} variant="outline" className="text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Formulario de Contacto
          </h2>
          <p className="text-sm text-muted-foreground">
            Completa el formulario y te responderemos pronto
          </p>
        </div>
      </div>
      {submitSuccess && (
        <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start space-x-3">
          <Icon name="CheckCircleIcon" size={24} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-success">¡Mensaje Enviado!</p>
            <p className="text-sm text-success/80 mt-1">
              Hemos recibido tu consulta. Te responderemos dentro de 24 horas.
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nombre Completo <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-background border ${errors?.name ? 'border-error' : 'border-input'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast`}
              placeholder="Juan Pérez"
            />
            {errors?.name && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                <span>{errors?.name}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Correo Electrónico <span className="text-error">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-background border ${errors?.email ? 'border-error' : 'border-input'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast`}
              placeholder="juan@ejemplo.com"
            />
            {errors?.email && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                <span>{errors?.email}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Teléfono <span className="text-error">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-background border ${errors?.phone ? 'border-error' : 'border-input'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast`}
              placeholder="9999-9999"
            />
            {errors?.phone && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                <span>{errors?.phone}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
              Categoría <span className="text-error">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData?.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-background border ${errors?.category ? 'border-error' : 'border-input'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast`}
            >
              <option value="">Selecciona una categoría</option>
              {categories?.map((cat) => (
                <option key={cat?.value} value={cat?.value}>
                  {cat?.label}
                </option>
              ))}
            </select>
            {errors?.category && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                <span>{errors?.category}</span>
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
            Asunto <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData?.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-background border ${errors?.subject ? 'border-error' : 'border-input'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast`}
            placeholder="¿En qué podemos ayudarte?"
          />
          {errors?.subject && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.subject}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Mensaje <span className="text-error">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData?.message}
            onChange={handleChange}
            rows="6"
            className={`w-full px-4 py-3 bg-background border ${errors?.message ? 'border-error' : 'border-input'} rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-fast resize-none`}
            placeholder="Describe tu consulta o problema..."
          />
          {errors?.message && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.message}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-fast font-heading font-semibold flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <Icon name="ArrowPathIcon" size={20} variant="outline" className="animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Icon name="PaperAirplaneIcon" size={20} variant="solid" />
              <span>Enviar Mensaje</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}

ContactForm.propTypes = {
  categories: PropTypes?.arrayOf(
    PropTypes?.shape({
      value: PropTypes?.string?.isRequired,
      label: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};