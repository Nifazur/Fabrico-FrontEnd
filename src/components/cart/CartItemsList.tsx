// src/components/cart/CartItemsList.tsx
import React from 'react';
import { toast } from 'sonner';
import { useUpdateCartItemMutation, useRemoveFromCartMutation } from '../../redux/features/cartApi';
import { type ICartItem } from '../../types';
import { CartItemRow } from './CartItemRow';

interface Props {
  items: ICartItem[];
}

export const CartItemsList: React.FC<Props> = ({ items }) => {
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem({ itemId, data: { quantity: newQuantity } }).unwrap();
    } catch {
      toast.error('Failed to update quantity.');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId).unwrap();
      toast.success('Item removed from cart.');
    } catch {
      toast.error('Failed to remove item.');
    }
  };
  
  return (
    <div>
      {/* Header for large screens - updated with 7 columns */}
      <div className="hidden md:grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground pb-4 border-b">
        <div className="col-span-2">Product</div>
        <div className="text-center">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Shipping</div>
        <div className="text-right">Total</div>
        <div className="text-right">Action</div> {/* Action Header */}
      </div>
      
      {/* List of items */}
      <div className="flex flex-col">
        {items.map((item) => (
          <CartItemRow 
            key={item._id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            isUpdating={isUpdating}
            isRemoving={isRemoving}
          />
        ))}
      </div>
    </div>
  );
};