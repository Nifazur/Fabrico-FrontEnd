// src/pages/admin/AdminOrdersPage.tsx
import React, { useState, useMemo } from 'react';
import { useGetAllOrdersQuery } from '../../redux/features/orderApi';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Skeleton } from '../../components/ui/skeleton';
import OrdersTable from '../../components/admin/orders/OrdersTable';

const ITEMS_PER_PAGE = 10;

export const AdminOrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetAllOrdersQuery({});



  const orders = useMemo(() => {
    return data?.data || [];
  }, [data])
  
  
  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  if (error) return <div>Failed to load orders.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>
      <Input
        placeholder="Filter by order number..."
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="max-w-sm"
      />
      {isLoading ? <Skeleton className="h-96 w-full" /> : <OrdersTable orders={paginatedOrders} />}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Previous</Button>
            <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</Button>
        </div>
      )}
    </div>
  );
};