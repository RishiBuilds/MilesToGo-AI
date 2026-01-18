'use client';
import React, { useState } from 'react';
import { Minus, Plus, Calendar } from 'lucide-react';

type Props = {
    onSelectedOption: (value: string) => void;
};

function SelectDays({ onSelectedOption }: Props) {
    const [days, setDays] = useState(3);

    const decrementDays = () => setDays(prev => Math.max(1, prev - 1));
    const incrementDays = () => setDays(prev => Math.min(30, prev + 1));

    return (
        <div className="panel flex flex-col items-center p-4 mt-3 animate-fade-in">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="text-sm font-medium">Trip Duration</span>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={decrementDays}
                    disabled={days <= 1}
                    aria-label="Decrease days"
                    className="action-icon !border border-border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="text-center min-w-[80px]">
                    <span className="text-2xl font-semibold text-foreground tabular-nums">
                        {days}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                        {days === 1 ? 'Day' : 'Days'}
                    </span>
                </div>

                <button
                    onClick={incrementDays}
                    disabled={days >= 30}
                    aria-label="Increase days"
                    className="action-icon !border border-border disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>

            <button
                onClick={() => onSelectedOption(`${days} ${days === 1 ? 'Day' : 'Days'}`)}
                className="mt-4 w-full px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
                Confirm {days} {days === 1 ? 'Day' : 'Days'}
            </button>
        </div>
    );
}

export default SelectDays;
