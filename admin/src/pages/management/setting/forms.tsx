import ColorTheme from '@/components/custom/color-theme'
import FormPanel from '@/components/panels/form-panel'
import { SettingLocaleEnabled } from '@/components/settings/setting-locale-enabled'
import { Button } from '@/components/ui/button'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useLocaleEnabled,
  useLocaleListEnabled,
} from '@/features/locale/api/handlers'
import { useSetting, useSettingFromGroup } from '@/features/setting'
import { useSetProperties } from '@/hooks/use-set-properties'
import { hexToHSL, hslToHex } from '@/lib/colors'
import { IFormFieldPropsBase, ISliderProps } from '@/types/form-panel'
import { useCallback, useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import SidebarNavRenderItems from './components/sidebar-nav'

export default function Page() {
  const { t } = useTranslation(['translation', 'setting'])
  const { data: locale } = useLocaleListEnabled()
  const { mutate, isPending } = useSetting()
  const { setText } = useSetProperties()
  const { mutateAsync: mutateLocale, isPending: isPendingLocale } =
    useLocaleEnabled()
  const formRef = useRef<HTMLFormElement>(null)
  const form = useForm<FieldValues>({
    defaultValues: {},
    mode: 'onSubmit',
  })
  const { slug } = useParams()
  const { data } = useSettingFromGroup(String(slug))
  const [localeEnabled, setLocalesEnabled] = useState<string[]>([])

  const handleDataChange = (dataValues: any) => {
    Object.keys(dataValues).forEach((key) => {
      const value = dataValues[key]
      if (!value.includes('NaN')) {
        switch (key) {
          case 'fontFamily':
            form.setValue(`theme-${key}`, value)
            break

          case 'primary':
          case 'background':
          case 'secondary':
          case 'accent':
          case 'muted':
            form.setValue(`theme-${key}`, hslToHex(value))
            break

          default:
            form.setValue(`theme-${key}`, value)
            break
        }
      }
    })
  }

  const getField = useCallback(
    (item: any): IFormFieldPropsBase & ISliderProps => {
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
            options: (locale?.data ?? []).map((l: any) => ({
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

        case 'theme-primary':
        case 'theme-secondary':
        case 'theme-muted':
        case 'theme-accent':
          return {
            name: item.slug,
            type: EnumFieldType.COLOR,
            defaultValue: item.value,
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            onChange: (value: string) => {
              form.setValue(item.slug, value)
              document.documentElement.style.setProperty(
                `--${item.slug.split('-')[1]}`,
                `${hexToHSL(value).h} ${hexToHSL(value).s}% ${hexToHSL(value).l}%`
              )
            },
          }

        case 'theme-primary-foreground':
        case 'theme-secondary-foreground':
        case 'theme-muted-foreground':
        case 'theme-accent-foreground':
          return {
            name: item.slug,
            type: EnumFieldType.COLOR,
            defaultValue: item.value,
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            onChange: (value: string) => {
              form.setValue(item.slug, value)
              document.documentElement.style.setProperty(
                `--${item.slug.split('-')[1]}-foreground`,
                `${hexToHSL(value).h} ${hexToHSL(value).s}% ${hexToHSL(value).l}%`
              )
            },
          }

        case 'theme-radius':
          return {
            name: item.slug,
            type: EnumFieldType.RANGE,
            defaultValue: [item.value],
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            sliderOptions: {
              defaultValue: [item.value ?? 0.5],
              max: 1,
              step: 0.1,
            },
            onChange: (value: number[]) => {
              form.setValue(`theme-radius`, value[0])
              document.documentElement.style.setProperty(
                '--radius',
                `${value}rem`
              )
            },
          }

        case 'theme-font':
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
                value: 'ui-sans-serif, system-ui, sans-serif',
                label: 'Default',
              },
              {
                value: 'Arial',
                label: 'Arial',
              },
              {
                value: 'Verdana',
                label: 'Verdana',
              },
              {
                value: 'Georgia',
                label: 'Georgia',
              },
              {
                value: 'Helvetica',
                label: 'Helvetica',
              },
              {
                value: 'Times New Roman',
                label: 'Times New Roman',
              },
              {
                value: 'Courier New',
                label: 'Courier New',
              },
            ],
            onChange: (value: string) => {
              form.setValue(`theme-font`, value)
              document.documentElement.style.setProperty('--font-family', value)
            },
          }

        case 'theme-text-size':
          return {
            name: item.slug,
            type: EnumFieldType.RANGE,
            defaultValue: [item.value],
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            sliderOptions: {
              defaultValue: [item.value ?? 1],
              max: 5,
              step: 0.1,
            },
            onChange: (value: number[]) => {
              form.setValue(`theme-text-size`, value[0])
              setText(value[0])
            },
          }

        case 'menu-width':
          return {
            name: item.slug,
            type: EnumFieldType.RANGE,
            defaultValue: [item.value],
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            sliderOptions: {
              defaultValue: [item.value ?? 16],
              max: 100,
              step: 1,
            },
            onChange: (value: number[]) => {
              form.setValue(`menu-width`, value[0])
              document.documentElement.style.setProperty(
                '--menu-width',
                `${value[0]}rem`
              )
            },
          }

        case 'system-name':
        case 'system-slogan':
        case 'image-url':
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
            onChange: (value: string) => {
              form.setValue(item.slug, value)
              document.documentElement.style.setProperty(
                `--${item.slug}`,
                value
              )
            },
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
    [locale, slug]
  )

  return (
    <div className='flex flex-row'>
      <SidebarNavRenderItems />
      <div className='flex w-full flex-col gap-4'>
        {slug === 'localization' && (
          <SettingLocaleEnabled onChange={setLocalesEnabled} />
        )}
        {slug === 'appearance' && (
          <ColorTheme onChange={handleDataChange} defaultValues={data?.data} />
        )}
        <FormPanel
          ref={formRef as any}
          fields={
            Array.isArray(data?.data)
              ? (data.data.map((item: any) =>
                  getField(item)
                ) as IFormFieldPropsBase[])
              : []
          }
          form={form}
          onSubmit={(data) => {
            let hasErrors = false

            switch (slug) {
              case 'file-storage':
                if (!data.storage) {
                  form.setError('storage', {
                    type: 'required',
                    message: t('storage is required', { ns: 'setting' }),
                  })
                  hasErrors = true
                }

                switch (data.storage) {
                  case 'local':
                    if (!data['storage-local-path']) {
                      form.setError('storage-local-path', {
                        type: 'required',
                        message: t('storage-local-path is required', {
                          ns: 'setting',
                        }),
                      })
                      hasErrors = true
                    }
                    break

                  case 'abs':
                    if (!data['storage-abs-account']) {
                      form.setError('storage-abs-account', {
                        type: 'required',
                        message: t('storage-abs-account is required', {
                          ns: 'setting',
                        }),
                      })
                      hasErrors = true
                    }

                    if (!data['storage-abs-key']) {
                      form.setError('storage-abs-key', {
                        type: 'required',
                        message: t('storage-abs-key is required', {
                          ns: 'setting',
                        }),
                      })
                      hasErrors = true
                    }

                    if (!data['storage-abs-container']) {
                      form.setError('storage-abs-container', {
                        type: 'required',
                        message: t('storage-abs-container is required', {
                          ns: 'setting',
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
                          ns: 'setting',
                        }),
                      })
                      hasErrors = true
                    }

                    if (!data['storage-s3-secret']) {
                      form.setError('storage-s3-secret', {
                        type: 'required',
                        message: t('storage-s3-secret is required', {
                          ns: 'setting',
                        }),
                      })
                      hasErrors = true
                    }

                    if (!data['storage-s3-region']) {
                      form.setError('storage-s3-region', {
                        type: 'required',
                        message: t('storage-s3-region is required', {
                          ns: 'setting',
                        }),
                      })
                      hasErrors = true
                    }

                    if (!data['storage-s3-bucket']) {
                      form.setError('storage-s3-bucket', {
                        type: 'required',
                        message: t('storage-s3-bucket is required', {
                          ns: 'setting',
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
                  .map((key) => {
                    return {
                      slug: key,
                      value: Array.isArray(data[key])
                        ? String(data[key][0])
                        : typeof data[key] === 'boolean'
                          ? String(data[key])
                          : data[key],
                    }
                  })
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
                codes: localeEnabled,
              }).then(() => {
                if (!localeEnabled.includes(data.language)) {
                  data.language = localeEnabled[0]
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
    </div>
  )
}
