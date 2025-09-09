// src/components/cart/CartItemRow.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { type ICartItem } from '../../types';
import { Button } from '../ui/button';
import { QuantitySelector } from './QuantitySelector';

interface Props {
  item: ICartItem;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  isUpdating: boolean;
  isRemoving: boolean;
}

export const CartItemRow: React.FC<Props> = ({ item, onQuantityChange, onRemoveItem, isUpdating, isRemoving }) => {
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="border-b last:border-b-0">
      {/* --- Mobile View: Card Layout (Unchanged) --- */}
      <div className="p-4 md:hidden">
        <div className="flex gap-4">
          <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 rounded-lg object-cover" />
          <div className="flex-1">
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-muted-foreground">Color: {item.variant.color}</p>
            <p className="text-sm text-muted-foreground">Size: {item.variant.size}</p>
            <p className="mt-1 font-medium md:hidden">${item.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onQuantityChange(item._id, item.quantity + 1)}
            onDecrease={() => onQuantityChange(item._id, item.quantity - 1)}
            isLoading={isUpdating}
          />
          <div className="flex items-center gap-4">
            <p className="font-semibold">${subtotal}</p>
            <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item._id)} disabled={isRemoving}>
              <Trash2 className="h-5 w-5 text-destructive" />
            </Button>
          </div>
        </div>
      </div>

      {/* --- Desktop View: Row Layout (FIXED) --- */}
      <div className="hidden md:grid grid-cols-7 gap-4 items-center p-4">
        {/* Product Info (col-span-2) */}
        <div className="col-span-2 flex items-center gap-4">
          <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-muted-foreground">Color: {item.variant.color}</p>
            <p className="text-sm text-muted-foreground">Size: {item.variant.size}</p>
          </div>
        </div>
        
        {/* Price (col-span-1) */}
        <div className="text-center">${item.price.toFixed(2)}</div>
        
        {/* Quantity (col-span-1) */}
        <div className="flex justify-center">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onQuantityChange(item._id, item.quantity + 1)}
            onDecrease={() => onQuantityChange(item._id, item.quantity - 1)}
            isLoading={isUpdating}
          />
        </div>

        {/* Shipping (col-span-1) */}
        <div className="text-center font-medium text-muted-foreground">FREE</div>
        
        {/* Total (col-span-1) */}
        <div className="text-right font-semibold">${subtotal}</div>

        {/* Action: Remove Button (col-span-1) */}
        <div className="text-right">
          <Button variant="ghost" size="icon" onClick={() => onRemoveItem(item._id)} disabled={isRemoving}>
            <Trash2 className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};