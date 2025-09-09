// src/components/product-details/ProductDescriptionTabs.tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { type IProduct } from '../../types';
import { PlayCircle } from 'lucide-react';

interface Props {
    product: IProduct;
}

export const ProductDescriptionTabs: React.FC<Props> = ({ product }) => {
  // A helper to create a specs object for the grid
  const specs = {
    Fabric: "Bio-washed Cotton", // Placeholder
    Pattern: "Printed", // Placeholder
    Fit: "Regular-fit", // Placeholder
    Neck: "Round Neck", // Placeholder
    Sleeve: "Half-sleeves", // Placeholder
    Style: "Casual Wear" // Placeholder
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-1 h-7 bg-primary mr-3"></span>
        Product Description
      </h2>
      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="comments">User comments <span className="ml-2 bg-muted text-foreground text-xs px-2 py-0.5 rounded-full">21</span></TabsTrigger>
          <TabsTrigger value="qa">Question & Answer <span className="ml-2 bg-muted text-foreground text-xs px-2 py-0.5 rounded-full">4</span></TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <div className="mt-6 grid grid-cols-2 border rounded-lg">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="p-4 border-b border-r">
                    <p className="text-sm font-semibold text-foreground">{key}</p>
                    <p className="text-sm text-muted-foreground">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden group">
                <img src={product.images[0]} alt="Product video thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                    <PlayCircle className="h-16 w-16 mb-2 text-white/80 group-hover:scale-110 transition-transform"/>
                    <p className="font-semibold">{product.name}</p>
                </div>
                <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">1:00 M</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="comments" className="mt-6">
          <p>User comments will be displayed here.</p>
        </TabsContent>
        <TabsContent value="qa" className="mt-6">
          <p>Questions and Answers will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};