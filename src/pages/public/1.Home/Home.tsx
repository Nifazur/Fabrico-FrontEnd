// src/pages/HomePage.tsx
import React from 'react';

// Import all the new section components
import { HeroSlider } from '../../../components/home/HeroSlider';
import { PromoBanners } from '../../../components/home/PromoBanners';
import { NewArrivalCarousel } from '../../../components/home/NewArrivalCarousel';
import { BigSavingZone } from '../../../components/home/BigSavingZone';
import { EverydayFashionBanner } from '../../../components/home/EverydayFashionBanner';
import { CategoryGrid } from '../../../components/home/CategoryGrid';

const menCategories = [
  { name: 'Shirts', img: 'https://i.ibb.co.com/qjyGyRB/c1.jpg', link: '/products?subcategory=shirts' },
  { name: 'Printed T-Shirts', img: 'https://i.ibb.co.com/tpDdxXY/c2.jpg', link: '/products?subcategory=t-shirts' },
  { name: 'Plain T-Shirt', img: 'https://i.ibb.co.com/23gjxxj/c3.jpg', link: '/products?subcategory=t-shirts' },
  { name: 'Polo T-Shirt', img: 'https://i.ibb.co.com/80kTV2M/c4.jpg', link: '/products?subcategory=t-shirts' },
  { name: 'Hoodies & Sweetshirt', img: 'https://i.ibb.co.com/N1C6G2n/c5.jpg', link: '/products?subcategory=hoodies' },
  { name: 'Jeans', img: 'https://i.ibb.co.com/RTqYY9J/c6.jpg', link: '/products?subcategory=jeans' },
  { name: 'Activewear', img: 'https://i.ibb.co.com/31HndNK/c7.jpg', link: '/products?subcategory=activewear' },
  { name: 'Boxers', img: 'https://i.ibb.co.com/tbKJwP8/c8.jpg', link: '/products?subcategory=boxers' },
];

const womenCategories = [
  { name: 'Hoodies & Sweetshirt', img: 'https://i.ibb.co.com/G4L6mBq6/product-6.jpg', link: '/products?subcategory=hoodies' },
  { name: 'Coats & Parkas', img: 'https://i.ibb.co.com/MxFy9kZm/product-5.jpg', link: '/products?subcategory=coats' },
  { name: 'Tees & T-Shirt', img: 'https://i.ibb.co.com/wbm7NTx/product-1.jpg', link: '/products?subcategory=t-shirts' },
  { name: 'Boxers', img: 'https://i.ibb.co.com/cqkDTzC/product-4.jpg', link: '/products?subcategory=boxers' },
];

const Home: React.FC = () => {
  return (
    <div className="bg-secondary space-y-20">
      <HeroSlider />
      <hr />
      <PromoBanners />

      <hr />
      <NewArrivalCarousel />
      <hr />
      <BigSavingZone />
      <hr />
      <EverydayFashionBanner />
      <hr />
      <CategoryGrid title="Categories For Men" categories={menCategories} />
      <hr />
      <CategoryGrid title="Categories For Women" categories={womenCategories} />
      <hr />
    </div>


  );
};

export default Home