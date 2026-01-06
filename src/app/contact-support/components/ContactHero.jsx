import Icon from '@/components/ui/AppIcon';

export default function ContactHero() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-20 h-20 bg-primary-foreground/10 rounded-full backdrop-blur-sm">
              <Icon name="ChatBubbleLeftRightIcon" size={40} variant="solid" className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            ¿Necesitas Ayuda?
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-6">
            Estamos aquí para asistirte. Contáctanos por WhatsApp, llámanos o envíanos un mensaje.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center space-x-2 bg-primary-foreground/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Icon name="ClockIcon" size={20} variant="outline" />
              <span>Lun - Sáb: 8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center space-x-2 bg-primary-foreground/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Icon name="ChatBubbleLeftEllipsisIcon" size={20} variant="outline" />
              <span>Respuesta en 15 minutos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}