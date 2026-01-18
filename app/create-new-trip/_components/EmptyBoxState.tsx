'use client';
import { suggestions } from '@/app/_components/Hero';
import React from 'react';
import { motion } from 'motion/react';

type Props = {
  onSelectOption: (value: string) => void;
};

function EmptyBoxState({ onSelectOption }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center py-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-foreground">
        Start Planning Your{' '}
        <span className="gradient-text">Dream Trip</span>
      </h2>

      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        Share your travel preferences and let AI create the perfect itinerary for you
      </p>

      <div className="w-full mt-4 space-y-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.01, x: 4 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectOption(suggestion.title)}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-card/50 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
          >
            <span className={`p-2 rounded-lg bg-linear-to-br ${suggestion.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
              {suggestion.icon}
            </span>
            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
              {suggestion.title}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default EmptyBoxState;
