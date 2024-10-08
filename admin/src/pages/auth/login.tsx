import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { LocaleChange } from '@/components/custom/locale-change'
import { useTranslation } from 'react-i18next'

export default function SignIn2() {
  const { t } = useTranslation('auth')

  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='self-end'>
            <LocaleChange />
          </div>
          <div className='mb-4 flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
              <circle cx='9.5' cy='9.5' r='.5' fill='currentColor' />
              <circle cx='14.5' cy='14.5' r='.5' fill='currentColor' />
            </svg>
            <h1 className='text-xl font-medium'>HedHog</h1>
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
