import React from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { Info } from 'lucide-react';
import { cn } from '../../lib/utils';

// Dummy card icons - replace with actual SVGs or an icon library if available
const GooglePay = () => <div className="border rounded px-2 py-1 text-sm">G Pay</div>
const Visa = () => <div className="border rounded px-2 py-1 text-sm font-bold text-blue-800">VISA</div>
const PayPal = () => <div className="border rounded px-2 py-1 text-sm font-bold text-blue-900">PayPal</div>

interface Props {
  selectedMethod: 'CASH_ON_DELIVERY' | 'CARD';
  onMethodChange: (value: 'CASH_ON_DELIVERY' | 'CARD') => void;
}

export const PaymentMethod: React.FC<Props> = ({ selectedMethod, onMethodChange }) => {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
      <p className="text-sm text-muted-foreground mb-6">All transactions are secure and encrypted.</p>
      
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
        <div className={cn("p-4 border rounded-md", selectedMethod === 'CARD' && 'border-primary')}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="CARD" id="card" />
                <Label htmlFor="card" className="font-semibold">Credit Card</Label>
            </div>
            {selectedMethod === 'CARD' && (
                <div className="mt-4 pl-6 space-y-4">
                    <Alert variant="default" className="bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-700">
                            Card payment option is coming soon! Please select Cash on Delivery for now.
                        </AlertDescription>
                    </Alert>
                    <div className="flex items-center gap-2">
                        <GooglePay /> <Visa /> <PayPal />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Card number" disabled />
                        <Input placeholder="Name of card" disabled />
                        <Input placeholder="Expiration date (MM/YY)" disabled />
                        <Input placeholder="Security Code" disabled />
                    </div>
                </div>
            )}
        </div>

        <div className={cn("p-4 border rounded-md", selectedMethod === 'CASH_ON_DELIVERY' && 'border-primary')}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="CASH_ON_DELIVERY" id="cod" />
                <Label htmlFor="cod" className="font-semibold">Cash on delivery</Label>
            </div>
            {selectedMethod === 'CASH_ON_DELIVERY' && <p className="text-sm text-muted-foreground mt-2 pl-6">Pay with cash upon delivery.</p>}
        </div>
      </RadioGroup>
    </div>
  );
};
