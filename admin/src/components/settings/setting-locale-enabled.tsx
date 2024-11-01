import { useLocaleAll } from '@/features/locale/api/handlers'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

export type SettingLocaleEnabledProps = {
  onChange?: (value: string[]) => void
}

export const SettingLocaleEnabled = ({
  onChange,
}: SettingLocaleEnabledProps) => {
  const { data } = useLocaleAll()
  const [value, setValue] = useState<string[]>(
    data?.data.data
      .filter((locale) => locale.enabled)
      .map((locale) => locale.code) || []
  )

  useEffectAfterFirstUpdate(() => {
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }, [value])

  useEffect(() => {
    setValue(
      data?.data.data
        .filter((locale) => locale.enabled)
        .map((locale) => locale.code) || []
    )
  }, [data])

  return (
    <>
      <Label>Languages enabled</Label>
      {data?.data.data.map((locale) => (
        <div className='flex items-center space-x-2'>
          <Switch
            key={locale.code}
            id={locale.code}
            checked={value.includes(locale.code)}
            onCheckedChange={(checked) => {
              if (checked) {
                setValue([...value, locale.code])
              } else {
                setValue(value.filter((code) => code !== locale.code))
              }
            }}
          />
          <Label className='text-normal' htmlFor={locale.code}>
            {locale.name}
          </Label>
        </div>
      ))}
      <Separator />
    </>
  )
}
