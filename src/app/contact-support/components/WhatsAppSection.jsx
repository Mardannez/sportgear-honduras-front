'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function WhatsAppSection({ phoneNumber, businessHours }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola, necesito ayuda con SportGear Honduras');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-success/5 border border-success/20 rounded-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-16 h-16 bg-success rounded-full">
            <Icon name="ChatBubbleLeftRightIcon" size={32} variant="solid" className="text-success-foreground" />
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Contacto Directo por WhatsApp
          </h2>
          <p className="text-muted-foreground mb-4">
            Obtén respuesta inmediata a tus consultas. Nuestro equipo está disponible para ayudarte con pedidos, productos y entregas.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center md:justify-start space-x-3 text-sm">
              <Icon name="ClockIcon" size={18} variant="outline" className="text-success" />
              <span className="text-foreground font-medium">{businessHours}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3 text-sm">
              <Icon name="BoltIcon" size={18} variant="solid" className="text-success" />
              <span className="text-muted-foreground">Tiempo de respuesta promedio: 15 minutos</span>
            </div>
          </div>

          <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-all duration-fast shadow-md hover:shadow-lg font-heading font-semibold text-lg"
            aria-label="Abrir chat de WhatsApp"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={24} variant="solid" />
            <span>Chatear Ahora</span>
            <Icon 
              name="ArrowRightIcon" 
              size={20} 
              variant="solid"
              className={`transition-transform duration-fast ${isHovered ? 'translate-x-1' : ''}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

WhatsAppSection.propTypes = {
  phoneNumber: PropTypes?.string?.isRequired,
  businessHours: PropTypes?.string?.isRequired,
};