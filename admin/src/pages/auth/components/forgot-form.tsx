import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useApp } from '@/hooks/use-app'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

interface ForgotFormProps extends HTMLAttributes<HTMLDivElement> {}

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const { t } = useTranslation(['auth', 'validations'])
  const { forget } = useApp()
  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('emptyEmail', { ns: 'validations' }) })
      .email({ message: t('invalidEmail', { ns: 'validations' }) }),
  })

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  function onSubmit({ email }: z.infer<typeof formSchema>) {
    setIsLoading(true)

    forget(email)
      .then(() => {
        window.location.href = '/email-sent'
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
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('emailPlaceholder', { ns: 'auth' })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              {t('proceed', { ns: 'auth' })}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
