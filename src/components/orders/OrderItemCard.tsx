// src/components/orders/OrderItemCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { type IOrder } from '../../types';
import { Button } from '../ui/button';

// Helper to format date and time
const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
  }).replace(',', '');
};

// Helper to format a date only
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
};

// Helper to calculate an estimated delivery date (e.g., 7 days from order)
const getEstimatedDelivery = (dateString: string) => {
  const orderDate = new Date(dateString);
  orderDate.setDate(orderDate.getDate() + 7);
  return formatDate(orderDate);
};

// Helper to format text like "CASH_ON_DELIVERY" to "Cash on delivery"
const formatPaymentMethod = (method: string) => {
  return method.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

interface Props {
  order: IOrder;
}

export const OrderItemCard: React.FC<Props> = ({ order }) => {
  return (
    <div className="bg-card rounded-xl border overflow-hidden shadow-sm">
      {/* Top Header Section */}
      <div className="bg-muted/40 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="space-y-1">
            <p className="font-semibold text-lg text-foreground">Order no: #{order.orderNumber}</p>
            <p>Order Date: {formatDateTime(order.createdAt as string)}</p>
            <p>Estimated Delivery Date: {getEstimatedDelivery(order.createdAt as string)}</p>
          </div>
          <div className="space-y-1 md:text-right">
            <p>Order Status: <span className="text-foreground font-medium">{order.orderStatus}</span></p>
            <p>Payment Method: <span className="text-foreground font-medium">{formatPaymentMethod(order.paymentMethod)}</span></p>
          </div>
        </div>
      </div>
      
      {/* Items Section */}
      <div className="p-4 md:p-6 space-y-4">
        {order.items.map((item) => (
          <div key={item.product._id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-foreground">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">Color: {item.variant.color}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                <p className="text-sm font-medium text-foreground">Total: ${item.total.toFixed(2)}</p>
              </div>
            </div>
            <Button 
              className="bg-[#8A33FD] hover:bg-[#7a2ddf] w-full sm:w-auto"
              asChild
            >
              <Link to={`/user/orders/${order.orderNumber}`}>View Detail</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};