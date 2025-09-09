/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/product/ProductForm.tsx
import React, { useEffect } from 'react';
import { useForm, useFieldArray, useWatch, type Control, type UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import slugify from 'slugify';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Switch } from '../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../ui/card';
import { Trash2, PlusCircle, Loader2, X } from 'lucide-react';
import { type IProduct } from '../../../types';

// Data Constants
const COLORS = [
  { name: 'Red', value: 'red' }, { name: 'Blue', value: 'blue' }, { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' }, { name: 'Black', value: 'black' }, { name: 'White', value: 'white' },
  { name: 'Gray', value: 'gray' }, { name: 'Violet', value: 'violet' }, { name: 'Teal', value: 'teal' },
  { name: 'Sky', value: 'sky' }, { name: 'Amber', value: 'amber' }, { name: 'Orange', value: 'orange' },
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SUBCATEGORIES = ['t-shirts', 'shirts', 'jeans', 'dresses', 'tops', 'skirts', 'jackets', 'hoodies', 'sweaters'];

// Zod Schema
const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  slug: z.string().min(3, { message: "Slug is required." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number({ error: "Price must be a number." }).min(0),
  comparePrice: z.coerce.number({ error: "Price must be a number." }).optional(),
  category: z.string({ error: "Please select a category." }),
  subcategory: z.string({ error: "Please select a subcategory." }),
  brand: z.string().min(2, { message: "Brand is required." }),
  gender: z.enum(['male', 'female', 'unisex'], { error: "Gender is required." }),
  tags: z.string().optional(),
  featured: z.boolean().default(false),
  images: z.array(z.object({ url: z.string().url({ message: "Please enter a valid URL." }) })).min(1, { message: "At least one image is required." }),
  variants: z.array(z.object({
    size: z.string().min(1, { message: "Size is required." }),
    color: z.string().min(1, { message: "Color is required." }),
    stock: z.coerce.number({ error: "Stock must be a number."}).min(0),
    sku: z.string().min(3, { message: "SKU is required." }),
  })).min(1, { message: "At least one variant is required." }),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// VariantRow Helper Component
const VariantRow: React.FC<{ 
  index: number; 
  control: Control<ProductFormValues>; 
  setValue: UseFormSetValue<ProductFormValues>;
  remove: (index: number) => void; 
  canRemove: boolean 
}> = ({ index, control, setValue, remove, canRemove }) => {
  const variant = useWatch({ control, name: `variants.${index}` });
  const subcategory = useWatch({ control, name: 'subcategory' });

  useEffect(() => {
    if (subcategory && variant.size && variant.color) {
      const sku = `${subcategory.toUpperCase().substring(0, 4)}-${variant.size}-${variant.color.toUpperCase().substring(0, 3)}-${Math.floor(100 + Math.random() * 900)}`;
      setValue(`variants.${index}.sku`, sku);
    }
  }, [variant.size, variant.color, subcategory, index, setValue]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start p-4 border rounded-md relative">
      <FormField control={control} name={`variants.${index}.size`} render={({ field }) => (
        <FormItem><FormLabel>Size</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger></FormControl>
            <SelectContent>{SIZES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={control} name={`variants.${index}.color`} render={({ field }) => (
        <FormItem><FormLabel>Color</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Select color" /></SelectTrigger></FormControl>
            <SelectContent>{COLORS.map(c => <SelectItem key={c.value} value={c.value}>{c.name}</SelectItem>)}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={control} name={`variants.${index}.stock`} render={({ field }) => (<FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" placeholder="e.g., 50" {...field} /></FormControl><FormMessage /></FormItem>)} />
      <FormField control={control} name={`variants.${index}.sku`} render={({ field }) => (<FormItem><FormLabel>SKU</FormLabel><FormControl><Input readOnly placeholder="Auto-generated" {...field} /></FormControl><FormMessage /></FormItem>)} />
      {canRemove && (
          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="absolute top-1 right-1 h-6 w-6"><X className="h-4 w-4 text-destructive" /></Button>
      )}
    </div>
  );
};

// Main Reusable Form Component
interface ProductFormProps {
  initialData?: IProduct | null;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData ? {
        ...initialData,
        tags: initialData.tags?.join(', '),
        images: initialData.images.map(url => ({ url })),
    } : {
      featured: false,
      images: [{ url: '' }],
      variants: [{ size: '', color: '', stock: 0, sku: '' }],
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        tags: initialData.tags?.join(', '),
        images: initialData.images.map(url => ({ url })),
      });
    }
  }, [initialData, form]);

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control: form.control, name: "images" });
  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({ control: form.control, name: "variants" });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('name', e.target.value);
    const slug = slugify(e.target.value, { lower: true, strict: true });
    form.setValue('slug', slug);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{initialData ? "Update Product" : "Create New Product"}</h1>
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? "Save Changes" : "Create Product"}
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle>Product Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Premium Cotton T-Shirt" {...field} onChange={handleNameChange} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl><Input readOnly placeholder="auto-generated-from-name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Describe the product..." {...field} rows={5} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Product Images</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {imageFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-4">
                        <FormField control={form.control} name={`images.${index}.url`} render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        {imageFields.length > 1 && (
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}><Trash2 className="h-4 w-4" /></Button>
                        )}
                    </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => appendImage({ url: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Image
                </Button>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Product Variants</CardTitle>
                    <CardDescription>Add combinations of size, color, stock, and SKU.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {variantFields.map((field, index) => (
                        <VariantRow key={field.id} index={index} control={form.control} setValue={form.setValue} remove={removeVariant} canRemove={variantFields.length > 1} />
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => appendVariant({ size: '', color: '', stock: 0, sku: '' })}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Variant
                    </Button>
                </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={form.control} name="price" render={({ field }) => (<FormItem><FormLabel>Price ($)</FormLabel><FormControl><Input type="number" placeholder="e.g., 999.99" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="comparePrice" render={({ field }) => (<FormItem><FormLabel>Compare At Price (Optional)</FormLabel><FormControl><Input type="number" placeholder="e.g., 1299.99" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Organization</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="clothing">Clothing</SelectItem><SelectItem value="accessories">Accessories</SelectItem></SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="subcategory" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a subcategory" /></SelectTrigger></FormControl>
                        <SelectContent>{SUBCATEGORIES.map(sub => <SelectItem key={sub} value={sub}>{sub.charAt(0).toUpperCase() + sub.slice(1)}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="brand" render={({ field }) => (<FormItem><FormLabel>Brand</FormLabel><FormControl><Input placeholder="e.g., Fabrico" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem className="space-y-3"><FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="unisex" /></FormControl><FormLabel className="font-normal">Unisex</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="tags" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl><Input placeholder="e.g., cotton, casual, summer" {...field} /></FormControl>
                        <CardDescription>Separate tags with commas.</CardDescription>
                        <FormMessage />
                    </FormItem>
                )} />
              </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
                <CardContent>
                    <FormField control={form.control} name="featured" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Featured Product</FormLabel>
                                <CardDescription>Display this product on the homepage.</CardDescription>
                            </div>
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        </FormItem>
                    )} />
                </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};