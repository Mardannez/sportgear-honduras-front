'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import FilterPanel from './FilterPanel';

export default function MobileFilterDrawer({ 
  isOpen, 
  onClose, 
  categories, 
  brands, 
  selectedCategory, 
  selectedBrands, 
  priceRange, 
  onCategoryChange, 
  onBrandChange, 
  onPriceRangeChange,
  onClearFilters,
  resultCount 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/60 z-[200] lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-background z-[201] lg:hidden overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border px-4 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-heading font-bold text-foreground">Filtros</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors duration-fast"
            aria-label="Cerrar filtros"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" />
          </button>
        </div>

        <div className="p-4">
          <FilterPanel
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            onCategoryChange={onCategoryChange}
            onBrandChange={onBrandChange}
            onPriceRangeChange={onPriceRangeChange}
            onClearFilters={onClearFilters}
          />
        </div>

        <div className="sticky bottom-0 bg-background border-t border-border px-4 py-4">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-fast font-heading font-semibold"
          >
            <span>Ver {resultCount} Productos</span>
          </button>
        </div>
      </div>
    </>
  );
}

MobileFilterDrawer.propTypes = {
  isOpen: PropTypes?.bool?.isRequired,
  onClose: PropTypes?.func?.isRequired,
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
  resultCount: PropTypes?.number?.isRequired,
};