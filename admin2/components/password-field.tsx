'use client';

import { IconEye, IconEyeOff } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Input } from './ui/input';

interface PasswordFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
  placeholder,
  id,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Input
        id={id || 'password'}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder || '••••••••'}
        className="pr-10"
        value={value}
        onChange={onChange}
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
};

export default PasswordField;
