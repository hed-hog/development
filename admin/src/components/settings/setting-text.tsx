import { EnumFieldType } from '@/enums/EnumFieldType'
import { useLocaleTranslations } from '@/features/locale/api/handlers'
import { useEditSetting } from '@/features/setting'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useDebounceValue } from 'usehooks-ts'
import FormPanel from '@/components/panels/form-panel'

type SettingTextProps = {
  setting: any
}

const SettingText = ({ setting }: SettingTextProps) => {
  const { mutateAsync } = useEditSetting()
  const { isLoading } = useLocaleTranslations()
  const form = useForm<FieldValues>({
    defaultValues: {
      [setting.slug]: setting.value,
    },
    mode: 'onChange',
  })
  const [valueFinal, setValueFinal] = useDebounceValue<string>(
    setting.value,
    500
  )
  const [value, setValue] = useState<string>(setting.value)

  const onChange = useCallback(
    (value: string) => {
      setValue(value)
      setValueFinal(value)
    },
    [setting]
  )

  useEffectAfterFirstUpdate(() => {
    if (valueFinal === setting.value) {
      console.log('save TEXT', {
        value,
        setting,
      })
      mutateAsync({
        id: setting.id,
        data: {
          value: valueFinal,
        },
      })
    }
  }, [valueFinal])

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
              type: EnumFieldType.TEXT,
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

export default SettingText
