import SecurityPage from '@/components/page/security-page';
import React from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SecurityPage>{children}</SecurityPage>;
}
