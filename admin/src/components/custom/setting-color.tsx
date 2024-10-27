import { useCallback, useEffect, useState } from 'react'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { FormPanel } from './form-panel'
import { FieldValues, useForm } from 'react-hook-form'
import { useLocalesTranslations } from '@/features/locales/api/handlers'
import { useEditSetting } from '@/features/settings'

type SettingColorProps = {
  setting: any
}

const SettingColor = ({ setting }: SettingColorProps) => {
  const { mutateAsync } = useEditSetting()
  const { isLoading } = useLocalesTranslations()
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onChange',
  })
  const [value, setValue] = useState<string>(setting.value)

  const onChange = useCallback(
    (value: string) => {
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
              type: EnumFieldType.COLOR,
              name: 'Color',
              label: {
                text: setting.name,
              },
              required: true,
              description: {
                text: setting.description,
              },
              value,
              onChange,
            },
          ]}
          form={form}
        />
      </>
    )
  }
}

export default SettingColor
