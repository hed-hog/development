import { Button } from '@/components/custom/button'
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
    <form onSubmit={onSubmit}>
      <Input placeholder='E-mail' />
      <Input placeholder='Password' type='password' />
      <Button>Login</Button>
    </form>
  )
}
