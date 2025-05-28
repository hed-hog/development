'use client';

import { cn } from '@/lib/utils';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import React, { useState } from 'react';

interface PasswordFieldProps extends React.ComponentProps<'input'> {
  className?: string;
}

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn('relative', className)}>
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'pr-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {showPassword ? (
            <IconEye className="h-5 w-5" />
          ) : (
            <IconEyeOff className="h-5 w-5" />
          )}
        </button>
      </div>
    );
  },
);

PasswordField.displayName = 'PasswordField';

export default PasswordField;
