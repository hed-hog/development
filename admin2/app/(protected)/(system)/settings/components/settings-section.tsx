'use client';

import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}

interface SettingItemProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingItem({
  title,
  description,
  children,
  className,
}: SettingItemProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="space-y-0.5 flex-1 mr-4">
        <div className="text-sm font-medium">{title}</div>
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export function SettingGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      {React.Children.map(children, (child, index) => (
        <>
          {child}
          {index < React.Children.count(children) - 1 && <Separator />}
        </>
      ))}
    </div>
  );
}
