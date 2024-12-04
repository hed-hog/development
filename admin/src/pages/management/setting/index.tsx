import { PageTitle } from '@/components/custom/page-title'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'
import SidebarNavRenderItems from './components/sidebar-nav'

export default function Page() {
  return (
    <>
      <PageTitle title='Settings' />
      <Separator className='my-4 lg:my-6' />
      <div className='flex flex-1 flex-col space-y-8 lg:flex-row lg:space-x-12'>
        <SidebarNavRenderItems />
        <main className='flex-1'>
          <Outlet />
        </main>
      </div>
    </>
  )
}
