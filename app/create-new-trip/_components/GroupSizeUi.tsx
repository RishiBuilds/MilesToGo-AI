'use client';
import React from 'react';

export const SelectTravelesList = [
    {
        id: 1,
        title: 'Solo',
        desc: 'Just me',
        icon: '🎒',
        people: '1 person',
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Two travelers',
        icon: '💑',
        people: '2 people',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Fun together',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5 people',
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Group trip',
        icon: '🎉',
        people: '5+ people',
    },
];

type Props = {
    onSelectedOption: (value: string) => void;
};

function GroupSizeUi({ onSelectedOption }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            {SelectTravelesList.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelectedOption(`${item.title}: ${item.people}`)}
                    className="card-interactive flex flex-col items-center text-center p-3 group"
                >
                    <span className="text-xl mb-1.5" role="img" aria-label={item.title}>
                        {item.icon}
                    </span>
                    <h3 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground">{item.people}</p>
                </button>
            ))}
        </div>
    );
}

export default GroupSizeUi;