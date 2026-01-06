import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import AuthenticationInteractive from './components/AuthenticationInteractive';
import SecurityFeatures from './components/SecurityFeatures';
import BenefitsSection from './components/BenefitsSection';

export const metadata = {
  title: 'Iniciar Sesión / Registrarse - SportGear Honduras',
  description: 'Acceda a su cuenta de SportGear Honduras o cree una nueva para disfrutar de beneficios exclusivos, seguimiento de pedidos y ofertas especiales en accesorios deportivos y smartwatches.',
};

export default function UserAuthenticationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[1200px] mx-auto px-4">
        <Breadcrumb />
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AuthenticationInteractive />
          </div>

          <div className="space-y-6">
            <SecurityFeatures />
            <div className="hidden lg:block">
              <BenefitsSection />
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-8">
          <BenefitsSection />
        </div>

        <div className="mt-12 bg-card rounded-lg shadow-elevation p-6 text-center">
          <h2 className="text-xl font-heading font-bold text-foreground mb-4">
            ¿Necesita Ayuda?
          </h2>
          <p className="text-muted-foreground mb-6">
            Nuestro equipo de soporte está disponible para ayudarle con cualquier pregunta sobre su cuenta
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/50412345678?text=Hola,%20necesito%20ayuda%20con%20mi%20cuenta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-success text-success-foreground rounded-lg font-heading font-semibold hover:bg-success/90 transition-all duration-fast"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Contactar por WhatsApp</span>
            </a>
            <a
              href="/contact-support"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-input rounded-lg font-heading font-semibold text-foreground hover:bg-muted transition-all duration-fast"
            >
              <span>Centro de Ayuda</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}