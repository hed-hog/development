import { useEffect } from 'react'

export type PageTitleProps = {
  title: string
}

export const PageTitle = ({ title }: PageTitleProps) => {
  useEffect(() => {
    if (window) {
      window.document.title = `${title} | Hedhog`
    }
  }, [title])

  return (
    <div>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        </div>
      </div>
    </div>
  )
}
