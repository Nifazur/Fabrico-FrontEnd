// src/components/admin/orders/OrdersTable.tsx
import React, { useState } from 'react';
import { MoreHorizontal } from "lucide-react";
import { type IOrder } from "../../../types";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { cn } from "../../../lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { UpdateStatusDialog } from './UpdateStatusDialog'; // Import the new dialog component

interface Props {
    orders: IOrder[];
}

const getStatusBadgeVariant = (status: string) => {
    switch (status.toUpperCase()) {
        case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'CONFIRMED': return 'bg-sky-100 text-sky-800 border-sky-200';
        case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'SHIPPED': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200';
        case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
        case 'REFUNDED': return 'bg-orange-100 text-orange-800 border-orange-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

const OrdersTable: React.FC<Props> = ({ orders }) => {
    // --- State Management for the Dialog ---
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    const handleOpenDialog = (order: IOrder) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
        setIsDialogOpen(false);
    };
    // --- End State Management ---

    return (
        <>
            <div className="bg-card border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order #</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <TableRow key={order._id}>
                                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                                    <TableCell>{order.shippingAddress.fullName}</TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge className={cn("capitalize", getStatusBadgeVariant(order.orderStatus))}>
                                            {order.orderStatus.toLowerCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt ?? Date.now()).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {/* --- Trigger for opening the dialog --- */}
                                                <DropdownMenuItem onClick={() => handleOpenDialog(order)}>
                                                    Update Status
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={6} className="h-24 text-center">No orders found.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* --- Render the Dialog Component --- */}
            {selectedOrder && (
                <UpdateStatusDialog
                    order={selectedOrder}
                    isOpen={isDialogOpen}
                    onClose={handleCloseDialog}
                />
            )}
        </>
    );
};

export default OrdersTable