import React from 'react';
import { cn } from './Button';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'live' | 'online' | 'offline' | 'warning' | 'neutral' | 'ai';
}

export function Badge({ className, variant = 'neutral', children, ...props }: BadgeProps) {
  const variants = {
    live: 'bg-error text-white animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    online: 'bg-success/20 text-success border border-success/30',
    offline: 'bg-text-secondary/20 text-text-secondary border border-text-secondary/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    neutral: 'bg-surface border border-border text-text-secondary',
    ai: 'bg-primary/20 text-primary border border-primary/30 glow-gold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
        variants[variant],
        className
      )}
      {...props}
    >
      {variant === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 animate-pulse" />}
      {children}
    </span>
  );
}
