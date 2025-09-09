// src/pages/OrderDetailsPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { useGetOrderByNumberQuery } from '../../redux/features/orderApi';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';

import { OrderHeader } from '../../components/orders/OrderHeader';
import { OrderStatusTracker } from '../../components/orders/OrderStatusTracker';
import { OrderItemsSummary } from '../../components/orders/OrderItemsSummary';
import { OrderShippingDetails } from '../../components/orders/OrderShippingDetails';

export const OrderDetailsPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetOrderByNumberQuery(orderNumber!, {
    skip: !orderNumber,
  });

  const order = data?.data;
  console.log(data, orderNumber);
  

  if (isLoading) {
    return <OrderDetailsSkeleton />;
  }

  if (error || !order) {
    return <div className="text-center py-20">Failed to load order details.</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Order Details</h1>
        </div>

        <div className="space-y-8">
          <OrderHeader order={order} />
          <OrderStatusTracker status={order.orderStatus} />
          
          {/* A placeholder for status updates as shown in the image */}
          <div className="bg-muted/40 rounded-lg p-4 text-center text-sm">
            <span className="text-muted-foreground mr-4">8 June 2023 3:40 PM</span>
            <span className="font-medium text-foreground">Your order has been successfully verified.</span>
          </div>

          <OrderItemsSummary items={order.items} />
          <OrderShippingDetails address={order.shippingAddress} />
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for the page
const OrderDetailsSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Skeleton className="h-8 w-48 mb-6" />
    <div className="space-y-8">
      <Skeleton className="h-20 w-full rounded-lg" />
      <Skeleton className="h-24 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  </div>
);