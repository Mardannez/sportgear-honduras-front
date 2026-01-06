import Link from 'next/link';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function EmptyCart({ featuredProducts }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
      minimumFractionDigits: 2
    })?.format(price)?.replace('HNL', 'L');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Empty State */}
      <div className="bg-card border border-border rounded-lg p-8 sm:p-12 text-center mb-8">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="ShoppingCartIcon" size={48} variant="outline" className="text-muted-foreground" />
        </div>
        <h2 className="font-heading font-bold text-foreground text-2xl mb-3">
          Tu carrito está vacío
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Parece que aún no has agregado productos a tu carrito. ¡Explora nuestro catálogo y encuentra el equipo deportivo perfecto para ti!
        </p>
        <Link
          href="/product-catalog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-fast font-heading font-medium"
        >
          <Icon name="ShoppingBagIcon" size={20} variant="solid" />
          Explorar Productos
        </Link>
      </div>
      {/* Category Links */}
      <div className="mb-8">
        <h3 className="font-heading font-bold text-foreground text-xl mb-4">
          Categorías Populares
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'Accesorios Deportivos', icon: 'SparklesIcon', path: '/product-catalog?category=accesorios' },
            { name: 'Smartwatches', icon: 'ClockIcon', path: '/product-catalog?category=smartwatches' },
            { name: 'Equipos de Fitness', icon: 'FireIcon', path: '/product-catalog?category=fitness' },
            { name: 'Accesorios Tech', icon: 'DevicePhoneMobileIcon', path: '/product-catalog?category=tech' }
          ]?.map((category) => (
            <Link
              key={category?.name}
              href={category?.path}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all duration-fast text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={category?.icon} size={24} variant="outline" className="text-primary" />
              </div>
              <p className="font-heading font-medium text-foreground text-sm">
                {category?.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/* Featured Products */}
      <div>
        <h3 className="font-heading font-bold text-foreground text-xl mb-4">
          Productos Destacados
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts?.map((product) => (
            <Link
              key={product?.id}
              href={`/product-details?id=${product?.id}`}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-fast group"
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                <AppImage
                  src={product?.image}
                  alt={product?.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product?.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-bold">
                    -{product?.discount}%
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-heading font-semibold text-foreground mb-2 line-clamp-2">
                  {product?.name}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    {product?.discount > 0 ? (
                      <>
                        <p className="text-muted-foreground line-through text-sm">
                          {formatPrice(product?.originalPrice)}
                        </p>
                        <p className="font-heading font-bold text-primary text-lg">
                          {formatPrice(product?.price)}
                        </p>
                      </>
                    ) : (
                      <p className="font-heading font-bold text-primary text-lg">
                        {formatPrice(product?.price)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-warning">
                    <Icon name="StarIcon" size={16} variant="solid" />
                    <span className="text-sm font-medium">{product?.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

EmptyCart.propTypes = {
  featuredProducts: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      discount: PropTypes?.number,
      rating: PropTypes?.number?.isRequired
    })
  )?.isRequired
};