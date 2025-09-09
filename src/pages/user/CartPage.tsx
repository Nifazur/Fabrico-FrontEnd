// src/pages/CartPage.tsx
import React from 'react';
import { useGetCartQuery } from '../../redux/features/cartApi';
import { Link, useNavigate } from 'react-router-dom';
import { CartItemsList } from '../../components/cart/CartItemsList';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { type ICart } from '../../types';

// The totals part is now a separate component within this file for clarity
const CartTotals: React.FC<{ cart: ICart }> = ({ cart }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card p-6 rounded-lg border w-full">
      <div className="space-y-4">
        <div className="flex justify-between text-muted-foreground">
          <span>Sub Total</span>
          <span className="font-medium text-foreground">${cart.totalPrice?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-medium text-foreground">$130</span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Grand Total</span>
        <span>${(cart?.totalPrice as number + 130).toFixed(2)}</span>
      </div>
      <hr className="my-4" />
      <Button
        size="lg"
        className="w-full bg-[#8A33FD] text-primary-foreground hover:bg-[#7a2ddf]"
        onClick={() => navigate('/user/checkout')}
      >
        Proceed To Checkout
      </Button>
    </div>
  );
};

export const CartPage: React.FC = () => {
  const { data, isLoading, error } = useGetCartQuery();
  const cart = data?.data;

  const renderContent = () => {
    if (isLoading) {
      return <CartPageSkeleton />;
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <p className="text-destructive mb-4">Failed to load your cart.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      );
    }
    
    if (!cart || cart.items.length === 0) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col gap-12">
        <CartItemsList items={cart.items} />
        
        {/* --- NEW BOTTOM SECTION --- */}
        <div className="flex flex-col-reverse md:flex-row gap-8 items-start justify-between">
          {/* Left Side: Discount & Continue Shopping */}
          <div className="space-y-4 w-full md:w-1/2">
            <h3 className="text-xl font-semibold">Discount Codes</h3>
            <p className="text-sm text-muted-foreground">Enter your coupon code if you have one</p>
            <div className="flex gap-2">
              <Input placeholder="Coupon Code" className="h-12"/>
              <Button size="lg" className="h-12 bg-[#8A33FD] hover:bg-[#7a2ddf]">Apply Coupon</Button>
            </div>
            <Button variant="outline" className="h-12" asChild>
                <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>

          {/* Right Side: Order Summary */}
          <div className='w-full md:w-1/2'>
            <CartTotals cart={cart} />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
        {renderContent()}
      </div>
    </div>
  );
};

// ... Skeleton component remains the same ...
const CartPageSkeleton: React.FC = () => (
    <div className="flex flex-col gap-12">
      <div className="space-y-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );