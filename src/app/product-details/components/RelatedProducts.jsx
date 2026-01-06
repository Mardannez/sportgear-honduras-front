import Link from 'next/link';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function RelatedProducts({ products }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-HN', {
      style: 'currency',
      currency: 'HNL',
      minimumFractionDigits: 2,
    })?.format(price);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
        Productos Relacionados
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Link
            key={product?.id}
            href="/product-details"
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-fast"
          >
            <div className="aspect-square relative overflow-hidden bg-muted">
              <AppImage
                src={product?.image}
                alt={product?.imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product?.discount && (
                <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-lg text-xs font-bold">
                  -{product?.discount}%
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-fast">
                {product?.name}
              </h3>
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(5)]?.map((_, index) => (
                  <Icon
                    key={index}
                    name="StarIcon"
                    size={14}
                    variant={index < Math.floor(product?.rating) ? 'solid' : 'outline'}
                    className={index < Math.floor(product?.rating) ? 'text-warning' : 'text-muted'}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product?.reviewCount})
                </span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-heading font-bold text-primary">
                  {formatPrice(product?.price)}
                </span>
                {product?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      rating: PropTypes?.number?.isRequired,
      reviewCount: PropTypes?.number?.isRequired,
      discount: PropTypes?.number,
    })
  )?.isRequired,
};