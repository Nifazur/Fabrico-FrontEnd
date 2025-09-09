import React from 'react';
import { cn } from '../../lib/utils';

interface Props {
    colors: string[];
    selectedColor: string | null;
    onSelectColor: (color: string) => void;
}

const colorMap: { [key: string]: string } = {
    violet:'bg-chart-1', 
    teal:'bg-chart-2', 
    sky:'bg-chart-3', 
    amber:'bg-chart-4', 
    orange:'bg-chart-5', 
    red:'bg-red-500', 
    blue:'bg-blue-500', 
    green:'bg-green-500', 
    yellow:'bg-yellow-500', 
    gray:'bg-gray-500', 
    black:'bg-black', 
    white:'bg-white'
};

export const ColorSelector: React.FC<Props> = ({ colors, selectedColor, onSelectColor }) => (
    <div>
        <h3 className="text-md font-semibold text-foreground mb-2">Colors Available</h3>
        <div className="flex gap-3">
            {colors.map(color => (
                <button
                    key={color}
                    onClick={() => onSelectColor(color)}
                    className={cn(
                        'w-8 h-8 rounded-full border-2 transition-all',
                        colorMap[color] || 'bg-gray-300',
                        selectedColor === color
                            ? 'border-primary ring-2 ring-primary/30 scale-110'
                            : 'border-transparent'
                    )}
                    title={color}
                />
            ))}
        </div>
    </div>
);