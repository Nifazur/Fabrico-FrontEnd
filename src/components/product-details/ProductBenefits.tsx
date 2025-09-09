import React from 'react';
import { ShieldCheck, Shirt, Truck, RefreshCw } from 'lucide-react';

const benefits = [
  { icon: ShieldCheck, text: 'Secure payment' },
  { icon: Shirt, text: 'Size & Fit' },
  { icon: Truck, text: 'Free shipping' },
  { icon: RefreshCw, text: 'Free Shipping & Returns' },
];

export const ProductBenefits: React.FC = () => (
  <div className="grid grid-cols-2 gap-4">
    {benefits.map(benefit => (
      <div key={benefit.text} className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="bg-muted p-2 rounded-full">
          <benefit.icon className="h-5 w-5 text-foreground" />
        </div>
        <span>{benefit.text}</span>
      </div>
    ))}
  </div>
);