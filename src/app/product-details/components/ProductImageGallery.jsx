'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ProductImageGallery({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-card rounded-lg overflow-hidden border border-border shadow-sm">
        <div className="aspect-square relative group">
          <AppImage
            src={images?.[selectedImageIndex]?.url}
            alt={images?.[selectedImageIndex]?.alt}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-card/90 hover:bg-card rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
                aria-label="Imagen anterior"
              >
                <Icon name="ChevronLeftIcon" size={24} variant="solid" className="text-foreground" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-card/90 hover:bg-card rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
                aria-label="Imagen siguiente"
              >
                <Icon name="ChevronRightIcon" size={24} variant="solid" className="text-foreground" />
              </button>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-card/90 px-3 py-1 rounded-lg flex items-center space-x-2">
            <Icon name="MagnifyingGlassPlusIcon" size={16} variant="outline" className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Click para zoom</span>
          </div>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-fast ${
                selectedImageIndex === index
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-muted-foreground'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <AppImage
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ProductImageGallery.propTypes = {
  images: PropTypes?.arrayOf(
    PropTypes?.shape({
      url: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};