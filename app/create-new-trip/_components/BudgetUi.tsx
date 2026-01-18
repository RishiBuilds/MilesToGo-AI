'use client';
import React from 'react';

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget',
        desc: 'Stay conscious of costs',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balanced comfort & cost',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium experiences',
        icon: '💎',
    },
];

type Props = {
    onSelectedOption: (value: string) => void;
};

function BudgetUi({ onSelectedOption }: Props) {
    return (
        <div className="grid grid-cols-3 gap-2 mt-3">
            {SelectBudgetOptions.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelectedOption(`${item.title}: ${item.desc}`)}
                    className="card-interactive flex flex-col items-center text-center p-3 group"
                >
                    <span className="text-xl mb-2" role="img" aria-label={item.title}>
                        {item.icon}
                    </span>
                    <h3 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                        {item.desc}
                    </p>
                </button>
            ))}
        </div>
    );
}

export default BudgetUi;