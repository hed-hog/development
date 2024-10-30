import { Skeleton } from '@/components/ui/skeleton'
import { useSettings, useSettingsFromGroup } from '@/features/settings'
import { useParams } from 'react-router-dom'
import { FormPanel } from '@/components/custom/form-panel'
import { FieldValues, useForm } from 'react-hook-form'
import { IFormFieldPropsBase, ISliderProps } from '@/types/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { Button } from '@/components/custom/button'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocales, useLocalesEnabled } from '@/features/locales/api/handlers'
import { SettingLocaleEnabled } from '@/components/custom/setting-locale-enabled'
import ColorTheme from '@/components/custom/color-theme'
import { hexToHSL, hslToHex } from '@/lib/colors'
import { useSetProperties } from '@/hooks/use-set-properties'

export default function Page() {
  const { t } = useTranslation(['translation', 'settings'])
  const { data: locales } = useLocales()
  const { mutate, isPending } = useSettings()
  const { setText } = useSetProperties()
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

  const handleDataChange = (dataValues: any) => {
    Object.keys(dataValues).forEach((key) => {
      const value = dataValues[key]

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

        case 'radius':
        case 'xs':
        case 'sm':
        case 'md':
        case 'lg':
        case 'xl':
        case '2xl':
        case '3xl':
          form.setValue(`theme-${key}`, value)
          break

        default:
          form.setValue(`theme-${key}`, value)
          break
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

        case 'theme-primary':
        case 'theme-secondary':
        case 'theme-background':
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

        case 'theme-radius':
          return {
            name: item.slug,
            type: EnumFieldType.RANGE,
            defaultValue: item.value,
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            sliderOptions: {
              defaultValue: [0.5],
              max: 1,
              step: 0.1,
            },
            onChange: (value: number) => {
              form.setValue(`theme-radius`, value)
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
            defaultValue: item.value,
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            sliderOptions: {
              defaultValue: [1],
              max: 5,
              step: 0.1,
            },
            onChange: (value: number) => {
              form.setValue(`theme-text-size`, value)
              setText(value)
            },
          }

        case 'theme-muted-saturation':
          return {
            name: item.slug,
            type: EnumFieldType.RANGE,
            defaultValue: item.value,
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            sliderOptions: {
              defaultValue: [100],
              max: 100,
              step: 1,
            },
            onChange: (value: number) => {
              // Use a default hue if not available
              const defaultHue = 240 // Example hue value; adjust as necessary
              // Calculate the adjusted muted saturation
              const adjustedMutedSaturation = value * (100 / 100) // Default saturation at 100%

              // Assume lightness is defined somewhere, you can provide a default if necessary
              const defaultLightness = 50 // Example lightness value; adjust as necessary

              // Create muted HSL based on the defaults
              const mutedHSL = {
                h: defaultHue, // Using a default hue
                s: adjustedMutedSaturation,
                l: defaultLightness, // Using a default lightness
              }

              // Define the CSS variable
              document.documentElement.style.setProperty(
                '--muted',
                `${mutedHSL.h} ${mutedHSL.s}% ${mutedHSL.l}%`
              )

              // Update the form value
              form.setValue(item.slug, value)
            },
          }

        case 'theme-muted-lightness':
          return {
            name: item.slug,
            type: EnumFieldType.RANGE,
            defaultValue: item.value,
            value: item.value,
            required: false,
            label: {
              text: item.name,
            },
            description: {
              text: item.description,
            },
            sliderOptions: {
              defaultValue: [100],
              max: 100,
              step: 1,
            },
            onChange: (value: number) => {
              // Use a default hue if not available
              const defaultHue = 240 // Example hue value; adjust as necessary
              // Assume saturation is defined somewhere, you can provide a default if necessary
              const defaultSaturation = 50 // Example saturation value; adjust as necessary
              const defaultLightness = 50
              // Calculate the adjusted muted lightness
              const adjustedMutedLightness = defaultLightness * (value / 100) // Default lightness at 50%

              // Create muted HSL based on the defaults
              const mutedHSL = {
                h: defaultHue, // Using a default hue
                s: defaultSaturation, // Using a default saturation
                l: adjustedMutedLightness,
              }

              // Define the CSS variable
              document.documentElement.style.setProperty(
                '--muted',
                `${mutedHSL.h} ${mutedHSL.s}% ${mutedHSL.l}%`
              )

              // Update the form value
              form.setValue(item.slug, value)
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
      {slug === 'appearance' && <ColorTheme onChange={handleDataChange} />}
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

                case 'abs':
                  if (!data['storage-abs-account']) {
                    form.setError('storage-abs-account', {
                      type: 'required',
                      message: t('storage-abs-account is required', {
                        ns: 'settings',
                      }),
                    })
                    hasErrors = true
                  }

                  if (!data['storage-abs-key']) {
                    form.setError('storage-abs-key', {
                      type: 'required',
                      message: t('storage-abs-key is required', {
                        ns: 'settings',
                      }),
                    })
                    hasErrors = true
                  }

                  if (!data['storage-abs-container']) {
                    form.setError('storage-abs-container', {
                      type: 'required',
                      message: t('storage-abs-container is required', {
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
