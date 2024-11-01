import { Helmet } from 'react-helmet'

export type PageTitleProps = {
  title: string
}

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <>
      <Helmet>
        <title>{title} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
        </div>
      </div>
    </>
  )
}
