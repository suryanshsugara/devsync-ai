import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'gold' | 'blue';
}

export function Card({ className, glow = 'none', children, ...props }: CardProps) {
  const glows = {
    none: '',
    gold: 'glow-gold border-primary/30',
    blue: 'glow-blue border-secondary/30',
  };

  return (
    <div
      className={cn(
        'bg-surface rounded-2xl border border-border/50 p-6 shadow-xl backdrop-blur-sm',
        glows[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
