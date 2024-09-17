import { Button } from '@/components/custom/button'

export default function MaintenanceError() {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] font-bold leading-tight'>503</h1>
        <span className='font-medium'>Website em manutenção!</span>
        <p className='text-center text-muted-foreground'>
          Esse site não está disponível no momento. <br />
          Voltaremos em breve.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline'>Saiba mais</Button>
        </div>
      </div>
    </div>
  )
}
