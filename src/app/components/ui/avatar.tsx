import React from 'react';
import { cn } from './Button';

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy';
  className?: string;
}

export function Avatar({ src, fallback, size = 'md', status, className }: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const statusColors = {
    online: 'bg-success border-background',
    offline: 'bg-text-secondary border-background',
    busy: 'bg-warning border-background',
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden bg-surface border border-border flex items-center justify-center font-medium text-text-secondary',
          sizes[size]
        )}
      >
        {src ? (
          <img src={src} alt={fallback} className="w-full h-full object-cover" />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
