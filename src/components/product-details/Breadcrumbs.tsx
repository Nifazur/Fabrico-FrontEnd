import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  category: string;
  subcategory: string;
}

export const Breadcrumbs: React.FC<Props> = ({ category, subcategory }) => (
  <nav className="flex items-center text-sm text-muted-foreground capitalize">
    <Link to="/products" className="hover:text-primary">Shop</Link>
    <ChevronRight className="h-4 w-4 mx-1" />
    <Link to={`/products?category=${category}`} className="hover:text-primary">{category}</Link>
    <ChevronRight className="h-4 w-4 mx-1" />
    <span className="text-foreground">{subcategory}</span>
  </nav>
);