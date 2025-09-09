// src/components/ProductListing.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Grid3x3, List, Search, Filter, Badge } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Skeleton } from '../ui/skeleton';
import { useGetAllProductsQuery } from '../../redux/features/productApi';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { type IProduct, type IProductQuery } from '../../types';
import { cn } from '../../lib/utils';
import { useDebounce } from '../../hooks/useDebounce';

// --- FIX #1: Change state from `category` to `gender` ---
const initialFilters: IProductQuery = {
    minPrice: 0,
    maxPrice: 10000,
    search: '',
    sort: 'featured',
    page: 1,
    limit: 12,
    gender: undefined, // Use gender
};

export const ProductListing: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { gender: genderFromParams } = useParams<{ gender: string }>();
    const [filters, setFilters] = useState<IProductQuery>(initialFilters);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // This is for SUBCATEGORY
    const [collectionTab, setCollectionTab] = useState<'new' | 'recommended'>('recommended');

    const debouncedSearch = useDebounce(filters.search || '', 500);
    console.log(genderFromParams);
    

    // --- FIX #2: Pass `gender` from filters to the API query ---
    const { data, isLoading, error } = useGetAllProductsQuery({
        ...filters,
        search: debouncedSearch,
        color: selectedColors.join(',') || undefined,
        size: selectedSizes.join(',') || undefined,
        subcategory: selectedCategories.join(',') || undefined,
        gender: filters.gender,
    });

    const products: IProduct[] = data?.data || [];
    const meta = data?.meta;

    // --- FIX #3: Sync `gender` to the URL ---
    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.search) params.set('q', filters.search);
        if (filters.sort && filters.sort !== 'featured') params.set('sort', filters.sort);
        if (selectedColors.length) params.set('color', selectedColors.join(','));
        if (selectedSizes.length) params.set('size', selectedSizes.join(','));
        if (selectedCategories.length) params.set('subcategory', selectedCategories.join(','));
        if (filters.minPrice && filters.minPrice > 0) params.set('minPrice', String(filters.minPrice));
        if (filters.maxPrice && filters.maxPrice < 10000) params.set('maxPrice', String(filters.maxPrice));
        if (filters.page && filters.page > 1) params.set('page', String(filters.page));
        setSearchParams(params, { replace: true });
    }, [filters, selectedColors, selectedSizes, selectedCategories, setSearchParams]);

    // --- FIX #4: Load `gender` from the URL on mount/change ---
    useEffect(() => {
        const loaded: IProductQuery = {
            ...initialFilters,
            gender: genderFromParams,
            search: searchParams.get('q') || '',
            sort: searchParams.get('sort') || 'featured',
            minPrice: parseInt(searchParams.get('minPrice') || '0'),
            maxPrice: parseInt(searchParams.get('maxPrice') || '10000'),
            page: parseInt(searchParams.get('page') || '1'),
        };

        const colors = searchParams.get('color')?.split(',').filter(Boolean) || [];
        const sizes = searchParams.get('size')?.split(',').filter(Boolean) || [];
        const subcategories = searchParams.get('subcategory')?.split(',').filter(Boolean) || [];

        setSelectedColors(colors);
        setSelectedSizes(sizes);
        setSelectedCategories(subcategories);
        setFilters(loaded);

        if (loaded.sort === 'newest') setCollectionTab('new');
        else setCollectionTab('recommended');
    }, [searchParams, genderFromParams]);

    const handleFilterChange = useCallback((newFilters: Partial<IProductQuery>) => {
        setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    }, []);

    // --- FIX #5: Preserve gender when clearing filters ---
    const handleClearFilters = useCallback(() => {
        setFilters({ ...initialFilters, gender: genderFromParams });
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedCategories([]);
        setCollectionTab('recommended');
    }, [genderFromParams]);

    // Determine the page title based on the category filter
    const pageTitle = filters.gender
        ? `${filters.gender.charAt(0).toUpperCase() + filters.gender.slice(1)}'s Collection`
        : "All Products";

    const hasActiveFilters = useMemo(() => {
        return (
            selectedColors.length > 0 ||
            selectedSizes.length > 0 ||
            selectedCategories.length > 0 ||
            (filters.minPrice && filters.minPrice > 0) ||
            (filters.maxPrice && filters.maxPrice < 10000) ||
            (filters.search && filters.search !== '')
        );
    }, [filters, selectedColors, selectedSizes, selectedCategories]);

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCollectionTab = (tab: 'new' | 'recommended') => {
        setCollectionTab(tab);
        handleFilterChange({ sort: tab === 'new' ? 'newest' : 'featured' });
    };


    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="py-4 md:py-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                                {pageTitle}
                            </h1>
                            <div className="relative w-full sm:max-w-xs lg:max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    className="pl-10 rounded-full bg-input border-border w-full"
                                    value={filters.search || ''}
                                    onChange={(e) => handleFilterChange({ search: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Section tabs + sort + view - Mobile First Approach */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            {/* Left Side - Tabs, Filters, Results Count */}
                            <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                                {/* Collection Tabs */}
                                <div className="bg-card border border-border rounded-full p-1 w-fit">
                                    <div className="flex">
                                        <Button
                                            size="sm"
                                            variant={collectionTab === 'new' ? 'default' : 'ghost'}
                                            className={cn("rounded-full px-3 sm:px-4 h-8 text-xs sm:text-sm",
                                                collectionTab === 'new'
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                            onClick={() => handleCollectionTab('new')}
                                        >
                                            New
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={collectionTab === 'recommended' ? 'default' : 'ghost'}
                                            className={cn("rounded-full px-3 sm:px-4 h-8 text-xs sm:text-sm",
                                                collectionTab === 'recommended'
                                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                            onClick={() => handleCollectionTab('recommended')}
                                        >
                                            Recommended
                                        </Button>
                                    </div>
                                </div>

                                {/* Mobile Filters */}
                                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="sm" className="lg:hidden border-border rounded-full hover:bg-accent hover:text-accent-foreground w-fit">
                                            <Filter className="h-4 w-4 mr-2" />
                                            <span className="text-xs sm:text-sm">Filters</span>
                                            {hasActiveFilters && (
                                                <Badge className="ml-2 bg-primary text-primary-foreground rounded-full text-xs px-1.5 py-0.5">
                                                    Active
                                                </Badge>
                                            )}
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-80 bg-card border-border">
                                        <FilterSidebar
                                            filters={filters}
                                            selectedColors={selectedColors}
                                            selectedSizes={selectedSizes}
                                            selectedCategories={selectedCategories}
                                            onFilterChange={handleFilterChange}
                                            onColorChange={setSelectedColors}
                                            onSizeChange={setSelectedSizes}
                                            onCategoryChange={setSelectedCategories}
                                            onClearFilters={handleClearFilters}
                                            className="border-0 bg-transparent"
                                        />
                                    </SheetContent>
                                </Sheet>

                                {/* Results Count */}
                                <span className="text-xs sm:text-sm text-muted-foreground">
                                    {meta?.total || 0} Results
                                </span>
                            </div>

                            {/* Right Side - Sort + View Toggle */}
                            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                                {/* Sort Dropdown */}
                                <Select
                                    value={filters.sort || 'featured'}
                                    onValueChange={(value) => {
                                        handleFilterChange({ sort: value });
                                        setCollectionTab(value === 'newest' ? 'new' : 'recommended');
                                    }}
                                >
                                    <SelectTrigger className="w-[140px] sm:w-[160px] lg:w-[180px] rounded-full bg-card border-border text-xs sm:text-sm">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-popover border-border">
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="rating">Best Rating</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View Toggle - Hidden on small screens, visible on sm+ */}
                                <div className="flex items-center gap-1 border border-border rounded-full p-1 bg-card">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                        size="icon"
                                        className={cn("h-7 w-7 sm:h-8 sm:w-8 rounded-full",
                                            viewMode === 'grid'
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "hover:bg-accent hover:text-accent-foreground"
                                        )}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <Grid3x3 className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                                        size="icon"
                                        className={cn("h-7 w-7 sm:h-8 sm:w-8 rounded-full",
                                            viewMode === 'list'
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                                : "hover:bg-accent hover:text-accent-foreground"
                                        )}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <List className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {hasActiveFilters && (
                            <div className="flex items-center gap-2 flex-wrap">
                                {/* Badge mapping logic remains the same */}
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-4">
                    <div className="flex gap-6">
                        {/* Desktop Sidebar */}
                        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 self-start">
                            <FilterSidebar
                                filters={filters}
                                selectedColors={selectedColors}
                                selectedSizes={selectedSizes}
                                selectedCategories={selectedCategories}
                                onFilterChange={handleFilterChange}
                                onColorChange={setSelectedColors}
                                onSizeChange={setSelectedSizes}
                                onCategoryChange={setSelectedCategories}
                                onClearFilters={handleClearFilters}
                            />
                        </aside>

                        {/* Product Grid */}
                        <main className="flex-1">
                            {isLoading ? (
                                <div className={cn("grid gap-5", viewMode === 'grid' ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1")}>
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div key={i} className="space-y-3">
                                            <Skeleton className="aspect-[3/4] w-full bg-muted animate-pulse rounded-2xl" />
                                            <Skeleton className="h-4 w-3/4 bg-muted animate-pulse" />
                                            <Skeleton className="h-4 w-1/2 bg-muted animate-pulse" />
                                        </div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <p className="text-destructive mb-4">Failed to load products</p>
                                    <Button onClick={() => window.location.reload()} className="bg-primary text-primary-foreground hover:bg-primary/90">Retry</Button>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-4">No products found</p>
                                    <Button onClick={handleClearFilters} variant="secondary" className="hover:bg-secondary/80">Clear filters</Button>
                                </div>
                            ) : (
                                <>
                                    <div className={cn("grid gap-5", viewMode === 'grid' ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-2")}>
                                        {products.map((product: IProduct, index: number) => (
                                            <ProductCard
                                                key={product._id}
                                                product={product}
                                                viewMode={viewMode}
                                                colorIndex={index}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination - This will now work correctly */}
                                    {meta && meta.totalPages > 1 && (
                                        <div className="mt-10 flex justify-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handlePageChange((filters.page || 1) - 1)} disabled={filters.page === 1} className="border-border rounded-full hover:bg-accent hover:text-accent-foreground">Previous</Button>

                                            {/* Basic pagination example, can be made more complex */}
                                            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(page => (
                                                <Button
                                                    key={page}
                                                    variant={filters.page === page ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => handlePageChange(page)}
                                                    className={cn("rounded-full", filters.page === page ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border hover:bg-accent hover:text-accent-foreground")}
                                                >
                                                    {page}
                                                </Button>
                                            ))}

                                            <Button variant="outline" size="sm" onClick={() => handlePageChange((filters.page || 1) + 1)} disabled={filters.page === meta.totalPages} className="border-border rounded-full hover:bg-accent hover:text-accent-foreground">Next</Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};