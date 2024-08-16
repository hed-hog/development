import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'

export default function UnauthorisedError() {
  const navigate = useNavigate()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>401</h1>
        <span className='font-medium'>
          Oops! Você não tem permissào para acessar essa página.
        </span>
        <p className='text-center text-muted-foreground'>
          Parece que você tentou acessar um recurso que requer autenticação.{' '}
          <br />
          Por favor, faça o login com suas credenciais.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button onClick={() => navigate('/')}>Home</Button>
        </div>
      </div>
    </div>
  )
}
