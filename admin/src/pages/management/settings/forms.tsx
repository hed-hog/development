import { Skeleton } from '@/components/ui/skeleton'
import { useSettings, useSettingsFromGroup } from '@/features/settings'
import { useParams } from 'react-router-dom'
import { FormPanel } from '@/components/custom/form-panel'
import { FieldValues, useForm } from 'react-hook-form'
import { IFormFieldPropsBase } from '@/types/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { Button } from '@/components/custom/button'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocales } from '@/features/locales/api/handlers'
import { SettingLocaleEnables } from '@/components/custom/setting-locale-enables'

export default function Page() {
  const { t } = useTranslation()
  const { data: locales } = useLocales()
  const { mutate, isPending } = useSettings()
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onSubmit',
    values: {
      language: 'en',
    },
  })
  const { slug } = useParams()
  const { data, isLoading } = useSettingsFromGroup(String(slug))

  const getField = useCallback(
    (item: any): IFormFieldPropsBase => {
      switch (item.slug) {
        case 'language':
          return {
            name: item.slug,
            type: EnumFieldType.SELECT,
            defaultValue: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            options: locales?.data.data.map((l: any) => ({
              value: l.code,
              label: l.name,
            })),
          }
        default:
          return {
            name: item.slug,
            type: EnumFieldType.TEXT,
            defaultValue: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
          }
      }
    },
    [locales]
  )

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
      {slug === 'localization' && <SettingLocaleEnables />}
      <FormPanel
        ref={formRef}
        fields={
          data?.data.data.map((item) => getField(item)) as IFormFieldPropsBase[]
        }
        form={form}
        onSubmit={(data) => {
          mutate(
            Object.keys(data)
              .map((key) => ({
                slug: key,
                value: data[key],
              }))
              .filter(
                (item) =>
                  item.value !== undefined &&
                  item.value !== null &&
                  item.value !== ''
              )
          )
        }}
      />
      <div>
        <Button
          loading={isPending}
          disabled={isPending}
          onClick={() => formRef.current?.submit()}
        >
          {t('apply')}
        </Button>
      </div>
    </div>
  )
}
