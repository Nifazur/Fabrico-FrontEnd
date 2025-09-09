// src/pages/ProductDetailsPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductBySlugQuery } from '../../../redux/features/productApi';
import { Skeleton } from '../../../components/ui/skeleton';

// Import all the new components
import { Breadcrumbs } from '../../../components/product-details/Breadcrumbs';
import { ProductImageGallery } from '../../../components/product-details/ProductImageGallery';
import { ProductInfo } from '../../../components/product-details/ProductInfo';
import { ProductDescriptionTabs } from '../../../components/product-details/ProductDescriptionTabs';
import { RelatedProducts } from '../../../components/product-details/RelatedProducts';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, error, isLoading } = useGetProductBySlugQuery(slug!, {
    skip: !slug,
  });

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !data?.data) {
    return <div className="text-center py-20">Failed to load product. Please try again.</div>;
  }

  const product = data.data;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs category={product.category} subcategory={product.subcategory as string} />
        <main className="mt-6">
          {/* Top section: Gallery and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductImageGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>

          {/* Middle section: Description and Specs */}
          <div className="mt-16">
            <ProductDescriptionTabs product={product} />
          </div>

          {/* Bottom section: Similar Products */}
          <div className="mt-16">
            <RelatedProducts 
              currentProductId={product._id!}
              category={product.category} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

// A skeleton loader to show while data is fetching
const ProductDetailsSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Skeleton className="h-6 w-1/4 mb-6" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="w-20 h-20 rounded" />
          <Skeleton className="w-20 h-20 rounded" />
          <Skeleton className="w-20 h-20 rounded" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    </div>
  </div>
);