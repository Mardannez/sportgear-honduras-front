'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function FilterPanel({ 
  categories, 
  brands, 
  selectedCategory, 
  selectedBrands, 
  priceRange, 
  onCategoryChange, 
  onBrandChange, 
  onPriceRangeChange,
  onClearFilters 
}) {
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isBrandExpanded, setIsBrandExpanded] = useState(true);

  const handleBrandToggle = (brandId) => {
    if (selectedBrands?.includes(brandId)) {
      onBrandChange(selectedBrands?.filter(id => id !== brandId));
    } else {
      onBrandChange([...selectedBrands, brandId]);
    }
  };

  const formatPrice = (price) => {
    return `L ${price?.toLocaleString('es-HN')}`;
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrands?.length > 0 || 
    priceRange?.min > 0 || priceRange?.max < 50000;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-bold text-foreground">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-fast font-heading font-medium"
          >
            Limpiar Todo
          </button>
        )}
      </div>
      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-heading font-semibold text-foreground">Categorías</h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-fast font-body ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-border'
              }`}
            >
              <span>{category?.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-background text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div className="space-y-3">
        <button
          onClick={() => setIsPriceExpanded(!isPriceExpanded)}
          className="w-full flex items-center justify-between text-sm font-heading font-semibold text-foreground"
        >
          <span>Rango de Precio</span>
          <Icon 
            name="ChevronDownIcon" 
            size={20} 
            variant="solid"
            className={`transition-transform duration-fast ${isPriceExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isPriceExpanded && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-body">Mínimo</label>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={priceRange?.min}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: parseInt(e?.target?.value) })}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="text-sm font-heading font-semibold text-foreground">
                {formatPrice(priceRange?.min)}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-body">Máximo</label>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={priceRange?.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: parseInt(e?.target?.value) })}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="text-sm font-heading font-semibold text-foreground">
                {formatPrice(priceRange?.max)}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Brands */}
      <div className="space-y-3">
        <button
          onClick={() => setIsBrandExpanded(!isBrandExpanded)}
          className="w-full flex items-center justify-between text-sm font-heading font-semibold text-foreground"
        >
          <span>Marcas</span>
          <Icon 
            name="ChevronDownIcon" 
            size={20} 
            variant="solid"
            className={`transition-transform duration-fast ${isBrandExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isBrandExpanded && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {brands?.map((brand) => (
              <label
                key={brand?.id}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors duration-fast cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands?.includes(brand?.id)}
                  onChange={() => handleBrandToggle(brand?.id)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <span className="flex-1 text-sm font-body text-foreground">{brand?.name}</span>
                <span className="text-xs text-muted-foreground">({brand?.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

FilterPanel.propTypes = {
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
  selectedCategory: PropTypes?.string?.isRequired,
  selectedBrands: PropTypes?.arrayOf(PropTypes?.number)?.isRequired,
  priceRange: PropTypes?.shape({
    min: PropTypes?.number?.isRequired,
    max: PropTypes?.number?.isRequired,
  })?.isRequired,
  onCategoryChange: PropTypes?.func?.isRequired,
  onBrandChange: PropTypes?.func?.isRequired,
  onPriceRangeChange: PropTypes?.func?.isRequired,
  onClearFilters: PropTypes?.func?.isRequired,
};