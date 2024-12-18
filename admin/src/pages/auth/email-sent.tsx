import { LocaleChange } from '@/components/custom/locale-change'
import { Card } from '@/components/ui/card'
import { useApp } from '@/hooks/use-app'
import { useTranslation } from 'react-i18next'

export default function EmailSent() {
  const { t } = useTranslation('auth')
  const { systemInfo } = useApp()

  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='self-end'>
            <LocaleChange />
          </div>
          <div className='mb-4 flex items-center justify-center'>
            <img
              src={systemInfo.imageUrl}
              alt='Logo'
              className='mr-4 h-8 w-8'
            />
            <h1 className='text-xl font-medium'>{systemInfo.name}</h1>
          </div>
          <Card className='p-6'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                {t('emailSent')}
              </h1>
              <p className='text-sm text-muted-foreground'>
                {t('emailSentDetails')}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
