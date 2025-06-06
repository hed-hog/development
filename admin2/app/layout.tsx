import { QueryClientProvider } from '@/components/provider/query-client-provider';
import { SystemProvider } from '@/components/provider/system-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AppShell Responsivo',
  description: 'Um AppShell responsivo com menu colapsável',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SystemProvider>{children}</SystemProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
