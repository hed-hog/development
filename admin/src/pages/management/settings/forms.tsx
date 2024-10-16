import SettingLanguage from '@/components/custom/setting-language'
import { Skeleton } from '@/components/ui/skeleton'
import { useSettingsFromGroup } from '@/features/settings'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { v4 as uuidv4 } from 'uuid'

const getComponentFromSlug = (item: any) => {
  const key = uuidv4()

  switch (item.slug) {
    case 'language':
      return <SettingLanguage key={key} setting={item} />
    default:
      return <Fragment key={key} />
  }
}

export default function Page() {
  const { slug } = useParams()
  const { data, isLoading } = useSettingsFromGroup(String(slug))

  if (isLoading) {
    return (
      <div className='w-full space-y-2'>
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
      </div>
    )
  }

  return <>{data?.data.data.map((item) => getComponentFromSlug(item))}</>
}
