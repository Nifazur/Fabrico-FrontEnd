// src/pages/admin/CreateProductPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCreateProductMutation } from '../../redux/features/productApi';
import { ProductForm, type ProductFormValues } from '../../components/admin/products/ProductForm';

const CreateProductPage: React.FC = () => {
    const navigate = useNavigate();
    const [createProduct, { isLoading }] = useCreateProductMutation();

    const handleCreateSubmit = async (data: ProductFormValues) => {
        try {
            const payload = {
                ...data,
                images: data.images.map(img => img.url),
                tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
            };
            await createProduct(payload).unwrap();
            toast.success("Product created successfully!");
            navigate('/admin/products');
        } catch (error) {
            toast.error("Failed to create product. Please try again.");
            console.error("Create Product Error:", error);
        }
    };

    return (
        <ProductForm 
            onSubmit={handleCreateSubmit}
            isLoading={isLoading}
        />
    );
};

export default CreateProductPage