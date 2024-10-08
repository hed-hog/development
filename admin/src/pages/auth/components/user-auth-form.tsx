import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input-field'
import { cn } from '@/lib/utils'
import { useApp } from '@/hooks/use-app'
import { useTranslation } from 'react-i18next'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor digite o seu e-mail' })
    .email({ message: 'Endereço de e-mail inválido' }),
  password: z
    .string()
    .min(1, {
      message: 'Por favor digite a sua senha',
    })
    .min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { login } = useApp()
  const { t } = useTranslation('auth')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    setIsLoading(true)
    login(email, password)
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
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      tabIndex={0}
                      autoFocus={true}
                      placeholder={t('emailPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>{t('password')}</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                      tabIndex={2}
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading} type='submit'>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
