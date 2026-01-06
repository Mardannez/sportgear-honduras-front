import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart }) {
  if (products?.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground text-center max-w-md font-body">
          Intenta ajustar tus filtros o buscar con otros términos para encontrar lo que necesitas.
        </p>
      </div>
    );
  }

  return (
    <>
      {products?.map((product) => (
        <ProductCard 
          key={product?.id} 
          product={product} 
          onAddToCart={onAddToCart}
        />
      ))}
    </>
  );
}

ProductGrid.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      category: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      discount: PropTypes?.number?.isRequired,
      rating: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      inStock: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
};