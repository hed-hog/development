import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { toCamelCase } from '@/lib/to-camel-case'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

export const DynamicBreadcrumb = () => {
  const { t } = useTranslation('modules', { useSuspense: false })
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const pathnames = location.pathname.split('/').filter((x) => x)

  const formatBreadcrumb = (segment: string) => {
    const camelCaseSegment = toCamelCase(segment)
    return t(camelCaseSegment, { defaultValue: camelCaseSegment })
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          {pathnames.length > 0 && <BreadcrumbSeparator />}
        </BreadcrumbItem>

        {isMobile && pathnames.length > 2 ? (
          <>
            <BreadcrumbItem>
              <span>...</span>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className='text-gray-500'>
                {formatBreadcrumb(pathnames[pathnames.length - 1])}
              </span>
            </BreadcrumbItem>
          </>
        ) : (
          pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = index === pathnames.length - 1

            return (
              <BreadcrumbItem key={to}>
                {isLast ? (
                  <span className='text-gray-500'>
                    {formatBreadcrumb(value)}
                  </span>
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
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
