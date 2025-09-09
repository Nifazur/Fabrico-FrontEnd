// src/components/home/NewArrivalCarousel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from './SectionTitle';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const arrivals = [
  { name: 'Knitted Joggers', img: 'https://i.ibb.co.com/31HndNK/c7.jpg' },
  { name: 'Full Sleeve', img: 'https://i.ibb.co.com/MxFy9kZm/product-5.jpg' },
  { name: 'Active T-Shirts', img: 'https://i.ibb.co.com/gFV3QPq7/new-Arrive-2.jpg' },
  { name: 'Urban Shirts', img: 'https://i.ibb.co.com/gZPJffD8/new-Arrive-3.jpg' },
  { name: 'Stylish Jeans', img: 'https://i.ibb.co.com/MkbgRBy1/new-Arrive-4.jpg' },
];

export const NewArrivalCarousel: React.FC = () => (
  <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 space-y-20'>
    <SectionTitle>New Arrival</SectionTitle>
    <Carousel opts={{ align: "start", loop: true }}>
      <CarouselContent className="-ml-4">
        {arrivals.map((item, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
            <Link to="/products" className="block group">
              <div className="overflow-hidden rounded-lg bg-muted">
                <img src={item.img} alt={item.name} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform" />
              </div>
              <p className="mt-2 font-semibold text-center text-foreground">{item.name}</p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-14 hidden sm:inline-flex" />
      <CarouselNext className="mr-14 hidden sm:inline-flex" />
    </Carousel>
  </section>
);