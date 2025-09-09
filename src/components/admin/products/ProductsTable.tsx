// src/components/admin/products/ProductsTable.tsx
import React from 'react';
import { MoreHorizontal } from "lucide-react";
import { type IProduct } from "../../../types";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { useNavigate } from 'react-router';

interface Props {
  products: IProduct[];
}

export const ProductsTable: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-card border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map(product => (
              <TableRow key={product._id}>
                <TableCell onClick={() => navigate(`/products/${product.slug}`)}>
                  <div className="flex items-center gap-4">
                    <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-md object-cover" />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </TableCell>
                <TableCell onClick={() => navigate(`/products/${product.slug}`)}>${product.price.toFixed(2)}</TableCell>
                <TableCell onClick={() => navigate(`/products/${product.slug}`)}>{product.totalStock}</TableCell>
                <TableCell onClick={() => navigate(`/products/${product.slug}`)}>
                  <Badge variant={product.isActive ? "default" : "secondary"}>
                    {product.isActive ? "Active" : "Archived"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => navigate(`/admin/products/edit/${product.slug}`)}>Edit Product</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete Product</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};