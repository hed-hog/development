import { useState } from 'react'
import ListView from '@/components/custom/list-view'
import { SkeletonCard } from './skeleton-card'
import { PaginationView } from './pagination-view'
import ListControls from './list-controls'
import { IStyleOption } from '@/types/style-options'
import { ISelectOption } from '@/types/select-options'
import { IPaginationOption } from '@/types/pagination-options'
import { usePagination } from '@/hooks/use-pagination'

interface ListPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  url: string
  render?: (item: Record<string, any>, index: number) => JSX.Element
  styleOptions?: IStyleOption
  paginationOptions?: IPaginationOption
  selectOptions?: ISelectOption
}

const ListPanel = ({
  id,
  styleOptions = {
    gap: 6,
    padding: 4,
  },
  url,
  paginationOptions = {
    pageSizeOptions: [10, 20, 30, 40],
    maxPages: 3,
  },
  className,
  render,
  selectOptions,
  ...props
}: ListPanelProps) => {
  const {
    isLoading,
    items,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    totalItems,
  } = usePagination({
    url,
    id,
    paginationOptions,
    selectOptions,
  })

  const [filterSelected, setFilterSelected] = useState<boolean>(false)

  if (isLoading) {
    return (
      <ListView
        data={Array.from({ length: paginationOptions?.pageSizeOptions[0] })}
        styleOptions={{
          gap: styleOptions.gap,
          padding: styleOptions.padding,
        }}
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
        data={items}
        // data={
        //   filterSelected && selectOptions?.selectedItems
        //     ? selectOptions?.selectedItems
        //     : items
        // }
        styleOptions={{
          gap: styleOptions.gap,
          padding: styleOptions.padding,
        }}
        render={render}
        className={className}
        {...props}
      />

      <PaginationView
        page={page}
        pageSize={pageSize}
        total={totalItems}
        variant='compact'
        maxPages={paginationOptions?.maxPages}
        onPageChange={setPage}
        pageSizeOptions={paginationOptions?.pageSizeOptions}
        onPageSizeChange={(value) => {
          setPageSize(Number(value))
          setPage(1)
        }}
      />
    </ListControls>
  )
}

export default ListPanel
