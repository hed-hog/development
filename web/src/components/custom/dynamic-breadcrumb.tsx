import { useLocation } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from '@/components/custom/breadcrumb'

const formatBreadcrumb = (segment: string) => {
  return (
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ')
  )
}

export const DynamicBreadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.length > 0 ? (
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return (
            <BreadcrumbItem key={to}>
              {isLast ? (
                <span className='text-gray-500'>{formatBreadcrumb(value)}</span>
              ) : (
                <>
                  <BreadcrumbLink href={to}>
                    {formatBreadcrumb(value)}
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
