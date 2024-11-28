import { PageTitle } from '@/components/custom/page-title'
import Nav from '@/components/navs/nav'
import { useApp } from '@/hooks/use-app'
import { getSideLinks } from '@/lib/get-sidelinks'
import { useQuery } from '@tanstack/react-query'

export default function Management() {
  const { request } = useApp()

  const { data } = useQuery({
    queryKey: ['menu-system'],
    queryFn: () =>
      request({
        url: `/menu/system`,
      }),
  })

  const sideLinks = getSideLinks((data?.data as any[]) || [])

  return (
    <>
      <PageTitle title='Management' />
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
