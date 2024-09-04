import { Layout } from '@/components/custom/layout'
import { SearchField } from '@/components/search-field'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Helmet } from 'react-helmet'

export default function Page() {
  return (
    <Layout fixed>
      <Helmet>
        <title>Usuários - Hedhog</title>
      </Helmet>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='flex w-full items-center justify-between'>
          <SearchField value={''} placeholder={''} />
          <div className='flex items-center space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      {/* ===== Content ===== */}
      <Layout.Body className='flex flex-col'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Usuários</h1>
        </div>
      </Layout.Body>
    </Layout>
  )
}
