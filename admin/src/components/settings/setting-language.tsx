import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useLocaleListEnabled,
  useLocaleTranslations,
} from '@/features/locale/api/handlers'
import { useEditSetting } from '@/features/setting'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormPanel from '@/components/panels/form-panel'

type SettingLanguageProps = {
  setting: any
}

const SettingLanguage = ({ setting }: SettingLanguageProps) => {
  const { mutateAsync } = useEditSetting()
  const { i18n } = useTranslation()
  const { data: dataLocales } = useLocaleListEnabled()
  const { data: localeTranslations, isLoading } = useLocaleTranslations()
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onChange',
  })
  const [options, setOptions] = React.useState<any[]>([])
  const [value, setValue] = useState<string>(setting.value)

  const loadOptions = useCallback(() => {
    if (dataLocales?.data && localeTranslations?.data) {
      setOptions(
        dataLocales?.data.map((locale: any) => ({
          label: localeTranslations?.data[locale.code],
          value: locale.code,
        })) ?? []
      )
    }
  }, [dataLocales, localeTranslations, setting])

  const onChange = useCallback(
    (value: string) => {
      if (value !== setting.value) {
        console.log('save LANGUAGE', {
          value,
          setting,
        })
        setValue(value)
        mutateAsync({
          id: setting.id,
          data: {
            value,
          },
        }).then(() => i18n.changeLanguage(value))
      }
    },
    [setting]
  )

  useEffect(() => {
    loadOptions()
  }, [dataLocales, localeTranslations, setting])

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
              type: EnumFieldType.SELECT,
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

export default SettingLanguage
