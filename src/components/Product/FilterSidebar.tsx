// components/FilterSidebar.tsx
import React from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { type IProductQuery } from '../../types';

interface FilterSidebarProps {
  filters: IProductQuery;
  selectedColors: string[];
  selectedSizes: string[];
  selectedCategories: string[];
  onFilterChange: (filters: Partial<IProductQuery>) => void;
  onColorChange: (colors: string[]) => void;
  onSizeChange: (sizes: string[]) => void;
  onCategoryChange: (categories: string[]) => void;
  onClearFilters: () => void;
  className?: string;
}

// Note: These are hardcoded. For a real app, you would likely fetch these from an API.
const COLORS = [
  { name: 'Violet', value: 'violet', className: 'bg-chart-1' },
  { name: 'Teal', value: 'teal', className: 'bg-chart-2' },
  { name: 'Sky', value: 'sky', className: 'bg-chart-3' },
  { name: 'Amber', value: 'amber', className: 'bg-chart-4' },
  { name: 'Orange', value: 'orange', className: 'bg-chart-5' },
  { name: 'Red', value: 'red', className: 'bg-red-500' },
  { name: 'Blue', value: 'blue', className: 'bg-blue-500' },
  { name: 'Green', value: 'green', className: 'bg-green-500' },
  { name: 'Yellow', value: 'yellow', className: 'bg-yellow-500' },
  { name: 'Gray', value: 'gray', className: 'bg-gray-500' },
  { name: 'Black', value: 'black', className: 'bg-black' },
  { name: 'White', value: 'white', className: 'bg-white' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CATEGORIES = ['t-shirts', 'shirts', 'jeans', 'dresses', 'tops', 'skirts', 'jackets', 'hoodies', 'sweaters'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  selectedColors,
  selectedSizes,
  selectedCategories,
  onFilterChange,
  onColorChange,
  onSizeChange,
  onCategoryChange,
  onClearFilters,
  className,
}) => {
  const handlePriceChange = (value: number[]) => {
    onFilterChange({ minPrice: value[0], maxPrice: value[1] });
  };

  // --- FIX: All handlers now call onFilterChange to trigger API refetch ---

  const handleColorToggle = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    onColorChange(newColors);
    // Also update the main filter object. Use `undefined` if empty to remove from query.
    onFilterChange({ color: newColors.join(',') || undefined });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    onSizeChange(newSizes);
    onFilterChange({ size: newSizes.join(',') || undefined });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newCategories);
    onFilterChange({ category: newCategories.join(',') || undefined });
  };

  return (
    <div className={cn("bg-card rounded-lg border border-border p-6 space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={onClearFilters}
          className="hover:bg-secondary/80"
        >
          Clear all
        </Button>
      </div>

      <Separator className="bg-border" />

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-foreground">Price Range</Label>
        <div className="px-2">
          <Slider
            value={[filters.minPrice || 0, filters.maxPrice || 10000]}
            onValueChange={handlePriceChange}
            min={0}
            max={10000}
            step={100}
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={filters.minPrice || 0}
            onChange={(e) => handlePriceChange([parseInt(e.target.value) || 0, filters.maxPrice || 10000])}
            className="w-24 h-8 text-sm bg-input border-border"
            min={0}
            max={filters.maxPrice || 10000}
          />
          <span className="text-sm text-muted-foreground">to</span>
          <Input
            type="number"
            value={filters.maxPrice || 10000}
            onChange={(e) => handlePriceChange([filters.minPrice || 0, parseInt(e.target.value) || 10000])}
            className="w-24 h-8 text-sm bg-input border-border"
            min={filters.minPrice || 0}
            max={10000}
          />
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Colors</Label>
        <div className="grid grid-cols-6 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorToggle(color.value)}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all relative",
                color.className,
                selectedColors.includes(color.value)
                  ? "border-primary scale-110 ring-2 ring-primary/20"
                  : "border-border hover:border-muted-foreground hover:scale-105",
                color.value === 'white' && "border-gray-300"
              )}
              title={color.name}
            >
              {selectedColors.includes(color.value) && (
                <span className={cn("absolute inset-0 flex items-center justify-center text-xs font-bold", color.value === 'white' ? "text-foreground" : "text-white")}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Sizes */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Sizes</Label>
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => handleSizeToggle(size)}
              className={cn( "h-8", selectedSizes.includes(size) ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-border hover:bg-accent hover:text-accent-foreground")}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Categories</Label>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer text-foreground hover:text-primary capitalize"
              >
                {category.replace('-', ' ')}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};