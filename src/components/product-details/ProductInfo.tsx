/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/product-details/ProductInfo.tsx
import React, { useState, useMemo } from 'react';
import { type IProduct } from '../../types';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { ProductRating } from './ProductRating';
import { SizeSelector } from './SizeSelector';
import { ColorSelector } from './ColorSelector';
import { ProductBenefits } from './ProductBenefits';
import { useAddToCartMutation } from '../../redux/features/cartApi';

interface Props {
  product: IProduct;
}

export const ProductInfo: React.FC<Props> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const uniqueSizes = useMemo(() => Array.from(new Set(product.variants.map(v => v.size))), [product.variants]);
  const uniqueColors = useMemo(() => Array.from(new Set(product.variants.map(v => v.color))), [product.variants]);
  
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color.');
      return;
    }
    
    const variant = product.variants.find(v => v.size === selectedSize && v.color === selectedColor);
    if (!variant) {
      toast.error('Selected combination is not available.');
      return;
    }

    try {
      await addToCart({
        productId: product._id!,
        variant: { size: variant.size, color: variant.color, sku: variant.sku },
        quantity: 1
      }).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>
      
      <ProductRating rating={product.ratings || 0} reviewCount={product.numReviews || 0} />
      
      <SizeSelector sizes={uniqueSizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />

      <ColorSelector colors={uniqueColors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />

      <div className="flex items-center gap-4">
        <Button 
          size="lg" 
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isLoading ? 'Adding...' : 'Add to cart'}
        </Button>
        <div className="px-6 py-2.5 border rounded-md font-bold text-lg">
          ${product.price}
        </div>
      </div>
      
      <hr />
      
      <ProductBenefits />
    </div>
  );
};