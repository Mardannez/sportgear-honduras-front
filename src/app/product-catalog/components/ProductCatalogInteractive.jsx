'use client';

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import FilterPanel from './FilterPanel';
import MobileFilterDrawer from './MobileFilterDrawer';
import ProductGrid from './ProductGrid';

export default function ProductCatalogInteractive({ initialProducts, categories, brands }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(product => product?.categoryId === selectedCategory);
    }

    if (selectedBrands?.length > 0) {
      filtered = filtered?.filter(product => selectedBrands?.includes(product?.brandId));
    }

    filtered = filtered?.filter(product => {
      const finalPrice = product?.price * (1 - product?.discount / 100);
      return finalPrice >= priceRange?.min && finalPrice <= priceRange?.max;
    });

    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => {
          const priceA = a?.price * (1 - a?.discount / 100);
          const priceB = b?.price * (1 - b?.discount / 100);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered?.sort((a, b) => {
          const priceA = a?.price * (1 - a?.discount / 100);
          const priceB = b?.price * (1 - b?.discount / 100);
          return priceB - priceA;
        });
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [initialProducts, selectedCategory, selectedBrands, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 50000 });
  };

  const handleAddToCart = (productId, quantity) => {
    try {
      // Get the product details
      const product = initialProducts?.find(p => p?.id === productId);
      if (!product) return;

      // Create cart item with all necessary details
      const cartItem = {
        id: productId,
        name: product?.name,
        price: product?.price,
        discount: product?.discount,
        quantity: quantity,
        image: product?.image,
        alt: product?.alt,
        category: product?.category,
      };

      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem('sportgear_cart') || '[]');
      
      // Check if item already exists in cart
      const existingItemIndex = existingCart?.findIndex(item => item?.id === productId);
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        existingCart?.push(cartItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem('sportgear_cart', JSON.stringify(existingCart));

      // Dispatch custom event to notify Header component
      window.dispatchEvent(new Event('cartUpdated'));

      // Update local state for UI feedback
      const existingItem = cartItems?.find(item => item?.productId === productId);
      
      if (existingItem) {
        setCartItems(cartItems?.map(item =>
          item?.productId === productId
            ? { ...item, quantity: item?.quantity + quantity }
            : item
        ));
      } else {
        setCartItems([...cartItems, { productId, quantity }]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          Catálogo de Productos
        </h1>
        <p className="text-muted-foreground font-body">
          Descubre nuestra selección de accesorios deportivos, smartwatches y equipos de fitness
        </p>
      </div>
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors duration-fast font-heading font-medium"
          >
            <Icon name="AdjustmentsHorizontalIcon" size={20} variant="outline" />
            <span>Filtros</span>
          </button>
          
          <div className="text-sm text-muted-foreground font-body">
            <span className="font-semibold text-foreground">{filteredProducts?.length}</span> productos encontrados
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="sort-select" className="text-sm text-muted-foreground font-body whitespace-nowrap">
            Ordenar por:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="flex-1 sm:flex-none px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body"
          >
            <option value="relevance">Relevancia</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
            <option value="newest">Más Recientes</option>
            <option value="rating">Mejor Valorados</option>
          </select>
        </div>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Desktop Filter Panel */}
        <aside className="hidden lg:block">
          <FilterPanel
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            onCategoryChange={setSelectedCategory}
            onBrandChange={setSelectedBrands}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
          />
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        categories={categories}
        brands={brands}
        selectedCategory={selectedCategory}
        selectedBrands={selectedBrands}
        priceRange={priceRange}
        onCategoryChange={setSelectedCategory}
        onBrandChange={setSelectedBrands}
        onPriceRangeChange={setPriceRange}
        onClearFilters={handleClearFilters}
        resultCount={filteredProducts?.length}
      />
    </div>
  );
}

ProductCatalogInteractive.propTypes = {
  initialProducts: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      category: PropTypes?.string?.isRequired,
      categoryId: PropTypes?.string?.isRequired,
      brandId: PropTypes?.number?.isRequired,
      price: PropTypes?.number?.isRequired,
      discount: PropTypes?.number?.isRequired,
      rating: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      inStock: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  categories: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      count: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
  brands: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      count: PropTypes?.number?.isRequired,
    })
  )?.isRequired,
};