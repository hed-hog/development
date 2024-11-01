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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

interface ForgotFormProps extends HTMLAttributes<HTMLDivElement> {}

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const { t: authT } = useTranslation('auth')
  const { t: validationsT } = useTranslation('validations')

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: validationsT('emptyEmail') })
      .email({ message: validationsT('invalidEmail') }),
  })

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  function onSubmit() {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
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
                    <Input placeholder={authT('emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              {authT('proceed')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
