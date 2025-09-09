import React from 'react';

export const ShippingMethod: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
      <div className="border rounded-md p-4 flex justify-between items-center">
        <div>
          <p className="font-medium">Arrives by Monday, June 7</p>
          <p className="text-sm text-muted-foreground mt-1">Delivery Charges</p>
        </div>
        <p className="font-semibold">$5.00</p>
      </div>
    </div>
  );
};