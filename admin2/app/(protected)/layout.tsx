import { AppShell } from '@/components/app-shell';
import SecurityPage from '@/components/page/security-page';
import React from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SecurityPage>
      <AppShell>{children}</AppShell>
    </SecurityPage>
  );
}
