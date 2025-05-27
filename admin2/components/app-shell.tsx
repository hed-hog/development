'use client';

import type React from 'react';

import { useTheme } from '@/components/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  FileText,
  Globe,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Shield,
  ShoppingCart,
  Sun,
  User,
  Users2,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href?: string;
  submenu?: boolean;
};

const menuItems: MenuItem[] = [
  {
    icon: Home,
    label: 'Início',
    href: '/',
  },
  {
    icon: Shield,
    label: 'Security',
    href: '/security',
  },
  {
    icon: Settings,
    label: 'Settings',
    submenu: true,
  },
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: FileText,
    label: 'Releases',
    href: '/releases',
  },
  {
    icon: User,
    label: 'Account',
    href: '/account',
  },
  {
    icon: ShoppingCart,
    label: 'Orders',
    href: '/orders',
  },
  {
    icon: Users2,
    label: 'Clients',
    href: '/clients',
  },
];

const settingsSubmenuItems = [
  { label: 'Security', href: '/settings/security' },
  { label: 'Settings', href: '/settings', active: true },
  { label: 'Dashboard', href: '/settings/dashboard' },
  { label: 'Releases', href: '/settings/releases' },
  { label: 'Account', href: '/settings/account' },
  { label: 'Orders', href: '/settings/orders' },
  { label: 'Clients', href: '/settings/clients' },
  { label: 'Databases', href: '/settings/databases' },
  { label: 'Pull Requests', href: '/settings/pull-requests' },
  { label: 'Open Issues', href: '/settings/issues' },
  { label: 'Wiki pages', href: '/settings/wiki' },
];

// Dados simulados do usuário
const currentUser = {
  name: 'João Silva',
  email: 'joao.silva@exemplo.com',
  avatarUrl: '/placeholder.svg?height=40&width=40',
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [settingsSheetOpen, setSettingsSheetOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(`/`);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSettingsClick = () => {
    setSettingsSheetOpen(true);
  };

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log('Logout clicked');
  };

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setActiveMenuItem(url);
    };

    const router = useRouter();
    setActiveMenuItem(router.pathname); // Set initial active menu item

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          'h-full border-r flex flex-col transition-all duration-300',
          expanded ? 'w-64' : 'w-16'
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex items-center h-16 border-b px-4 transition-all duration-300',
            expanded ? 'justify-between' : 'justify-center'
          )}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white">
              X
            </div>
            {expanded && <span className="ml-3 font-semibold">AppName</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t py-4 transition-all duration-300 overflow-auto ">
          <TooltipProvider delayDuration={300}>
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={'ghost'}
                        className={cn(
                          'justify-start w-10',
                          !expanded && 'justify-center',
                          item.href === activeMenuItem &&
                            'bg-sky-500 text-white hover:bg-sky-600 hover:text-white'
                        )}
                        onClick={() =>
                          item.submenu ? handleSettingsClick() : null
                        }
                      >
                        <item.icon
                          className={cn('h-5 w-5', expanded && 'mr-3')}
                        />
                        <span
                          className={[
                            'transition-all',
                            expanded
                              ? 'translate-x-0 opacity-100 flex'
                              : 'translate-x-20 opacity-0 hidden',
                          ].join(' ')}
                        >
                          {item.label}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    {!expanded && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </TooltipProvider>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t py-4 transition-all duration-300">
          <TooltipProvider delayDuration={300}>
            <ul className="space-y-1 px-3">
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-start',
                            !expanded && 'justify-center'
                          )}
                        >
                          <Globe
                            className={cn('h-5 w-5', expanded && 'mr-3')}
                          />
                          {expanded && <span>Idioma</span>}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Português</DropdownMenuItem>
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Español</DropdownMenuItem>
                        <DropdownMenuItem>Français</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  {!expanded && (
                    <TooltipContent side="right">Idioma</TooltipContent>
                  )}
                </Tooltip>
              </li>
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ThemeToggle expanded={expanded} />
                  </TooltipTrigger>
                  {!expanded && (
                    <TooltipContent side="right">Alternar tema</TooltipContent>
                  )}
                </Tooltip>
              </li>
            </ul>
          </TooltipProvider>
        </div>

        {/* User Profile Section */}
        <div className="border-t py-3 px-3 transition-all duration-300">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    'flex items-center p-2 rounded-md hover:bg-muted relative group',
                    expanded ? 'justify-between' : 'justify-center'
                  )}
                >
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={currentUser.avatarUrl || '/placeholder.svg'}
                        alt={currentUser.name}
                      />
                      <AvatarFallback>
                        {currentUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {expanded && (
                      <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-medium truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    )}
                  </div>

                  {expanded && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-2 opacity-70 hover:opacity-100"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="sr-only">Sair</span>
                    </Button>
                  )}

                  {!expanded && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-muted"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-3 w-3" />
                      <span className="sr-only">Sair</span>
                    </Button>
                  )}
                </div>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right" className="flex flex-col gap-1">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser.email}
                  </p>
                  <Separator className="my-1" />
                  <p className="text-xs">Clique para ver perfil</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Toggle button (mobile and desktop) */}
        <Button
          variant="ghost"
          size="icon"
          className="m-3"
          onClick={toggleExpanded}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto transition-all duration-300">
        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center h-16 border-b px-4">
          <Button variant="ghost" size="icon" onClick={toggleExpanded}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </main>

      {/* Settings Sheet */}
      <Sheet open={settingsSheetOpen} onOpenChange={setSettingsSheetOpen}>
        <SheetContent
          side="left"
          className="w-[300px] p-0 border-l"
          overlayClassName="bg-transparent"
        >
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Configurações</SheetTitle>
            <SheetDescription>
              Gerencie suas configurações e preferências
            </SheetDescription>
          </SheetHeader>
          <div className="py-2">
            {settingsSubmenuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  'w-full justify-start rounded-none h-10 px-4',
                  item.active &&
                    'bg-sky-500 text-white hover:bg-sky-600 hover:text-white'
                )}
                asChild
              >
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Adicione este componente dentro do arquivo, antes do fechamento da função AppShell
function ThemeToggle({ expanded }: { expanded: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className={cn('w-full justify-start', !expanded && 'justify-center')}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className={cn('h-5 w-5', expanded && 'mr-3')} />
      ) : (
        <Moon className={cn('h-5 w-5', expanded && 'mr-3')} />
      )}
      {expanded && <span>Tema {theme === 'dark' ? 'Claro' : 'Escuro'}</span>}
    </Button>
  );
}
