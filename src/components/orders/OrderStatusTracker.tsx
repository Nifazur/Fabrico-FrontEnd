// src/components/orders/OrderStatusTracker.tsx
import React from 'react';
import { Check, Truck, MapPin, Clock, X, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils'; // Make sure this path is correct

interface Props {
  status: string;
}

const STEPS = [
  { status: 'PENDING', label: 'Order Placed', icon: Clock },
  { status: 'CONFIRMED', label: 'Confirmed', icon: Check },
  { status: 'PROCESSING', label: 'In Progress', icon: RefreshCw },
  { status: 'SHIPPED', label: 'Shipped', icon: Truck },
  { status: 'DELIVERED', label: 'Delivered', icon: MapPin },
];

// Helper to get a status description
function getStatusDescription(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Your order has been received and is awaiting confirmation.';
    case 'CONFIRMED':
      return 'Your order has been confirmed and will be processed soon.';
    case 'PROCESSING':
      return 'Your order is being prepared and will be shipped shortly.';
    case 'SHIPPED':
      return 'Your order has been shipped and is on its way to you.';
    case 'DELIVERED':
      return 'Your order has been successfully delivered. Enjoy!';
    default:
      return 'Order status updated.';
  }
}

export const OrderStatusTracker: React.FC<Props> = ({ status }) => {
  const normalizedStatus = status.toUpperCase();
  const currentStatusIndex = STEPS.findIndex(step => step.status === normalizedStatus);

  // Handle Cancelled State
  if (normalizedStatus === 'CANCELLED') {
    return (
      <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-destructive" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-destructive mb-2">Order Cancelled</h3>
        <p className="text-destructive/80">This order has been cancelled.</p>
      </div>
    );
  }

  // Handle Refunded State
  if (normalizedStatus === 'REFUNDED') {
    return (
      <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-primary mb-2">Order Refunded</h3>
        <p className="text-primary/80">This order has been successfully refunded.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* --- Desktop View (Horizontal) --- */}
      <div className="hidden md:block relative">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            const isUpcoming = index > currentStatusIndex;
            const IconComponent = step.icon;

            return (
              <div key={step.status} className="flex flex-col items-center relative z-10 w-1/5">
                <div className={cn('w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 mb-3',
                    isCompleted && 'bg-primary border-primary text-primary-foreground shadow-lg',
                    isCurrent && 'bg-primary border-primary text-primary-foreground shadow-lg animate-pulse',
                    isUpcoming && 'bg-muted border-border text-muted-foreground'
                )}>
                  {isCompleted ? <Check className="w-6 h-6" /> : <IconComponent className="w-6 h-6" />}
                </div>
                <div className="text-center">
                  <p className={cn("text-sm font-medium transition-colors",
                      (isCompleted || isCurrent) ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute top-6 left-10 right-10 h-1 bg-border -z-0">
          <div className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: currentStatusIndex >= 0 ? `${(currentStatusIndex / (STEPS.length - 1)) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* --- Mobile View (Vertical) --- */}
      <div className="md:hidden relative">
        {/* Vertical Connecting Line */}
        <div className="absolute left-6 top-6 bottom-6 w-1 bg-border -z-0">
           <div className="h-full w-full bg-primary transition-all duration-500 ease-out"
            style={{ height: currentStatusIndex >= 0 ? `${(currentStatusIndex / (STEPS.length - 1)) * 100}%` : '0%' }}
          />
        </div>
        {STEPS.map((step, index) => {
            const isCompleted = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            const isUpcoming = index > currentStatusIndex;
            const IconComponent = step.icon;

            return (
              <div key={step.status} className="flex items-start gap-6 relative z-10 mb-8 last:mb-0">
                <div className={cn('w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 shrink-0',
                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                    isCurrent && 'bg-primary border-primary text-primary-foreground animate-pulse',
                    isUpcoming && 'bg-muted border-border text-muted-foreground'
                )}>
                  {isCompleted ? <Check className="w-6 h-6" /> : <IconComponent className="w-6 h-6" />}
                </div>
                <div>
                  <p className={cn("font-medium transition-colors",
                      (isCompleted || isCurrent) ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.label}
                  </p>
                   <p className="text-sm text-muted-foreground mt-1">
                      {getStatusDescription(step.status)}
                   </p>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};