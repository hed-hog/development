import { PasswordInput } from '@/components/fields/password-input-field'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useApp } from '@/hooks/use-app'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

interface PasswordRecoveryFormProps extends HTMLAttributes<HTMLDivElement> {}

interface FormValues {
  password: string
  confirmPassword: string
}

export default function PasswordRecoveryForm({
  className,
  code,
  ...props
}: PasswordRecoveryFormProps & { code: string }) {
  const { t } = useTranslation(['auth', 'validations'])
  const { resetPassword } = useApp()

  const formSchema = z
    .object({
      password: z
        .string()
        .min(1, { message: t?.('emptyPassword', { ns: 'validations' }) })
        .min(8, { message: t?.('minLengthPassword', { ns: 'validations' }) }),

      confirmPassword: z
        .string()
        .min(1, { message: t?.('emptyPassword', { ns: 'validations' }) })
        .min(8, { message: t?.('minLengthPassword', { ns: 'validations' }) }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('invalidPasswordConfirmation', { ns: 'validations' }),
      path: ['confirmPassword'],
    })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  function onSubmit({ password, confirmPassword }: z.infer<typeof formSchema>) {
    setIsLoading(true)

    resetPassword(code, password, confirmPassword)
      .then(() => {
        window.location.href = '/'
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>{t('password', { ns: 'auth' })}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>{t('confirmPassword', { ns: 'auth' })}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              {t('changePassword', { ns: 'auth' })}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
