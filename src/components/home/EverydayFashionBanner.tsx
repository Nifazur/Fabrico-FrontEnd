// src/components/home/EverydayFashionBanner.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export const EverydayFashionBanner: React.FC = () => (
  <section className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 space-y-20">
    <div className="relative rounded-lg overflow-hidden h-120">
      <img src="https://i.ibb.co.com/p6CVBrgc/everyday-1.jpg" alt="Fashion Better" className="w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8 text-white">
        <h3 className="text-3xl font-bold">WE MADE YOUR EVERYDAY FASHION BETTER!</h3>
        <p className="mt-2 text-sm">In our journey to improve every day fashion.</p>
        <Button asChild className="mt-4 w-fit">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>
    </div>
    <div className="rounded-lg overflow-hidden h-120">
        <img src="https://i.ibb.co.com/5gb4LpvM/everyday-2.jpg" alt="Happy couple" className="w-full h-full object-cover"/>
    </div>
  </section>
);