import { useSettingGroups } from '@/features/settings'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Separator } from '@/components/ui/separator'
import SidebarNav from '../settings-options/components/sidebar-nav'
import { Outlet } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { getIcon } from '@/lib/get-icon'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')

  const [sidebarNavItems, setSidebarNavItems] = useState<any[]>([])
  const { data, isLoading } = useSettingGroups()

  useEffect(() => {
    if (data) {
      setSidebarNavItems(
        data.data.data.map(({ icon, slug, name }: any) => {
          return {
            title: name,
            icon: getIcon(icon),
            href: `/management/settings/${slug}`,
          }
        })
      )
    }
  }, [data])

  return (
    <>
      <Helmet>
        <title>{modulesT('settings')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {' '}
            {modulesT('settings')}
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
