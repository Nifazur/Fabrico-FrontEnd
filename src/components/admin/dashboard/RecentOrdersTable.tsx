// src/components/admin/dashboard/RecentOrdersTable.tsx
import React from 'react';
import { useGetAllOrdersQuery } from '../../../redux/features/orderApi';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Skeleton } from '../../ui/skeleton';
import { type IOrder } from '../../../types';

const getStatusClass = (status: string) => {
    switch (status.toUpperCase()) {
        case 'PENDING': return 'text-orange-500';
        case 'DELIVERED': return 'text-green-500'; // Assuming 'Completed' is 'DELIVERED'
        case 'CANCELLED': return 'text-red-500';
        default: return 'text-muted-foreground';
    }
}

export const RecentOrdersTable: React.FC = () => {
    const { data, isLoading } = useGetAllOrdersQuery({ limit: 5 });

    const orders = data?.data || [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="h-48 w-full" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order: IOrder) => (
                                <TableRow key={order._id}>
                                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt ?? Date.now()).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className={getStatusClass(order.orderStatus)}>{order.orderStatus}</TableCell>
                                    <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};