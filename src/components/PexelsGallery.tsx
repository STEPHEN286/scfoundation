import { useState, useEffect } from "react";
import { Heart, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import useGallery from "@/hooks/use-gallery";

interface TransformedImage {
  id: string | number;
  url: string;
  alt: string;
  title: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export default function PexelsGallery() {
  const { data: galleryImages, isLoading } = useGallery();
  const [selectedImage, setSelectedImage] = useState<TransformedImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transformedImages: TransformedImage[] = (galleryImages || []).map((item: any) => ({
    id: item.id,
    url: item.media_url,
    alt: item.title,
    title: item.title,
    description: item.description,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  const openModal = (image: TransformedImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const currentIndex = transformedImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % transformedImages.length;
    setSelectedImage(transformedImages[nextIndex]);
  };

  const previousImage = () => {
    if (!selectedImage) return;
    const currentIndex = transformedImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? transformedImages.length - 1 : currentIndex - 1;
    setSelectedImage(transformedImages[prevIndex]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowRight") nextImage();
    else if (e.key === "ArrowLeft") previousImage();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedImage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-pink-600 to-pink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-pink-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:5xl lg:text-6xl font-bold text-white mb-6">Visual Stories of Impact</h1>
            <p className="text-lg sm:text-xl text-pink-100 max-w-3xl mx-auto">
              Explore the real faces and places behind our mission to transform lives in Sierra Leone through education, healthcare, and community development.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-soft animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : transformedImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {transformedImages.map((image, index) => (
                  <div
                    key={`${image.id}-${index}`}
                    className="bg-white rounded-lg shadow-soft hover:shadow-warm transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => openModal(image)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{image.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-600">Try selecting a different category or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-7xl max-h-full mx-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {transformedImages.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-lg font-semibold mb-2">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-white/80 mb-2">{selectedImage.description}</p>
                )}
                <p className="text-white/60 text-sm mt-2">
                  {transformedImages.findIndex((img) => img.id === selectedImage.id) + 1} of {transformedImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Inspired by What You See?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join us in making a difference. Your support helps us continue our mission to transform lives in Sierra Leone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#contact" className="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors">
              Get Involved
            </Link>
            <Link to="/" className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
