import { Helmet } from 'react-helmet'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Roles - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Roles</h1>
        </div>
      </div>
    </>
  )
}
