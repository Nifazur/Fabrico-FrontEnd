// src/components/orders/OrderHeader.tsx
import React from 'react';
import { type IOrder } from '../../types';

interface Props {
  order: IOrder;
}

const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
    }).replace(',', '');
};

export const OrderHeader: React.FC<Props> = ({ order }) => (
  <div className="bg-muted/40 p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center">
    <div>
      <p className="font-bold text-xl text-foreground">Order no: #{order.orderNumber}</p>
      <p className="text-sm text-muted-foreground">Placed On {formatDateTime(order.createdAt as string)}</p>
    </div>
    <div><p className="font-bold text-xl text-foreground">Total: ${order.total}</p></div>
  </div>
);




