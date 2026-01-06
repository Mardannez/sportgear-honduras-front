'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';


export default function HeroSection() {
  const handleCTAClick = () => {
    // Scroll to featured products section
    const featuredSection = document.getElementById('featured-products');
    if (featuredSection) {
      featuredSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="relative max-w-[1200px] mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Icon name="SparklesIcon" size={20} variant="solid" />
              <span className="text-sm font-heading font-semibold">Equipamiento de Calidad</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Entrena mejor,<br />
              <span className="text-accent">rinde más</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-xl mx-auto lg:mx-0">
              Encuentra el equipamiento deportivo perfecto para alcanzar tus metas. Calidad garantizada y entrega en todo Honduras.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={handleCTAClick}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-fast font-heading font-semibold text-lg shadow-elevation hover:shadow-lg hover:-translate-y-0.5">

                <span>Ver Productos</span>
                <Icon name="ArrowRightIcon" size={20} variant="solid" />
              </button>

              <Link
                href="/contact-support"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground rounded-lg hover:bg-primary-foreground/20 transition-all duration-fast font-heading font-semibold text-lg border-2 border-primary-foreground/20">

                <Icon name="ChatBubbleLeftRightIcon" size={20} variant="outline" />
                <span>Contáctanos</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8">
              <div className="flex items-center space-x-2">
                <Icon name="CheckBadgeIcon" size={24} variant="solid" className="text-accent" />
                <span className="text-sm font-medium">Garantía de Calidad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TruckIcon" size={24} variant="solid" className="text-accent" />
                <span className="text-sm font-medium">Envío Nacional</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="ShieldCheckIcon" size={24} variant="solid" className="text-accent" />
                <span className="text-sm font-medium">Compra Segura</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1e7b2cbd2-1764832705851.png"
                alt="Atleta levantando pesas en gimnasio moderno con equipamiento profesional"
                className="w-full h-[500px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-elevation">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
                  <Icon name="UserGroupIcon" size={24} variant="solid" className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">1,500+</p>
                  <p className="text-sm text-muted-foreground">Clientes Satisfechos</p>
                </div>
              </div>
            </div>

            {/* Floating Rating Card */}
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-elevation">
              <div className="flex items-center space-x-2">
                {[...Array(5)]?.map((_, i) =>
                <Icon key={i} name="StarIcon" size={20} variant="solid" className="text-secondary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">5.0 de calificación</p>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"></div>
    </section>);

}

HeroSection.propTypes = {};