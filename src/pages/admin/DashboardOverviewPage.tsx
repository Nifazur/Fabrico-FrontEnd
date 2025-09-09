// src/pages/admin/DashboardOverviewPage.tsx
import React, { useMemo } from 'react';
import { useGetAllOrdersQuery } from '../../redux/features/orderApi';
import { useGetAllProductsQuery } from '../../redux/features/productApi';
import { useGetAllUsersQuery } from '../../redux/features/userApi';

import { StatCard } from '../../components/admin/dashboard/StatCard';
import { SalesChart } from '../../components/admin/dashboard/SalesChart';
import { OrderStatusPieChart } from '../../components/admin/dashboard/OrderStatusPieChart';
import { RecentOrdersTable } from '../../components/admin/dashboard/RecentOrdersTable';
import { Skeleton } from '../../components/ui/skeleton';

export const DashboardOverviewPage: React.FC = () => {
  const { data: ordersData, isLoading: isLoadingOrders } = useGetAllOrdersQuery({});
  const { data: productsData, isLoading: isLoadingProducts } = useGetAllProductsQuery({});
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery({});

  const isLoading = isLoadingOrders || isLoadingProducts || isLoadingUsers;

  // Memoize calculations to prevent re-running on every render
  const stats = useMemo(() => {
    const orders = ordersData?.data || [];
    const statusCounts = { COMPLETED: 0, PENDING: 0, CANCELLED: 0 };
    
    orders.forEach(order => {
      const status = order.orderStatus.toUpperCase();
      if (status in statusCounts) {
        statusCounts[status as keyof typeof statusCounts]++;
      }
    });

    return {
      totalSales: orders.reduce((sum, order) => sum + order.total, 0),
      totalProducts: productsData?.meta?.total || 0,
      totalUsers: usersData?.meta?.total || 0,
      totalOrders: ordersData?.meta?.total || 0,
      pieChartData: [
        { name: 'Completed', value: statusCounts.COMPLETED, fill: '#3b82f6' },
        { name: 'Pending', value: statusCounts.PENDING, fill: '#93c5fd' },
        { name: 'Cancelled', value: statusCounts.CANCELLED, fill: '#e5e7eb' },
      ],
    };
  }, [ordersData, productsData, usersData]);
  
  // Note: For a real app, your API should provide aggregated sales data.
  // We'll use mock data here for the line chart's visual representation.
  const salesChartData = [
    { name: 'Jan', sales: 1200 }, { name: 'Feb', sales: 2100 },
    { name: 'Mar', sales: 2400 }, { name: 'Apr', sales: 3800 },
    { name: 'May', sales: 3500 }, { name: 'Jun', sales: 4800 },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  return (
    <div className="space-y-6">
      {/* Top Row: Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Sales" value={`$${stats.totalSales.toLocaleString()}`} />
        <StatCard title="Products" value={stats.totalProducts.toLocaleString()} />
        <StatCard title="Users" value={stats.totalUsers.toLocaleString()} />
        <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} />
      </div>

      {/* Middle Row: Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart data={salesChartData} />
        </div>
        <div>
          <OrderStatusPieChart data={stats.pieChartData} />
        </div>
      </div>

      {/* Bottom Row: Recent Orders */}
      <div>
        <RecentOrdersTable />
      </div>
    </div>
  );
};


// A detailed skeleton loader matching the new layout
const DashboardSkeleton: React.FC = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-80 lg:col-span-2" />
        <Skeleton className="h-80" />
      </div>
      <div>
        <Skeleton className="h-64" />
      </div>
    </div>
);