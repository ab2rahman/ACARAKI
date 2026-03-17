'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const ImagePopup = ({ image, onClose, gallery }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Find the current image index in the gallery
    const index = gallery?.items?.findIndex(item => item.id === image.id);
    if (index !== -1) {
      setCurrentImageIndex(index);
    }
  }, [image, gallery]);

  const goToPrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentImageIndex < gallery.items.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const currentImage = gallery?.items?.[currentImageIndex] || image;
  const hasPrevious = currentImageIndex > 0;
  const hasNext = currentImageIndex < (gallery?.items?.length - 1);

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious) {
        goToPrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        goToNext();
      }
    };

    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, currentImageIndex, hasPrevious, hasNext, goToPrevious, goToNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      {/* Overlay - click to close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/>
            <path d="M6 6l12 12"/>
          </svg>
        </button>

        {/* Previous Button */}
        {hasPrevious && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}

        {/* Image Container */}
        <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
          <Image
            src={currentImage.image_url}
            alt={currentImage.alt_text || 'Gallery image'}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />

          {/* Image Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6">
            <div className="text-white">
              {currentImage.is_cover && (
                <span className="inline-block bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold mb-2">
                  Cover Image
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  {currentImage.alt_text && (
                    <p className="text-lg font-medium mb-1">{currentImage.alt_text}</p>
                  )}
                  <p className="text-gray-300 text-sm">
                    Image {currentImageIndex + 1} of {gallery?.items?.length || 1}
                  </p>
                </div>
                {gallery?.items?.length > 1 && (
                  <div className="text-gray-300 text-sm">
                    Use ← → keys to navigate
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        {gallery?.items?.length > 1 && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded text-sm">
            {currentImageIndex + 1} / {gallery.items.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePopup;
