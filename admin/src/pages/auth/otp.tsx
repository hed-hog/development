import { LocaleChange } from '@/components/custom/locale-change'
import { Card } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { OtpForm } from './components/otp-form'
import { getValue } from '@/lib/get-property-value'
import { useEffect, useState } from 'react'

export default function Otp() {
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
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-md font-semibold tracking-tight'>
                {t('2fa')}
              </h1>
              <p className='text-sm text-muted-foreground'>{t('2faSteps')}</p>
            </div>
            <OtpForm />
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              {t('notReceived2fa')}{' '}
              <Link
                to='/resent-new-code'
                className='underline underline-offset-4 hover:text-primary'
              >
                {t('resend2fa')}
              </Link>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
