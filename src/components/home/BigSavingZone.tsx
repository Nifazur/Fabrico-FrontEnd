/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/home/BigSavingZone.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from './SectionTitle';
import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';
import { Badge } from '../ui/badge';

// Helper component
const SavingCard = ({ title, desc, offer, img, bgColor, textColor, className, badge }: any) => (
  <div className={`relative rounded-lg overflow-hidden ${className} text-${textColor}`} style={{ backgroundColor: bgColor }}>
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover"/>
    <div className="absolute inset-0 bg-black/20" />
    <div className="relative p-6 flex flex-col h-full">
      {badge && <Badge className="absolute top-4 right-4 bg-black text-white">{badge}</Badge>}
      <h3 className="text-3xl font-bold">{title}</h3>
      <p>{desc}</p>
      <p className="font-semibold mt-1">{offer}</p>
      <ArrowDown className="my-4"/>
      <div className="mt-auto">
        <Button asChild  className="">
          <Link to='/products'>SHOP NOW</Link>
        </Button>
      </div>
    </div>
  </div>
);

export const BigSavingZone: React.FC = () => (
  <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 space-y-20'>
    <SectionTitle>Big Saving Zone</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SavingCard className="lg:row-span-2 min-h-[300px]" title="Hawaiian Shirts" desc="Dress up in summer vibe" offer="UPTO 50% OFF" img="https://i.ibb.co.com/fYrqszd2/big-Saving-1.jpg" link="/products" bgColor="#D6F4F6" textColor="white" />
      <SavingCard className="min-h-[250px]" title="Printed T-Shirt" desc="New Designs Every Week" offer="UPTO 40% OFF" img="https://i.ibb.co.com/v4fZWD2B/big-Saving-2.jpg" link="/products" bgColor="#F5F5F5" textColor="white" badge="Limited Stock" />
      <SavingCard className="min-h-[250px]" title="Cargo Joggers" desc="Move with style & comfort" offer="UPTO 50% OFF" img="https://i.ibb.co.com/QvWgGgXc/big-Saving-3.jpg" link="/products" bgColor="#D6F4F6" textColor="white" />
      <SavingCard className="min-h-[250px]" title="Urban Shirts" desc="Live In Comfort" offer="FLAT 60% OFF" img="https://i.ibb.co.com/rj4SDgX/big-Saving-4.jpg" link="/products" bgColor="#F5F5F5" textColor="white" />
      <SavingCard className="min-h-[250px]" title="Oversized T-Shirts" desc="Street Style Icon" offer="FLAT 60% OFF" img="https://i.ibb.co.com/WWgBc05H/big-Saving-5.jpg" link="/products" bgColor="#D6F4F6" textColor="white" />
    </div>
  </section>
);