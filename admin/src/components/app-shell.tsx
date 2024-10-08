import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import Private from './private'
import { Layout } from './custom/layout'
import { DynamicBreadcrumb } from './custom/dynamic-breadcrumb'
import ThemeSwitch from './theme-switch'
import { UserNav } from './user-nav'
import { LocaleChange } from './custom/locale-change'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <Private>
      <div className='relative h-full overflow-hidden bg-background'>
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
