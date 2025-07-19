import { cn } from '@/lib/utils';
import React, { CSSProperties, forwardRef } from 'react';

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
}

export const Action = forwardRef<HTMLButtonElement, Props>(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-md transition-transform duration-250 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 active:bg-gray-200',
          className,
        )}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          } as CSSProperties
        }
      />
    );
  },
);

Action.displayName = 'Action';
