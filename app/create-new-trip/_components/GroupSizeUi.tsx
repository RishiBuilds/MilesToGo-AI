'use client';
import React from 'react';
import { motion } from 'motion/react';

export const SelectTravelesList = [
    {
        id: 1,
        title: 'Solo',
        desc: 'Just me',
        icon: '🎒',
        people: '1 person',
        gradient: 'from-blue-400 to-cyan-500',
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Two travelers',
        icon: '💑',
        people: '2 people',
        gradient: 'from-pink-400 to-rose-500',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Fun together',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5 people',
        gradient: 'from-amber-400 to-orange-500',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Group trip',
        icon: '🎉',
        people: '5+ people',
        gradient: 'from-[oklch(0.58_0.22_335)] to-[oklch(0.55_0.2_350)]',
    },
];

type Props = {
    onSelectedOption: (value: string) => void;
};

function GroupSizeUi({ onSelectedOption }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {SelectTravelesList.map((item, index) => (
                <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectedOption(`${item.title}: ${item.people}`)}
                    className="group flex flex-col items-center text-center p-3 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                    <div className={`text-2xl p-2 rounded-xl bg-linear-to-br ${item.gradient} mb-2 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.people}</p>
                </motion.button>
            ))}
        </div>
    );
}

export default GroupSizeUi;