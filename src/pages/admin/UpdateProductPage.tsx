// src/pages/admin/UpdateProductPage.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useGetProductBySlugQuery, useUpdateProductMutation } from '../../redux/features/productApi';
import { ProductForm, type ProductFormValues } from '../../components/admin/products/ProductForm';
import { Skeleton } from '../../components/ui/skeleton';

export const UpdateProductPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // 1. Fetch the existing product data
    const { data: productData, isLoading: isFetching, error } = useGetProductBySlugQuery(slug!, { skip: !slug });
    
    // 2. Get the update mutation hook
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const handleUpdateSubmit = async (data: ProductFormValues) => {
        if (!slug) return;
        try {
            const payload = {
                ...data,
                images: data.images.map(img => img.url),
                tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
            };
            await updateProduct({ slug, data: payload }).unwrap();
            toast.success("Product updated successfully!");
            navigate('/admin/products');
        } catch (error) {
            toast.error("Failed to update product. Please try again.");
            console.error("Update Product Error:", error);
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                    <div className="space-y-8">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-96 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-destructive">Failed to load product data. Please try again.</div>
    }

    return (
        <ProductForm 
            initialData={productData?.data || null}
            onSubmit={handleUpdateSubmit}
            isLoading={isUpdating}
        />
    );
};