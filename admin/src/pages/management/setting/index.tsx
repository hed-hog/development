import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useSettingGroup } from '@/features/setting'
import { getIcon } from '@/lib/get-icon'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import SidebarNav from './components/sidebar-nav'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')

  const [sidebarNavItems, setSidebarNavItems] = useState<any[]>([])
  const { data, isLoading } = useSettingGroup()

  useEffect(() => {
    if (data) {
      setSidebarNavItems(
        data.data.data.map(({ icon, slug, name }: any) => {
          return {
            title: name,
            icon: getIcon(icon),
            href: `/management/setting/${slug}`,
          }
        })
      )
    }
  }, [data])

  return (
    <>
      <Helmet>
        <title>{modulesT('setting')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {' '}
            {modulesT('setting')}
          </h1>
        </div>
      </div>
      <Separator className='my-4 lg:my-6' />
      <div className='flex flex-1 flex-col space-y-8 md:space-y-2 md:overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='top-0 lg:sticky lg:w-1/5'>
          {isLoading && (
            <div className='w-full space-y-2'>
              <Skeleton className='h-9 w-full' />
              <Skeleton className='h-9 w-full' />
              <Skeleton className='h-9 w-full' />
            </div>
          )}
          {!isLoading && <SidebarNav items={sidebarNavItems} />}
        </aside>
        <div className='flex w-full p-1 pr-4 md:overflow-y-hidden'>
          <Outlet />
        </div>
      </div>
    </>
  )
}
