// src/components/orders/OrderShippingDetails.tsx
import React from 'react';
import { type IShippingAddress } from '../../types';

interface Props {
  address: IShippingAddress;
}

export const OrderShippingDetails: React.FC<Props> = ({ address }) => (
  <div className="bg-card border rounded-lg">
    <div className="p-4 border-b">
      <h3 className="font-semibold">Shipping Address</h3>
    </div>
    <div className="p-4 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">{address.fullName}</p>
      <p>{address.street}</p>
      <p>{address.city}, {address.state} {address.zipCode}</p>
      <p>{address.country}</p>
      <p>Phone: {address.phone}</p>
    </div>
  </div>
);