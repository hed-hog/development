import { IconLoader2 } from '@tabler/icons-react'

export type OverlayProps = {
  children: React.ReactNode
  loading?: boolean
}

export const Overlay = ({ children, loading = false }: OverlayProps) => {
  return (
    <div className='relative w-full '>
      {loading && (
        <div className='bg-color absolute flex h-full w-full items-center justify-center'>
          <IconLoader2 className='animate-spin' />
        </div>
      )}
      {children}
    </div>
  )
}
