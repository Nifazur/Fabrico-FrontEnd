// src/components/home/PromoBanners.tsx
import React from 'react';
import OffCard from './OffCard';

const cardElement = [
    {
        subTitle: 'Low Price',
        title: "High Conziness",
        image: 'https://i.ibb.co/DCtxytk/explore1.jpg'
    },
    {
        subTitle: 'Beyoung Presents',
        title: "Summer Style",
        image: 'https://i.ibb.co/SBsD1Vq/explore2.png'
    },
]

export const PromoBanners: React.FC = () => (

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl mx-auto place-items-center px-3 lg:px-0'>
        {
            cardElement.map(item => <OffCard subTitle={item.subTitle} title={item.title} image={item.image}></OffCard>)
        }
    </div>
);