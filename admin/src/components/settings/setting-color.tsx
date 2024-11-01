import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocaleTranslations } from '@/features/locale/api/handlers'
import { useEditSetting } from '@/features/setting'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import FormPanel from '@/components/panels/form-panel'

type SettingColorProps = {
  setting: any
}

const SettingColor = ({ setting }: SettingColorProps) => {
  const { mutateAsync } = useEditSetting()
  const { isLoading } = useLocaleTranslations()
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onChange',
  })
  const [value, setValue] = useState<string>(setting.value)

  const onChange = useCallback(
    (value: string) => {
      if (value !== setting.value) {
        console.log('save COLOR', {
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
              type: EnumFieldType.COLOR,
              name: setting.slug,
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
