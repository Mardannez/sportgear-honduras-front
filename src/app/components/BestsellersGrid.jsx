'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function BestsellersGrid({ products }) {
  const handleAddToCart = (product) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('sportgear_cart') || '[]');
      const existingItemIndex = existingCart?.findIndex(item => item?.id === product?.id);

      if (existingItemIndex > -1) {
        existingCart[existingItemIndex].quantity += 1;
      } else {
        existingCart?.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('sportgear_cart', JSON.stringify(existingCart));
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (!products || products?.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <Icon name="FireIcon" size={20} variant="solid" className="text-secondary" />
            <span className="text-sm font-heading font-semibold text-secondary">Los Más Vendidos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Productos Populares
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Los equipos favoritos de nuestros clientes. Comprobados y recomendados por la comunidad.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product, index) => (
            <div
              key={product?.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-elevation transition-all duration-fast group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Product Image */}
              <Link href="/product-details" className="relative block aspect-square overflow-hidden bg-muted">
                <img
                  src={product?.image}
                  alt={product?.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Sales Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-heading font-semibold flex items-center space-x-1">
                  <Icon name="TrophyIcon" size={14} variant="solid" />
                  <span>{product?.sales} vendidos</span>
                </div>

                {/* Quick View Button */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-fast flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-card rounded-lg px-4 py-2 shadow-elevation transform translate-y-2 group-hover:translate-y-0 transition-transform duration-fast">
                    <span className="text-sm font-heading font-semibold text-foreground">Ver Detalles</span>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <Link href="/product-details">
                      <h3 className="font-heading font-semibold text-foreground hover:text-primary transition-colors duration-fast line-clamp-2">
                        {product?.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{product?.category}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="StarIcon"
                      size={14}
                      variant="solid"
                      className={i < Math.floor(product?.rating) ? 'text-secondary' : 'text-muted'}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({product?.rating})</span>
                </div>

                {/* Features */}
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="TruckIcon" size={14} variant="outline" />
                    <span>Envío gratis</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ShieldCheckIcon" size={14} variant="outline" />
                    <span>Garantía</span>
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <p className="text-2xl font-heading font-bold text-primary">
                      L {product?.price?.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-fast font-heading font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    aria-label={`Agregar ${product?.name} al carrito`}
                  >
                    <Icon name="ShoppingCartIcon" size={18} variant="solid" />
                    <span className="hidden sm:inline">Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/product-catalog"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-muted text-foreground rounded-lg hover:bg-muted-foreground/10 transition-all duration-fast font-heading font-semibold border-2 border-border"
          >
            <span>Explorar Todo el Catálogo</span>
            <Icon name="ArrowRightIcon" size={20} variant="solid" />
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

BestsellersGrid.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      category: PropTypes?.string?.isRequired,
      sales: PropTypes?.number?.isRequired,
      rating: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
};