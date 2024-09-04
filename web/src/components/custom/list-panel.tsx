import React, { useEffect, useState } from 'react'
import ListView from '@/components/custom/list-view'
import { SkeletonCard } from './skeleton-card'
import { usePaginationFetch } from '@/hooks/use-pagination-fetch'
import { SearchField } from '../search-field'
import { PaginationView } from './pagination-view'

interface ListPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  gap?: number
  padding?: number
  url: string
  pageSizeOptions?: number[]
  selectedItems?: any[]
  render: (item: any, index: number) => JSX.Element
  maxPages?: number
}

const ListPanel = ({
  id,
  gap = 6,
  padding = 4,
  url,
  pageSizeOptions = [10, 20, 30, 40],
  className,
  selectedItems = [],
  render,
  maxPages = 3,
  ...props
}: ListPanelProps) => {
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
      <ListView
        data={Array.from({ length: pageSizeOptions[0] })}
        gap={gap}
        padding={padding}
        render={() => <SkeletonCard key={Math.random()} />}
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

      <ListView
        data={items}
        gap={gap}
        padding={padding}
        render={render}
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

export default ListPanel
