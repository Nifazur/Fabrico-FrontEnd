/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { toast } from 'sonner';
import { OrderStatus, type IOrder } from '../../../types';
import { useUpdateOrderStatusMutation } from '../../../redux/features/orderApi';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Loader2 } from 'lucide-react';

// All possible order statuses
const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];

interface Props {
    order: IOrder;
    isOpen: boolean;
    onClose: () => void;
}

export const UpdateStatusDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
    const [selectedStatus, setSelectedStatus] = useState(order.orderStatus);
    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

    const handleUpdate = async () => {
        if (selectedStatus === order.orderStatus) {
            toast.info("No status change detected.");
            onClose();
            return;
        }
        try {
            await updateOrderStatus({
                id: order._id as string,
                data: { orderStatus: selectedStatus as OrderStatus }
            }).unwrap();
            toast.success(`Order #${order.orderNumber} status updated to ${selectedStatus}.`);
            onClose();
        } catch (error) {
            toast.error("Failed to update order status.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Order Status</DialogTitle>
                    <DialogDescription>
                        Change the status for order #{order.orderNumber}. The customer will be notified.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Select
                        value={selectedStatus}
                        onValueChange={(value) => setSelectedStatus(value as OrderStatus)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a new status" />
                        </SelectTrigger>
                        <SelectContent>
                            {ORDER_STATUSES.map(status => (
                                <SelectItem key={status} value={status} className="capitalize">
                                    {status.toLowerCase()}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={isLoading || selectedStatus === order.orderStatus}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Status
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};