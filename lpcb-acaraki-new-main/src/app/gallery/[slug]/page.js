'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import ImagePopup from '@/components/ImagePopup';

export default function GalleryPage() {
  const params = useParams();
  const slug = params.slug;
  
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/gallery/${slug}`);
        if (response.data.status === 'success') {
          setGallery(response.data.data);
        } else {
          setError('Gallery not found');
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError(err.response?.status === 404 ? 'Gallery not found' : 'Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchGallery();
    }
  }, [slug, API_URL]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-[100px]">
        <div className="text-gray-800 text-xl">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-[100px]">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <Link 
          href="/" 
          className="bg-[#FCA311] hover:bg-orange-500 text-black px-6 py-2 rounded-lg transition-colors font-bold"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gallery Header - Account for fixed header */}
      <div className="bg-gradient-to-b from-white to-gray-100 pt-[120px] pb-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{gallery?.title}</h1>
              {gallery?.description && (
                <p className="text-gray-600 text-lg mb-2">{gallery.description}</p>
              )}
              <p className="text-gray-500">
                {gallery?.items_count} {gallery?.items_count === 1 ? 'image' : 'images'}
              </p>
            </div>
            <Link 
              href="/#galeri" 
              className="bg-[#FCA311] hover:bg-orange-500 text-black px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-bold justify-center md:justify-start whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>

            {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-8">
        {gallery?.items && gallery.items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.items.map((image, index) => (
              <div 
                key={image.id} 
                className="relative group cursor-pointer bg-white rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-[#FCA311]/20 transition-all duration-500 hover:scale-[1.02] border border-gray-200 hover:border-[#FCA311]/50"
                onClick={() => handleImageClick(image)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.image_url}
                    alt={image.alt_text || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                        <div className="bg-[#FCA311] rounded-full p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h6v6"/>
                            <path d="M10 14 21 3"/>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-16">
              <div className="max-w-md mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-gray-400">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                <p className="text-xl text-gray-700">No images in this gallery</p>
                <p className="text-gray-500 mt-2">This gallery is empty. Check back later for updates.</p>
              </div>
            </div>
          )}
      </div>

      {/* Image Popup */}
      {selectedImage && (
        <ImagePopup 
          image={selectedImage}
          onClose={closePopup}
          gallery={gallery}
        />
      )}
    </div>
  );
}
