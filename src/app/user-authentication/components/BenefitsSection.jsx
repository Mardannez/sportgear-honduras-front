import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function BenefitsSection() {
  const benefits = [
  {
    icon: 'TruckIcon',
    title: 'Seguimiento de Pedidos',
    description: 'Rastree sus pedidos en tiempo real desde la compra hasta la entrega'
  },
  {
    icon: 'HeartIcon',
    title: 'Lista de Deseos',
    description: 'Guarde sus productos favoritos para comprarlos más tarde'
  },
  {
    icon: 'ClockIcon',
    title: 'Historial de Compras',
    description: 'Acceda fácilmente a sus pedidos anteriores y reordene con un clic'
  },
  {
    icon: 'TagIcon',
    title: 'Ofertas Exclusivas',
    description: 'Reciba descuentos y promociones especiales para miembros'
  },
  {
    icon: 'CreditCardIcon',
    title: 'Pago Rápido',
    description: 'Guarde sus métodos de pago para un checkout más rápido'
  },
  {
    icon: 'BellIcon',
    title: 'Notificaciones',
    description: 'Reciba alertas sobre ofertas, restock y actualizaciones de pedidos'
  }];


  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-elevation overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_1d53612a5-1764855074458.png"
            alt="Atleta masculino hispano en ropa deportiva negra corriendo en pista al aire libre con smartwatch"
            className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-2xl font-heading font-bold text-white mb-2">
              Beneficios de Tener una Cuenta
            </h2>
            <p className="text-white/90 text-sm">
              Disfrute de una experiencia de compra personalizada
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits?.map((benefit, index) =>
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-fast">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon name={benefit?.icon} size={20} variant="outline" className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {benefit?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-elevation p-6 text-center">
        <Icon name="SparklesIcon" size={32} variant="solid" className="text-primary-foreground mx-auto mb-3" />
        <h3 className="text-xl font-heading font-bold text-primary-foreground mb-2">
          ¡Únase a Más de 10,000 Clientes Satisfechos!
        </h3>
        <p className="text-primary-foreground/90 text-sm">
          Cree su cuenta hoy y comience a disfrutar de todos los beneficios
        </p>
      </div>
    </div>);

}