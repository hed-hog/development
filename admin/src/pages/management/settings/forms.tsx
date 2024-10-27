import SettingLanguage from '@/components/custom/setting-language'
import SettingTimezone from '@/components/custom/setting-timezone'
import { Skeleton } from '@/components/ui/skeleton'
import { useSettingsFromGroup } from '@/features/settings'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import SettingColor from '@/components/custom/setting-color'
import SettingText from '@/components/custom/setting-text'

interface SettingItem {
  slug: string
  value: string
}

const getComponentFromSlug = (item: SettingItem) => {
  const key = uuidv4()

  switch (item.slug) {
    case 'language':
      return <SettingLanguage key={key} setting={item} />
    case 'timezone':
      return <SettingTimezone key={key} setting={item} />
    case 'primary':
    case 'secondary':
    case 'accent':
    case 'background':
    case 'muted':
      return <SettingColor key={key} setting={item} />
    default:
      return <SettingText key={key} setting={item} />
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

  return (
    <div className='flex w-full flex-col gap-4'>
      {data?.data.data.map((item) => getComponentFromSlug(item))}
    </div>
  )
}
