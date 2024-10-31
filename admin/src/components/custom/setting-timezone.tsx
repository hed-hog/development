import { timezone } from '@/data/timezone.json'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocalesTranslations } from '@/features/locales/api/handlers'
import { useEditSetting } from '@/features/settings'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import FormPanel from './form-panel'

type SettingTimezoneProps = {
  setting: any
}

const SettingTimezone = ({ setting }: SettingTimezoneProps) => {
  const { mutateAsync } = useEditSetting()
  const { isLoading } = useLocalesTranslations()
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onChange',
  })
  const [options] = React.useState<any[]>(
    timezone.map((item) => ({ value: item, label: item }))
  )
  const [value, setValue] = useState<string>(setting.value)

  const onChange = useCallback(
    (value: string) => {
      if (value !== setting.value) {
        console.log('save TIMEZONE', {
          value,
          setting,
        })
        setValue(value)
        mutateAsync({
          id: setting.id,
          data: {
            value,
          },
        })
      }
    },
    [setting]
  )

  useEffect(() => {
    setValue(setting.value)
  }, [setting.value])

  if (isLoading) {
    return <></>
  }

  if (!isLoading) {
    return (
      <>
        <FormPanel
          fields={[
            {
              type: EnumFieldType.COMBOBOX,
              name: setting.slug,
              label: {
                text: setting.name,
              },
              required: true,
              description: {
                text: setting.description,
              },
              value,
              options,
              onChange,
            },
          ]}
          form={form}
        />
      </>
    )
  }
}

export default SettingTimezone