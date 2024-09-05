import React, { useState } from 'react'
import GridView from '@/components/custom/grid-view'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { SkeletonCard } from './skeleton-card'
import { PaginationView } from './pagination-view'
import ListControls from './list-controls'
import { IStyleOption } from '@/types/style-options'
import { ISelectOption } from '@/types/select-options'
import { IPaginationOption } from '@/types/pagination-options'
import { usePagination } from '@/hooks/use-pagination'

interface GridPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  responsiveColumns?: IResponsiveColumn
  url: string
  render: (item: any, index: number) => JSX.Element
  paginationOptions?: IPaginationOption
  selectOptions?: ISelectOption
  styleOptions?: IStyleOption
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
}: GridPanelProps) => {
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
  } = usePagination({ url, id, paginationOptions, selectOptions })

  const [filterSelected, setFilterSelected] = useState<boolean>(false)

  if (isLoading) {
    return (
      <GridView
        data={Array.from({ length: paginationOptions?.pageSizeOptions[0] })}
        responsiveColumns={responsiveColumns}
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
      <GridView
        data={items}
        responsiveColumns={responsiveColumns}
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
        variant='default'
        maxPages={paginationOptions?.maxPages}
        onPageChange={(page) => setPage(page)}
        pageSizeOptions={paginationOptions?.pageSizeOptions}
        onPageSizeChange={(value) => {
          setPageSize(Number(value))
          setPage(1)
        }}
      />
    </ListControls>
  )
}

export default GridPanel
