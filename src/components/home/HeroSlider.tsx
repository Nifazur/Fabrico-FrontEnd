// src/components/home/HeroSlider.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '../ui/button';

const slides = [
  {
    textColor: 'hsl(var(--background))', // White text
    title: 'Summer Value Pack',
    subtitle: 'cool / colorful / comfy',
    category: 'T-Shirt / Tops',
    img: 'https://i.ibb.co.com/5X9XZXht/hero.png',
  },
  {
    textColor: 'hsl(var(--accent-foreground))', // Accent foreground color
    title: 'Winter Collection',
    subtitle: 'warm / stylish / cozy',
    category: 'Hoodies / Jackets',
    img: 'https://i.ibb.co.com/6kJXXQM/hero2.png',
  },
];

export const HeroSlider: React.FC = () => (
  <section className="relative bg-secondary dark:bg-secondary">
    <Carousel className="max-w-7xl mx-auto" opts={{ loop: true, align: "start" }}>
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div 
              className="relative overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 place-items-center  gap-8 py-16 lg:py-20 px-10 min-h-[500px] lg:min-h-[600px]">
                  {/* Content Section */}
                  <div 
                    className="space-y-6 text-center lg:text-left z-10 relative px-8"
                    style={{ color: slide.textColor }}
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-medium uppercase tracking-wider opacity-90">
                        {slide.category}
                      </p>
                      <h1 className="text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg lg:text-xl font-light tracking-wide opacity-95">
                        {slide.subtitle}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        asChild 
                        size="lg"
                      >
                        <Link to="/products">Shop Now</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className='flex justify-end'>
                    <img src={slide.img} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Navigation Arrows */}
      <CarouselPrevious className="left-6 bg-white/80 hover:bg-white border-0 shadow-lg backdrop-blur-sm" />
      <CarouselNext className="right-6 bg-white/80 hover:bg-white border-0 shadow-lg backdrop-blur-sm" />
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div 
            key={index}
            className="w-2 h-2 rounded-full bg-white/60 hover:bg-white/80 transition-all duration-200"
          ></div>
        ))}
      </div>
    </Carousel>
  </section>
);