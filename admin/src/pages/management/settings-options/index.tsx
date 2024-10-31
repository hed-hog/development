import { Layout } from '@/components/custom/layout'
import { SearchField } from '@/components/search-field'
import ThemeSwitch from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'
import { UserNav } from '@/components/user-nav'
import {
  IconBrowserCheck,
  IconExclamationCircle,
  IconNotification,
  IconPalette,
  IconTool,
  IconUser,
} from '@tabler/icons-react'
import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router-dom'
import SidebarNav from './components/sidebar-nav'

export default function Settings() {
  return (
    <Layout fixed>
      <Helmet>
        <title>Configurações - Hedhog</title>
      </Helmet>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <SearchField />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='flex flex-col'>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Configurações
          </h1>
          <p className='text-muted-foreground'>
            Gerencie as configurações do sistema e defina suas preferências.
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full p-1 pr-4 md:overflow-y-hidden'>
            <Outlet />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}

const sidebarNavItems = [
  {
    title: 'Profile',
    icon: <IconUser size={18} />,
    href: '/management/setting',
  },
  {
    title: 'Account',
    icon: <IconTool size={18} />,
    href: '/management/setting/account',
  },
  {
    title: 'Appearance',
    icon: <IconPalette size={18} />,
    href: '/management/setting/appearance',
  },
  {
    title: 'Notifications',
    icon: <IconNotification size={18} />,
    href: '/management/setting/notifications',
  },
  {
    title: 'Display',
    icon: <IconBrowserCheck size={18} />,
    href: '/management/setting/display',
  },
  {
    title: 'Error Example',
    icon: <IconExclamationCircle size={18} />,
    href: '/management/setting/error-example',
  },
]
