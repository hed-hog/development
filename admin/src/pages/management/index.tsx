import Nav from '@/components/nav'
import { useApp } from '@/hooks/use-app'
import { getSideLinks } from '@/lib/get-sidelinks'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet'

export default function Management() {
  const { request } = useApp()

  const { data } = useQuery({
    queryKey: ['menus-system'],
    queryFn: () =>
      request({
        url: `/menus/system`,
      }),
  })

  let sideLinks = getSideLinks((data?.data as any[]) || [])

  return (
    <>
      <Helmet>
        <title>Management - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Management</h1>
        </div>
      </div>

      <Nav
        id='sidebar-menu'
        className={`z-40 h-full max-h-0 flex-1 overflow-auto py-0 md:max-h-screen md:py-2`}
        closeNav={() => {}}
        isCollapsed={false}
        links={sideLinks}
      />
    </>
  )
}
