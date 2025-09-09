// src/components/product-details/ProductImageGallery.tsx
import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  images: string[];
  productName: string;
}

export const ProductImageGallery: React.FC<Props> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col items-center gap-2">
        <button className="p-1 hidden md:block"><ChevronUp className="h-5 w-5" /></button>
        <div className="flex md:flex-col gap-3">
          {images.slice(0, 4).map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img)}
              className={cn(
                'w-20 h-20 rounded-md overflow-hidden border-2 transition-colors',
                selectedImage === img ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
              )}
            >
              <img src={img} alt={`${productName} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        <button className="p-1 hidden md:block"><ChevronDown className="h-5 w-5" /></button>
      </div>

      {/* Main Image */}
      <div className="flex-1 aspect-square rounded-lg bg-muted overflow-hidden">
        <img src={selectedImage} alt={productName} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};