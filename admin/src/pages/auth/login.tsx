import { LocaleChange } from '@/components/custom/locale-change'
import { Card } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { UserAuthForm } from './components/user-auth-form'
import { useEffect, useState } from 'react'
import { getValue } from '@/lib/get-property-value'

export default function SignIn2() {
  const { t } = useTranslation('auth')
  const [systemName, setSystemName] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    setImageUrl(getValue('--image-url'))
    setSystemName(getValue('--system-name'))
  }, [])

  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='self-end'>
            <LocaleChange />
          </div>
          <div className='mb-4 flex items-center justify-center'>
            <img src={imageUrl} alt='Logo' className='mr-4 h-8 w-8' />
            <h1 className='text-xl font-medium'>{systemName}</h1>
          </div>
          <Card className='p-6'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='mb-4 text-2xl font-semibold tracking-tight'>
                {t('authName')}
              </h1>
            </div>
            <UserAuthForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              {t('termsAgreement')}{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                {t('terms')}
              </a>{' '}
              {t('and')}{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                {t('privacyPolicy')}
              </a>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
