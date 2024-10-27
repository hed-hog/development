import React, { useCallback, useEffect, useState } from 'react'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { FormPanel } from './form-panel'
import { FieldValues, useForm } from 'react-hook-form'
import { useLocalesTranslations } from '@/features/locales/api/handlers'
import { useEditSetting } from '@/features/settings'
import { timezone } from '@/data/timezone.json'

type SettingTimezoneProps = {
  setting: any
}

const SettingTimezone = ({ setting }: SettingTimezoneProps) => {
  const { mutateAsync } = useEditSetting()
  const { isLoading } = useLocalesTranslations()
  const formPerson = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onChange',
  })
  const [options] = React.useState<any[]>(
    timezone.map((item) => ({ value: item, label: item }))
  )
  const [value, setValue] = useState<string>(setting.value)

  const onChange = useCallback(
    (value: string) => {
      console.log('SettingTimezone onChange', {
        value,
      })

      setValue(value)
      mutateAsync({
        id: setting.id,
        data: {
          value,
        },
      })
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
              name: 'Timezone',
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
          form={formPerson}
        />
      </>
    )
  }
}

export default SettingTimezone
