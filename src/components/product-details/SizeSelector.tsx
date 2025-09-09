import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  sizes: string[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
}

export const SizeSelector: React.FC<Props> = ({ sizes, selectedSize, onSelectSize }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-md font-semibold text-foreground">Select Size</h3>
      <a href="#" className="text-sm text-muted-foreground hover:text-primary flex items-center">
        Size Guide <ArrowRight className="ml-1 h-4 w-4" />
      </a>
    </div>
    <div className="flex gap-2 flex-wrap">
      {sizes.map(size => (
        <Button
          key={size}
          variant="outline"
          onClick={() => onSelectSize(size)}
          className={cn(
            'rounded-md',
            selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : ''
          )}
        >
          {size}
        </Button>
      ))}
    </div>
  </div>
);