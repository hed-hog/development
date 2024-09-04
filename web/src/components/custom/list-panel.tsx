import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ListView from '@/components/custom/list-view'
import { SkeletonCard } from './skeleton-card'
import { usePaginationFetch } from '@/hooks/use-pagination-fetch'
import { PaginationView } from './pagination-view'
import ListControls from './list-controls'

interface ListPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  gap?: number
  padding?: number
  url: string
  pageSizeOptions?: number[]
  render: (item: any, index: number) => JSX.Element
  selectOptions?: {
    selectedItems?: any[]
    setIsAllSelected?: Dispatch<SetStateAction<boolean>>
    handleSelectAll?: (data: any[]) => void
    isAllSelected?: boolean
  }
  maxPages?: number
}

const ListPanel = ({
  id,
  gap = 6,
  padding = 4,
  url,
  pageSizeOptions = [10, 20, 30, 40],
  className,
  render,
  selectOptions,
  maxPages = 3,
  ...props
}: ListPanelProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [items, setItems] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')

  const [filterSelected, setFilterSelected] = useState<boolean>(false)

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
    if (selectOptions?.setIsAllSelected) selectOptions?.setIsAllSelected(false)
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
    <ListControls
      data={items}
      search={search}
      setSearch={setSearch}
      isAllSelected={selectOptions?.isAllSelected}
      handleSelectAll={selectOptions?.handleSelectAll}
      selectedItems={selectOptions?.selectedItems}
      onFilterToggle={() => setFilterSelected(!filterSelected)}
    >
      <ListView
        data={
          filterSelected && selectOptions?.selectedItems
            ? selectOptions?.selectedItems
            : items
        }
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
        onPageChange={setPage}
        pageSizeOptions={pageSizeOptions}
        onPageSizeChange={(value) => {
          setPageSize(Number(value))
          setPage(1)
        }}
      />
    </ListControls>
  )
}

export default ListPanel
