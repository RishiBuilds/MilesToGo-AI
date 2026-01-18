'use client';
import React from 'react';
import { motion } from 'motion/react';

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget',
        desc: 'Stay conscious of costs',
        icon: '💵',
        gradient: 'from-emerald-400 to-teal-500',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balanced comfort & cost',
        icon: '💰',
        gradient: 'from-amber-400 to-orange-500',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium experiences',
        icon: '💎',
        gradient: 'from-[oklch(0.58_0.22_335)] to-[oklch(0.55_0.2_350)]',
    },
];

type Props = {
    onSelectedOption: (value: string) => void;
};

function BudgetUi({ onSelectedOption }: Props) {
    return (
        <div className="grid grid-cols-3 gap-2 mt-3">
            {SelectBudgetOptions.map((item, index) => (
                <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectedOption(`${item.title}: ${item.desc}`)}
                    className="group flex flex-col items-center text-center p-3 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                    <div className={`text-2xl p-2.5 rounded-xl bg-linear-to-br ${item.gradient} mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.desc}</p>
                </motion.button>
            ))}
        </div>
    );
}

export default BudgetUi;