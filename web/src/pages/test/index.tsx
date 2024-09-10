import { DataPanel } from '@/components/custom/data-panel'
import { DynamicBreadcrumb } from '@/components/custom/dynamic-breadcrumb'
import { Layout } from '@/components/custom/layout'
import { SearchField } from '@/components/search-field'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

export default function Screen() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <DynamicBreadcrumb />
        <div className='ml-auto flex items-center space-x-4'>
          <SearchField />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <h1 className='text-center text-2xl font-bold tracking-tight'>
          Usuários
        </h1>
        <DataPanel
          id='data-panel-grid-example'
          url='/users'
          hasSearch
          selectable
          multiple
          render={(item: any) => {
            return (
              <div key={item.email} className='w-96'>
                <h3 className='text-lg font-semibold'>{item.name}</h3>
                <p>{item.email}</p>
              </div>
            )
          }}
          onSelectionChange={(selectedItems) => {
            console.log('data-panel grid', selectedItems)
          }}
        />
      </Layout.Body>
    </Layout>
  )
}
