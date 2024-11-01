import useIsCollapsed from '@/hooks/use-is-collapsed'
import { Outlet } from 'react-router-dom'
import Private from '@/components/app/private'
import { DynamicBreadcrumb } from '@/components/custom/dynamic-breadcrumb'
import { Layout } from '@/components/ui/layout'
import { LocaleChange } from '@/components/custom/locale-change'
import Sidebar from '@/components/app/sidebar'
import ThemeSwitch from '@/components/app/theme-switch'
import { UserNav } from '@/components/navs/user-nav'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <Private>
      <div className='relative h-full overflow-hidden'>
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
          id='content'
          className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
        >
          <Layout>
            <Layout.Header>
              <DynamicBreadcrumb />
              <div className='ml-auto flex items-center space-x-4'>
                <LocaleChange />
                <ThemeSwitch />
                <UserNav />
              </div>
            </Layout.Header>
            <Layout.Body>
              <Outlet />
            </Layout.Body>
          </Layout>
        </main>
      </div>
    </Private>
  )
}
