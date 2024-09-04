import React, { useEffect, useState } from 'react'
import GridView from '@/components/custom/grid-view' // Importa o GridView
import { IResponsiveColumn } from '@/types/responsive-columns'
import { SkeletonCard } from './skeleton-card'
import { usePaginationFetch } from '@/hooks/use-pagination-fetch'
import { SearchField } from '../search-field'
import { PaginationView } from './pagination-view'

interface GridPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  responsiveColumns?: IResponsiveColumn
  gap?: number
  padding?: number
  url: string
  pageSizeOptions?: number[]
  selectedItems?: any[]
  render: (item: any, index: number) => JSX.Element
  maxPages?: number
}

const GridPanel = ({
  id,
  responsiveColumns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  gap = 6,
  padding = 4,
  url,
  pageSizeOptions = [10, 20, 30, 40],
  className,
  selectedItems = [],
  render,
  maxPages = 3,
  ...props
}: GridPanelProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [items, setItems] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')

  const { data, isLoading, refetch } = usePaginationFetch({
    url,
    page,
    pageSize,
    search,
    queryKey: id,
  })

  useEffect(() => {
    if (data) {
      setItems(data.data)
      setTotalItems(data.total)
      setPage(data.page)
      setPageSize(data.pageSize)
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [pageSize, page, search, refetch])

  if (isLoading) {
    return (
      <GridView
        data={Array.from({ length: pageSizeOptions[0] })}
        responsiveColumns={responsiveColumns}
        gap={gap}
        padding={padding}
        render={() => <SkeletonCard key={Math.random()} />}
        itemsPerPage={pageSizeOptions}
        className={className}
        {...props}
      />
    )
  }

  return (
    <>
      <div className='m-4'>
        <SearchField
          placeholder='Buscar...'
          value={search}
          onSearch={(value) => {
            setSearch(value)
            setPage(1)
          }}
        />
      </div>

      <GridView
        data={items}
        responsiveColumns={responsiveColumns}
        gap={gap}
        padding={padding}
        render={render}
        itemsPerPage={pageSizeOptions}
        className={className}
        {...props}
      />

      <PaginationView
        page={page}
        pageSize={pageSize}
        total={totalItems}
        variant='default'
        maxPages={maxPages}
        onPageChange={(page) => setPage(page)}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={(value) => {
          setPageSize(Number(value))
          setPage(1)
        }}
      />

      {Boolean(selectedItems.length) && (
        <div className={`px-${padding} my-4`}>
          <p
            className={`cursor-pointer text-sm ${(selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
          >
            {(selectedItems ?? []).length} itens selecionados
          </p>
        </div>
      )}
    </>
  )
}

export default GridPanel
