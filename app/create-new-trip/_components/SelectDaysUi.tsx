'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Minus, Plus, Calendar } from 'lucide-react';

type Props = {
    onSelectedOption: (value: string) => void;
};

function SelectDays({ onSelectedOption }: Props) {
    const [days, setDays] = useState(3);

    const decrementDays = () => setDays(prev => Math.max(1, prev - 1));
    const incrementDays = () => setDays(prev => Math.min(30, prev + 1));

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center p-4 mt-3 rounded-xl border border-border bg-card"
        >
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Trip Duration</span>
            </div>

            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={decrementDays}
                    disabled={days <= 1}
                    className="p-2.5 rounded-xl border border-border bg-muted hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Minus className="h-4 w-4" />
                </motion.button>

                <div className="text-center min-w-80px">
                    <span className="text-3xl font-bold text-foreground">{days}</span>
                    <span className="text-muted-foreground text-sm ml-1">
                        {days === 1 ? 'Day' : 'Days'}
                    </span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={incrementDays}
                    disabled={days >= 30}
                    className="p-2.5 rounded-xl border border-border bg-muted hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Plus className="h-4 w-4" />
                </motion.button>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectedOption(`${days} ${days === 1 ? 'Day' : 'Days'}`)}
                className="mt-4 w-full px-4 py-2.5 rounded-xl bg-linear-to-r from-[oklch(0.58_0.22_335)] to-[oklch(0.52_0.2_350)] hover:from-[oklch(0.54_0.22_335)] hover:to-[oklch(0.48_0.2_350)] text-white font-medium text-sm shadow-lg shadow-primary/25 transition-all"
            >
                Confirm {days} {days === 1 ? 'Day' : 'Days'}
            </motion.button>
        </motion.div>
    );
}

export default SelectDays;
