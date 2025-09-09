// src/components/orders/OrdersList.tsx
import React from 'react';
import { type IOrder } from '../../types';
import { OrderItemCard } from './OrderItemCard';

interface Props {
  orders: IOrder[];
}

export const OrdersList: React.FC<Props> = ({ orders }) => {
  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <OrderItemCard key={order._id} order={order} />
      ))}
    </div>
  );
};