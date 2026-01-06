'use client';

import Icon from '@/components/ui/AppIcon';


export default function WhatsAppSupportBanner() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/50412345678?text=Hola,%20necesito%20ayuda%20con%20SportGear', '_blank');
  };

  const supportFeatures = [
    {
      icon: 'ClockIcon',
      title: 'Respuesta Rápida',
      description: 'Te respondemos en minutos'
    },
    {
      icon: 'UserGroupIcon',
      title: 'Asesoría Personalizada',
      description: 'Expertos a tu disposición'
    },
    {
      icon: 'ShoppingBagIcon',
      title: 'Ayuda con Pedidos',
      description: 'Gestiona tus compras fácilmente'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-success/10 to-success/5">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-success text-success-foreground rounded-2xl overflow-hidden shadow-elevation">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-success-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Icon name="SparklesIcon" size={20} variant="solid" />
                <span className="text-sm font-heading font-semibold">Soporte 24/7</span>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                  ¿Necesitas ayuda?
                </h2>
                <p className="text-success-foreground/90 text-lg">
                  Nuestro equipo está listo para ayudarte por WhatsApp. Resuelve tus dudas sobre productos, pedidos y envíos al instante.
                </p>
              </div>

              {/* Support Features */}
              <div className="space-y-4">
                {supportFeatures?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-success-foreground/10 rounded-lg flex-shrink-0">
                      <Icon name={feature?.icon} size={20} variant="solid" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">{feature?.title}</h3>
                      <p className="text-sm text-success-foreground/80">{feature?.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center space-x-3 w-full md:w-auto px-8 py-4 bg-success-foreground text-success rounded-xl hover:bg-success-foreground/90 transition-all duration-fast font-heading font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                aria-label="Abrir chat de WhatsApp"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={24} variant="solid" />
                <span>Chatear por WhatsApp</span>
                <Icon name="ArrowRightIcon" size={20} variant="solid" />
              </button>

              {/* Contact Info */}
              <div className="flex items-center space-x-2 text-sm text-success-foreground/80">
                <Icon name="PhoneIcon" size={16} variant="outline" />
                <span>+504 1234-5678</span>
                <span className="mx-2">•</span>
                <Icon name="ClockIcon" size={16} variant="outline" />
                <span>Disponible 24/7</span>
              </div>
            </div>

            {/* Right Decorative Side */}
            <div className="relative hidden lg:block h-full min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-success-foreground/5 to-success-foreground/10"></div>
              
              {/* Large WhatsApp Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-success-foreground/20 rounded-full blur-3xl"></div>
                  <Icon name="ChatBubbleLeftRightIcon" size={200} variant="solid" className="text-success-foreground/30" />
                </div>
              </div>

              {/* Decorative Circles */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-success-foreground/10 rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-success-foreground/10 rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-success-foreground/10 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Additional Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-elevation transition-all duration-fast">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <Icon name="EnvelopeIcon" size={24} variant="solid" className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">Email</h3>
            <p className="text-sm text-muted-foreground">soporte@sportgear.hn</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-elevation transition-all duration-fast">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <Icon name="MapPinIcon" size={24} variant="solid" className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">Ubicación</h3>
            <p className="text-sm text-muted-foreground">Tegucigalpa, Honduras</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-elevation transition-all duration-fast">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
              <Icon name="QuestionMarkCircleIcon" size={24} variant="solid" className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">FAQ</h3>
            <p className="text-sm text-muted-foreground">Preguntas frecuentes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

WhatsAppSupportBanner.propTypes = {};