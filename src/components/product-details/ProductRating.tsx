import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  rating: number;
  reviewCount: number;
}

export const ProductRating: React.FC<Props> = ({ rating, reviewCount }) => (
  <div className="flex items-center gap-4 text-sm">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-5 w-5',
            i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
          )}
        />
      ))}
      <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground">
      <MessageSquare className="h-5 w-5" />
      <span>{reviewCount} comments</span>
    </div>
  </div>
);