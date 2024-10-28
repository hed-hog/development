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
  const { t } = useTranslation(['translation', 'settings'])
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
            value: item.value,
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

        case 'storage':
          return {
            name: item.slug,
            type: EnumFieldType.SELECT,
            defaultValue: item.value,
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            options: [
              {
                value: 'local',
                label: 'Local',
              },
              {
                value: 's3',
                label: 'Amazon S3',
              },
              {
                value: 'abs',
                label: 'Azure Blob Storage',
              },
            ],
          }

        default:
          return {
            name: item.slug,
            type: EnumFieldType.TEXT,
            defaultValue: item.value,
            value: item.value,
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
    [locales, slug]
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
          let hasErrors = false

          switch (slug) {
            case 'file-storage':
              if (!data.storage) {
                form.setError('storage', {
                  type: 'required',
                  message: t('storage is required', { ns: 'settings' }),
                })
                hasErrors = true
              }

              switch (data.storage) {
                case 'local':
                  if (!data['storage-local-path']) {
                    form.setError('storage-local-path', {
                      type: 'required',
                      message: t('storage-local-path is required', {
                        ns: 'settings',
                      }),
                    })
                    hasErrors = true
                  }
                  break
                case 's3':
                  if (!data['storage-s3-key']) {
                    form.setError('storage-s3-key', {
                      type: 'required',
                      message: t('storage-s3-key is required', {
                        ns: 'settings',
                      }),
                    })
                    hasErrors = true
                  }

                  if (!data['storage-s3-secret']) {
                    form.setError('storage-s3-secret', {
                      type: 'required',
                      message: t('storage-s3-secret is required', {
                        ns: 'settings',
                      }),
                    })
                    hasErrors = true
                  }

                  if (!data['storage-s3-region']) {
                    form.setError('storage-s3-region', {
                      type: 'required',
                      message: t('storage-s3-region is required', {
                        ns: 'settings',
                      }),
                    })
                    hasErrors = true
                  }

                  if (!data['storage-s3-bucket']) {
                    form.setError('storage-s3-bucket', {
                      type: 'required',
                      message: t('storage-s3-bucket is required', {
                        ns: 'settings',
                      }),
                    })
                    hasErrors = true
                  }
                  break
              }

              break
          }

          if (hasErrors) {
            return false
          }

          const save = () => {
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
          }

          if (slug === 'localization') {
            mutateLocale({
              codes: localesEnabled,
            }).then(() => {
              if (!localesEnabled.includes(data.language)) {
                data.language = localesEnabled[0]
              }
              save()
            })
          } else {
            save()
          }
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
