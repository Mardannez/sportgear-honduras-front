import Icon from '@/components/ui/AppIcon';

export default function SecurityFeatures() {
  const features = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Datos Seguros',
      description: 'Su información está protegida con encriptación de nivel bancario'
    },
    {
      icon: 'LockClosedIcon',
      title: 'Privacidad Garantizada',
      description: 'Nunca compartimos sus datos personales con terceros'
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Verificación Segura',
      description: 'Proceso de autenticación de dos factores disponible'
    }
  ];

  return (
    <div className="bg-card rounded-lg shadow-elevation p-6">
      <h2 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center space-x-2">
        <Icon name="ShieldCheckIcon" size={24} variant="solid" className="text-success" />
        <span>Seguridad y Privacidad</span>
      </h2>
      <div className="space-y-4">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg flex-shrink-0">
              <Icon name={feature?.icon} size={20} variant="solid" className="text-success" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-accent/10 border border-accent rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} variant="solid" className="text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            Al crear una cuenta, acepta recibir actualizaciones sobre sus pedidos y ofertas especiales. Puede cancelar la suscripción en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  );
}