'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  IconLogout,
  IconMoon,
  IconShield,
  IconSparkles,
  IconSun,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import {
  ChevronsUpDown,
  FileText,
  Globe,
  Home,
  LayoutDashboard,
  Menu,
  Settings,
  Shield,
  ShoppingCart,
  User,
  Users2,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSystem } from './provider/system-provider';

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
const user = {
  name: 'João Silva',
  email: 'joao.silva@exemplo.com',
  avatar: 'https://ui.shadcn.com/avatars/shadcn.jpg',
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState<boolean | null>(null);
  const [settingsSheetOpen, setSettingsSheetOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(`/`);
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [language, setLanguage] = useState('pt-br');
  const { theme, setTheme } = useTheme();
  const { userData, logout } = useSystem();

  const toggleExpanded = () => {
    setExpanded((prev) => {
      const newValue = !prev;
      localStorage.setItem('sidebar-expanded', JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleSettingsClick = () => {
    setSettingsSheetOpen(true);
  };

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log('Logout clicked');
  };

  useEffect(() => {
    // Sincronizar com o localStorage no cliente
    const stored = localStorage.getItem('sidebar-expanded');
    setExpanded(stored ? JSON.parse(stored) : false);
  }, []);

  useEffect(() => {
    setActiveMenuItem(pathname); // Set active menu item on path change
  }, [pathname]);

  // Evitar renderizar até que o estado seja inicializado
  if (expanded === null) return null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          'h-full border-r flex flex-col transition-all duration-300',
          isMobile
            ? 'absolute -left-64 top-0 z-50 w-64 bg-primary-foreground'
            : 'relative',
          isMobile
            ? expanded
              ? '-left-0'
              : '-left-64'
            : expanded
              ? 'w-64'
              : 'w-16',
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            'flex items-center h-16 border-b px-4 transition-all duration-300',
            expanded ? 'justify-between' : 'justify-center',
          )}
        >
          <div className="flex w-full items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
              X
            </div>
            {expanded && (
              <span className="ml-3 font-semibold flex-1">AppName</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleExpanded}
            >
              <IconX className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t py-4 transition-all duration-300 overflow-y-auto overflow-x-hidden flex-1">
          <TooltipProvider delayDuration={300}>
            <ul className="space-y-1 px-3">
              <li>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'px-4 py-2 flex w-full',
                        expanded ? ' justify-start' : 'justify-center',
                      )}
                      onClick={toggleExpanded}
                    >
                      <Menu className={cn('h-5 w-5', expanded && 'mr-3')} />
                      <span
                        className={[
                          'transition-all flex-1',
                          expanded
                            ? 'translate-x-0 opacity-100 flex'
                            : 'translate-x-20 opacity-0 hidden',
                        ].join(' ')}
                      >
                        Ocultar Menu
                      </span>
                    </Button>
                  </TooltipTrigger>
                  {!expanded && (
                    <TooltipContent side="right">Expandir Menu</TooltipContent>
                  )}
                </Tooltip>
              </li>
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={'ghost'}
                        className={cn(
                          'px-4 py-2 flex w-full',
                          expanded ? ' justify-start' : 'justify-center',
                          item.href === activeMenuItem &&
                            'bg-primary text-white hover:bg-primary/90 hover:text-white',
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
                            'transition-all flex-1',

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
                            !expanded && 'justify-center',
                          )}
                        >
                          <Globe
                            className={cn('h-5 w-5', expanded && 'mr-3')}
                          />
                          {expanded && <span>Idioma</span>}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align={'start'} className="w-56">
                        <DropdownMenuLabel>Idiomas</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={language}
                          onValueChange={setLanguage}
                        >
                          <DropdownMenuRadioItem value="pt-br">
                            Português
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="en">
                            English
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="es">
                            Español
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'px-4 py-2 flex w-full',
                        expanded ? ' justify-start' : 'justify-center',
                      )}
                      onClick={() =>
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                      }
                    >
                      {theme === 'dark' ? (
                        <IconMoon
                          className={cn('h-5 w-5', expanded && 'mr-3')}
                        />
                      ) : (
                        <IconSun
                          className={cn('h-5 w-5', expanded && 'mr-3')}
                        />
                      )}
                      <span
                        className={[
                          'transition-all flex-1',
                          expanded
                            ? 'translate-x-0 opacity-100 flex'
                            : 'translate-x-20 opacity-0 hidden',
                        ].join(' ')}
                      >
                        Alternar tema
                      </span>
                    </Button>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild className={cn('p-0')}>
              <Button
                size={expanded ? 'lg' : 'icon'}
                variant="ghost"
                className={cn(
                  'w-full p-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
                )}
              >
                <TooltipProvider delayDuration={300}>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData?.avatar} alt={userData?.name} />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AvatarFallback className="rounded-lg">
                          {userData?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {userData?.name}
                      </TooltipContent>
                    </Tooltip>
                  </Avatar>
                </TooltipProvider>
                {expanded && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userData?.name}
                    </span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>
                )}
                {expanded && (
                  <ChevronsUpDown className="ml-auto size-4 hidden md:flex" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData?.avatar} alt={userData?.name} />
                    <AvatarFallback className="rounded-lg">
                      {userData?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {userData?.name}
                    </span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className={cn('cursor-pointer')}
                  onClick={handleSettingsClick}
                >
                  <IconSparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className={cn('cursor-pointr')}>
                  <IconUser />
                  Minha Conta
                </DropdownMenuItem>
                <DropdownMenuItem className={cn('cursor-pointer')}>
                  <IconShield />
                  Segurança
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('cursor-pointer')}
                onClick={() => logout()}
              >
                <IconLogout />
                Desconectar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Toggle button (mobile and desktop) */}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto transition-all duration-300">
        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center h-16 border-b px-4">
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
                    'bg-primary text-white hover:bg-sky-600 hover:text-white',
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
