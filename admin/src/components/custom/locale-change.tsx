import { useLocaleListEnabled, useLocaleTranslations } from '@/features/locale'
import { useEditUserSettingSlug } from '@/features/setting'
import { useApp } from '@/hooks/use-app'
import { queryClient } from '@/lib/query-provider'
import { cn } from '@/lib/utils'
import { IconCheck, IconLanguage } from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

export const LocaleChange = () => {
  const { user } = useApp()
  const { mutateAsync, isPending } = useEditUserSettingSlug()
  const { i18n, t } = useTranslation()
  const [languages, setLanguages] = useState<any[]>([])
  const { data: dataLocales } = useLocaleListEnabled()
  const { data: localeTranslations, isLoading } = useLocaleTranslations()

  const loadOptions = useCallback(() => {
    if (dataLocales?.data && localeTranslations?.data) {
      setLanguages(
        (dataLocales?.data ?? []).map((locale: any) => ({
          id: locale.id,
          label: localeTranslations?.data[locale.code],
          value: locale.code,
        })) ?? []
      )
    }
  }, [dataLocales, localeTranslations])

  const save = useCallback(
    (value: string) => {
      i18n.changeLanguage(value)

      if (user?.id) {
        for (const language of languages) {
          queryClient.invalidateQueries({
            queryKey: [`setting-from-groups-localization-${language.value}`],
          })
        }
        mutateAsync({
          slug: 'language',
          value,
        })
      }
    },
    [languages, user]
  )

  useEffect(() => {
    loadOptions()
  }, [dataLocales, localeTranslations])

  return (
    <>
      {languages.length > 1 && (
        <>
          {isLoading || (isPending && <Skeleton className='h-9 w-[80px]' />)}
          {!isLoading && !isPending && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='scale-95 px-2'
                  style={{ width: 'auto' }}
                >
                  <IconLanguage size={16} className='mr-2 h-4 w-4' />
                  {t(i18n.language)}
                  <span className='sr-only'>Toggle Locale</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {(languages ?? []).map((language) => (
                  <DropdownMenuItem
                    key={String(language.id)}
                    onClick={() => save(language.value)}
                  >
                    {language.label}{' '}
                    <IconCheck
                      size={14}
                      className={cn(
                        'ml-auto',
                        i18n.language !== language.value && 'hidden'
                      )}
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
    </>
  )
}
