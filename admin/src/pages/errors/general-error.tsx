import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate()
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] font-bold leading-tight'>500</h1>
        )}
        <span className='font-medium'>Oops! Algo deu errado {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          Pedimos desculpas pelo ocorrido. <br /> Por favor, tente novamente
          mais tarde.
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => navigate(-1)}>
              Voltar
            </Button>
            <Button onClick={() => navigate('/')}>Home</Button>
          </div>
        )}
      </div>
    </div>
  )
}
