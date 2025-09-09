// src/components/checkout/OrderSummary.tsx
import React from 'react';
import { useGetCartQuery } from '../../redux/features/cartApi';
import { Skeleton } from '../ui/skeleton';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const OrderSummary: React.FC = () => {
    const navigate = useNavigate()
    const { data: cartData, isLoading } = useGetCartQuery();
    const cart = cartData?.data;

    console.log(cart?.items);
    


    if (isLoading) {
        return (
            <div className="bg-card p-6 rounded-lg border space-y-4">
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <hr />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <hr />
                <Skeleton className="h-8 w-full" />
            </div>
        )
    }

    if (cart?.totalItems === 0) {
        toast.info("Your cart is empty");
        navigate("/products");
    }

    return (
        <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
                {cart?.items.map(item => (
                    <div key={item._id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                                <p className="font-medium">{item.product.name} x {item.quantity}</p>
                                <p className="text-sm text-muted-foreground">Color: {item.variant.color}</p>
                            </div>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <hr className="my-6" />
            <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                    <p>Subtotal ({cart?.totalItems} items)</p>
                    <p>${cart?.totalPrice?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <p>Savings</p>
                    <p>-$0.00</p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                    <p>Shipping</p>
                    <p>$130</p>
                </div>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${(cart?.totalPrice as number + 130).toFixed(2)}</p>
            </div>
        </div>
    );
};