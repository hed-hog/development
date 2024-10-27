import Field from '@/components/custom/field'
import SettingLanguage from '@/components/custom/setting-language'
import SettingTimezone from '@/components/custom/setting-timezone'
import { Skeleton } from '@/components/ui/skeleton'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useSettingsFromGroup } from '@/features/settings'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Fragment } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { FormPanel } from '@/components/custom/form-panel'
import SettingColor from '@/components/custom/setting-color'

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

  return (
    <div className='flex w-full flex-col gap-4'>
      {data?.data.data.map((item) => getComponentFromSlug(item))}
    </div>
  )
}
