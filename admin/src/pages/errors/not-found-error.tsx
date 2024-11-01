import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function NotFoundError() {
  const navigate = useNavigate()
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
        <span className='font-medium'>Oops! Página não encontrada!</span>
        <p className='text-center text-muted-foreground'>
          Parece que a página que você está buscando <br />
          não existe ou deve ter sido removida.
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
