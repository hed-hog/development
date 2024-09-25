import { Helmet } from 'react-helmet'

export default function Management() {
  return (
    <>
      <Helmet>
        <title>Management - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Management</h1>
        </div>
      </div>

      {/* Here, we can list all Hedhog management modules. */}
    </>
  )
}
