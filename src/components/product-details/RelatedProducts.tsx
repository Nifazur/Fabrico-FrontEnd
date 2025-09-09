// src/components/product-details/RelatedProducts.tsx
import React, { useMemo } from 'react';
import { useGetAllProductsQuery } from '../../redux/features/productApi';
import { ProductCard } from '../Product/ProductCard';
import { Skeleton } from '../ui/skeleton';

interface Props {
    category: string;
    currentProductId: string;
}

export const RelatedProducts: React.FC<Props> = ({ category, currentProductId }) => {
    const { data, isLoading } = useGetAllProductsQuery({ category, limit: 5 });

    // Always return an array
    const productArray = useMemo(() => {
        return data?.data ?? []
    }, [data]);

    // Filter out current product safely
    const products = useMemo(() => {
        return productArray.filter(
            (p) => p?._id && p._id !== currentProductId
        );
    }, [productArray, currentProductId]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-1 h-7 bg-primary mr-3"></span>
                Similar Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-96" />
                    ))
                ) : products.length > 0 ? (
                    products.slice(0, 5).map((product, index) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            viewMode="grid"
                            colorIndex={index}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No related products found
                    </p>
                )}
            </div>
        </div>
    );
};