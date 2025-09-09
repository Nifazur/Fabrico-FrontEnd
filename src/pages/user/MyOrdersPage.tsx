// src/pages/MyOrdersPage.tsx
import React, { useState, useMemo } from 'react';
import { useGetMyOrdersQuery } from '../../redux/features/orderApi';
import { Link } from 'react-router-dom';
import { OrdersList } from '../../components/orders/OrdersList';
import { Skeleton } from '../../components/ui/skeleton';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';


type OrderTab = 'Active' | 'Cancelled' | 'Completed';

const TABS: OrderTab[] = ['Active', 'Cancelled', 'Completed'];

export const MyOrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderTab>('Active');
  const { data, isLoading, error } = useGetMyOrdersQuery({});

  const filteredOrders = useMemo(() => {
    const allOrders = data?.data || [];
    if (!allOrders) return [];
    console.log(data?.data);
    

    switch (activeTab) {
      case 'Active':
        return allOrders.filter(o => ['PENDING', 'PROCESSING', 'SHIPPED'].includes(o.orderStatus));
      case 'Completed':
        return allOrders.filter(o => o.orderStatus === 'DELIVERED');
      case 'Cancelled':
        return allOrders.filter(o => o.orderStatus === 'CANCELLED');
      default:
        return allOrders;
    }
  }, [data, activeTab]);

  const renderContent = () => {
    if (isLoading) {
      return <OrdersPageSkeleton />;
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <p className="text-destructive mb-4">Failed to load your orders.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      );
    }
    
    if (filteredOrders.length === 0) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No {activeTab.toLowerCase()} orders found</h2>
          <p className="text-muted-foreground mb-6">You don't have any orders in this category.</p>
          {activeTab === 'Active' && (
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          )}
        </div>
      );
    }
    
    return <OrdersList orders={filteredOrders} />;
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">My Orders</h1>
        
        {/* Tab Navigation */}
        <div className="border-b mb-8">
          <div className="flex space-x-8">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "py-3 font-medium text-lg transition-colors",
                  activeTab === tab 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

const OrdersPageSkeleton: React.FC = () => (
  <div className="space-y-6">
    {Array.from({ length: 2 }).map((_, i) => (
      <div key={i} className="border rounded-lg overflow-hidden">
        <Skeleton className="h-24 w-full" />
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-20 h-20 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>
    ))}
  </div>
);