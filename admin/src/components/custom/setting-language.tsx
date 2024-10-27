import React, { useCallback, useEffect, useState } from 'react'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { FormPanel } from './form-panel'
import { FieldValues, useForm } from 'react-hook-form'
import {
  useLocales,
  useLocalesTranslations,
} from '@/features/locales/api/handlers'
import { useTranslation } from 'react-i18next'
import { useEditSetting } from '@/features/settings'

type SettingLanguageProps = {
  setting: any
}

const SettingLanguage = ({ setting }: SettingLanguageProps) => {
  const { mutateAsync } = useEditSetting()
  const { i18n } = useTranslation()
  const { data: dataLocales } = useLocales()
  const { data: localeTranslations, isLoading } = useLocalesTranslations()
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onChange',
  })
  const [options, setOptions] = React.useState<any[]>([])
  const [value, setValue] = useState<string>(setting.value)

  const loadOptions = useCallback(() => {
    if (dataLocales?.data && localeTranslations?.data) {
      setOptions(
        dataLocales?.data.data.map((locale: any) => ({
          label: localeTranslations?.data[locale.code],
          value: locale.code,
        })) ?? []
      )
    }
  }, [dataLocales, localeTranslations, setting])

  const onChange = useCallback(
    (value: string) => {
      setValue(value)
      mutateAsync({
        id: setting.id,
        data: {
          value,
        },
      }).then(() => i18n.changeLanguage(value))
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
              name: 'language',
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
