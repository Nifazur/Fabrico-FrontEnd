/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/dashboard/OrderStatusPieChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface Props {
  data: { name: string; value: number; fill: string }[];
}

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center items-center gap-4 mt-4 text-sm">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const OrderStatusPieChart: React.FC<Props> = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Order Status</CardTitle>
    </CardHeader>
    <CardContent className="h-72 flex flex-col justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} paddingAngle={2}>
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
          </Pie>
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);