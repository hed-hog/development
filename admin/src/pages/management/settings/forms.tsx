import { Skeleton } from '@/components/ui/skeleton'
import { useSettings, useSettingsFromGroup } from '@/features/settings'
import { useParams } from 'react-router-dom'
import { FormPanel } from '@/components/custom/form-panel'
import { FieldValues, useForm } from 'react-hook-form'
import { IFormFieldPropsBase } from '@/types/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { Button } from '@/components/custom/button'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocales, useLocalesEnabled } from '@/features/locales/api/handlers'
import { SettingLocaleEnabled } from '@/components/custom/setting-locale-enabled'

export default function Page() {
  const { t } = useTranslation()
  const { data: locales } = useLocales()
  const { mutate, isPending } = useSettings()
  const { mutateAsync: mutateLocale, isPending: isPendingLocale } =
    useLocalesEnabled()
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onSubmit',
  })
  const { slug } = useParams()
  const { data, isLoading } = useSettingsFromGroup(String(slug))
  const [localesEnabled, setLocalesEnabled] = useState<string[]>([])

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
      {slug === 'localization' && (
        <SettingLocaleEnabled onChange={setLocalesEnabled} />
      )}
      <FormPanel
        ref={formRef}
        fields={
          data?.data.data.map((item) => getField(item)) as IFormFieldPropsBase[]
        }
        form={form}
        onSubmit={(data) => {
          mutateLocale({
            codes: localesEnabled,
          }).then(() => {
            if (!localesEnabled.includes(data.language)) {
              data.language = localesEnabled[0]
            }

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
          })

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
          loading={isPending || isPendingLocale}
          disabled={isPending || isPendingLocale}
          onClick={() => formRef.current?.submit()}
        >
          {t('apply')}
        </Button>
      </div>
    </div>
  )
}
