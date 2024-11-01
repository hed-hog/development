import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useApp } from '@/hooks/use-app'
import { useCallback } from 'react'

export const Login = () => {
  const { login } = useApp()

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const target = e.target as typeof e.target & {
        0: { value: string }
        1: { value: string }
      }
      const email = target[0].value
      const password = target[1].value

      login(email, password)
    },
    [login]
  )

  return (
    <Card className='p-6'>
      <form
        onSubmit={onSubmit}
        className='flex h-56 w-72 flex-col items-center'
      >
        <h1 className='mb-4 text-3xl font-semibold tracking-tight'>
          Autenticação
        </h1>
        <Input placeholder='E-mail' className='my-2 py-4' />
        <Input placeholder='Password' type='password' className='my-2 py-4' />
        <Button className='my-2 w-full'>Login</Button>
      </form>
    </Card>
  )
}
