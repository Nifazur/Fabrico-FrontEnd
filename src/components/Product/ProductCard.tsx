/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProductCard.tsx
import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card } from '../ui/card'; // CardContent is not used in grid view
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { type IProduct } from '../../types';
import { useAddToCartMutation } from '../../redux/features/cartApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface ProductCardProps {
    product: IProduct;
    viewMode: 'grid' | 'list';
    colorIndex: number;
}


export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
    const navigate = useNavigate()
    const [isWishlisted, setIsWishlisted] = useState(false);
    // We don't need selectedVariant state for this design, we'll use the first one by default for quick-add.
    const [addToCart, { isLoading }] = useAddToCartMutation();
    console.log(product.totalStock);
    

    /**
     * Handles adding the product to the cart.
     * This function now includes more detailed checks and error logging.
     */
    const handleAddToCart = async () => {
        // 1. Check if the product and its ID exist
        if (!product || !product._id) {
            toast.error("Product data is missing. Cannot add to cart.");
            console.error("Product or product._id is undefined.", product);
            return;
        }

        // 2. For a "quick add" button, we default to the first available variant.
        const defaultVariant = product.variants?.[0];

        if (!defaultVariant) {
            toast.error("This product is currently unavailable.");
            console.error("Product has no variants to add.", product);
            return;
        }

        // 3. Construct the payload in the exact format required by the API.
        const cartItemData = {
            productId: product._id,
            variant: {
                size: defaultVariant.size,
                color: defaultVariant.color,
                sku: defaultVariant.sku,
            },
            quantity: 1, // Default quantity for a single click is 1
        };

        try {
            // 4. Call the mutation with the prepared data payload.
            await addToCart(cartItemData).unwrap();
            toast.success(`'${product.name}' added to your cart!`);
        } catch (error) {
            // 5. Log the detailed error from RTK Query to the console for debugging.
            console.error("Failed to add item to cart:", error);

            // Try to show a more specific error message if available
            const errorMessage = (error as any)?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        }
    };

    // The grid view is the focus of this update.
    if (viewMode === 'grid') {
        return (
            <Card className="group relative w-full sm:min-h-[350px] flex flex-col overflow-hidden rounded-xl hover:shadow-lg transition-shadow duration-300 bg-card border py-0">
                {/* Image Container */}
                <div className="relative flex-grow overflow-hidden" >
                    <div onClick={() => navigate(`/products/${product.slug}`)}>
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>

                    {/* Wishlist Button */}
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-3 right-3 rounded-full h-9 w-9 bg-background/80 hover:bg-background backdrop-blur-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsWishlisted(!isWishlisted);
                        }}
                    >
                        <Heart className={cn("h-5 w-5", isWishlisted ? "fill-destructive text-destructive" : "text-muted-foreground")} />
                    </Button>

                    {/* Add to Cart Button - Visible on Hover */}
                    <div className="absolute bottom-0 left-0 w-full p-4 transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <Button
                            className="w-full"
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart();
                            }}
                            disabled={isLoading} // Disable button while the request is in progress
                        >
                            {isLoading ? 'Adding...' : (
                                <>
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="py-4 px-2 sm:px-4 flex-shrink-0" onClick={() => navigate(`/products/${product.slug}`)}>
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h3 className="font-semibold text-xs line-clamp-1 text-foreground">
                                {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                        <div className="bg-muted px-1 sm:px-3 py-1.5 rounded-lg flex-shrink-0">
                            <span className="font-bold text-foreground text-xs sm:text-base">
                                ${product.price}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    // Return your existing List View component here
    return <div>List View not implemented in this snippet.</div>;
};