// src/pages/CheckoutPage.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useCreateOrderMutation } from '../../redux/features/orderApi';
import { BillingDetailsForm } from '../../components/checkout/BillingDetailsForm';
import { OrderSummary } from '../../components/checkout/OrderSummary';
import { ShippingMethod } from '../../components/checkout/ShippingMethod';
import { PaymentMethod } from '../../components/checkout/PaymentMethod';
import { Button } from '../../components/ui/button';

// Zod schema for form validation
const billingSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  country: z.string().min(2, 'Country is required'),
  street: z.string().min(5, 'Street address is required'),
  apt: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(4, 'Postal code is required'),
  phone: z.string().min(10, 'A valid phone number is required'),
});

type BillingFormValues = z.infer<typeof billingSchema>;

export const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<'CASH_ON_DELIVERY' | 'CARD'>('CASH_ON_DELIVERY');
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    mode: "onChange", // important: validate on change
    defaultValues: {
      country: "Bangladesh",
      state: "Dhaka Division",
    }
  });

  const handlePlaceOrder = async (data: BillingFormValues) => {
    if (paymentMethod === 'CARD') {
      toast.info("Card payment is not yet available. Please select Cash on Delivery.");
      return;
    }

    const orderPayload = {
      shippingAddress: {
        fullName: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        street: data.apt ? `${data.street}, ${data.apt}` : data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      },
      paymentMethod: paymentMethod,
      notes: "Please deliver promptly."
    };

    try {
      await createOrder(orderPayload).unwrap();
      toast.success("Order placed successfully!");
      navigate('/order-confirmation');
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order creation failed:", error);
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center">
          <span className="w-1 h-8 bg-primary mr-4"></span>
          Check Out
        </h1>
        
        <form onSubmit={form.handleSubmit(handlePlaceOrder)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8 ">
              <BillingDetailsForm form={form} />
              <ShippingMethod />
              <PaymentMethod selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5">
              <OrderSummary />
              <Button 
                type="submit" 
                size="lg" 
                className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!form.formState.isValid || isLoading} // ✅ Disable if form invalid or loading
              >
                {isLoading ? 'Placing Order...' : 'Pay Now'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};