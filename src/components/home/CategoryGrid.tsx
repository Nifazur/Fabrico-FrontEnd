// src/components/home/CategoryGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from './SectionTitle';

interface Category {
  name: string;
  img: string;
  link: string;
}

interface Props {
  title: string;
  categories: Category[];
}

export const CategoryGrid: React.FC<Props> = ({ title, categories }) => (
  <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 space-y-20'>
    <SectionTitle>{title}</SectionTitle>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map(category => (
        <Link to={category.link} key={category.name} className="block group">
          <div className="overflow-hidden rounded-lg bg-muted">
            <img src={category.img} alt={category.name} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div>
                <p className="font-semibold text-foreground">{category.name}</p>
                <p className="text-sm text-muted-foreground">Explore Now!</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1"/>
          </div>
        </Link>
      ))}
    </div>
  </section>
);