// src/components/home/SectionTitle.tsx
import React from 'react';

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-4">
    <span className="w-1.5 h-8 bg-primary rounded-full"></span>
    {children}
  </h2>
);