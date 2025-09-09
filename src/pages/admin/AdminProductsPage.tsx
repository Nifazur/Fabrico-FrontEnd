// src/pages/admin/AdminProductsPage.tsx
import React, { useState, useMemo } from 'react';
import { useGetAllProductsQuery } from '../../redux/features/productApi';
import { ProductsTable } from '../../components/admin/products/ProductsTable';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { PlusCircle } from 'lucide-react';
import { Skeleton } from '../../components/ui/skeleton';

const ITEMS_PER_PAGE = 10;

export const AdminProductsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useGetAllProductsQuery({});

    const products = useMemo(() => {
        return data?.data ?? [];
    }, [data]);

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage]);

    if (error) return <div>Failed to load products.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Products</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            <Input
                placeholder="Filter by name..."
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                }}
                className="max-w-sm"
            />

            {isLoading ? (
                <Skeleton className="h-96 w-full" />
            ) : (
                <ProductsTable products={paginatedProducts} />
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};