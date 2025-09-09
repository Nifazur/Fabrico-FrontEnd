// src/components/admin/dashboard/StatCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface Props {
  title: string;
  value: string | number;
}

export const StatCard: React.FC<Props> = ({ title, value }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
  </Card>
);