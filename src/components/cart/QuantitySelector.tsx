// src/components/cart/QuantitySelector.tsx
import React from 'react';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  isLoading?: boolean;
}

export const QuantitySelector: React.FC<Props> = ({ quantity, onIncrease, onDecrease, isLoading }) => {
  return (
    <div className="flex items-center bg-muted rounded-md w-fit">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground"
        onClick={onDecrease}
        disabled={quantity <= 1 || isLoading}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center font-medium">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-muted-foreground"
        onClick={onIncrease}
        disabled={isLoading}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};