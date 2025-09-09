// src/components/orders/OrderItemsSummary.tsx
import React from 'react';
import { type IOrderItem } from '../../types';

interface Props {
  items: IOrderItem[];
}

export const OrderItemsSummary: React.FC<Props> = ({ items }) => (
  <div className="bg-card border rounded-lg">
    <div className="p-4 border-b">
      <h3 className="font-semibold">{items.length} Items</h3>
    </div>
    <div className="p-4 space-y-4">
      {items.map(item => (
        <div key={item.product._id} className="flex gap-4">
          {/* <img 
            src={item.product.images[0]} 
            alt={item.product.name}
            className="w-20 h-20 rounded-md object-cover"
          /> */}
          <div className="flex-1">
            <p className="font-medium text-foreground">{item.product.name}</p>
            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
          </div>
          <p className="font-medium text-foreground">${item.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  </div>
);