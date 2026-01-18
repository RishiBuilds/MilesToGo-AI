'use client';
import { suggestions } from '@/app/_components/Hero';
import React from 'react';
import { Sparkles } from 'lucide-react';

type Props = {
  onSelectOption: (value: string) => void;
};

function EmptyBoxState({ onSelectOption }: Props) {
  return (
    <div className="flex flex-col items-center text-center py-8 animate-fade-in">
      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 mb-4">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>

      <h2 className="text-lg font-semibold text-foreground">
        Start Planning Your Trip
      </h2>

      <p className="text-sm text-muted-foreground mt-1 max-w-sm">
        Share your travel preferences and let AI create the perfect itinerary
      </p>

      <div className="w-full mt-6 space-y-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(suggestion.title)}
            className="card-interactive w-full flex items-center gap-3 p-3 text-left group"
          >
            <span
              className="p-2 rounded-md bg-card border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary/50 transition-colors"
              aria-hidden="true"
            >
              {suggestion.icon}
            </span>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {suggestion.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
