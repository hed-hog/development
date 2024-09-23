import { DataPanel } from '@/components/custom/data-panel'
import { Helmet } from 'react-helmet'

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Users - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Users</h1>
        </div>
      </div>
      <DataPanel
        url="/users"
        layout='grid'
        id='users'
        menuOrders={[]}
      />
    </>
  )
}
