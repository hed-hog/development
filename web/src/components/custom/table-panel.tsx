import { useState } from 'react'
import TableView from './table-view'
import { PaginationView } from './pagination-view'
import { SearchField } from '../search-field'
import { ITableColumn } from '@/types/table-column'
import { ISelectOption } from '@/types/select-options'
import { IPaginationOption } from '@/types/pagination-options'
import { usePagination } from '@/hooks/use-pagination'
import { SelectedItems } from './select-items'

type ITablePanelProps<T> = {
  id: string
  url: string
  sortable?: boolean
  onRowClick?: (row: T) => void
  caption?: string
  selectable?: boolean
  multiple?: boolean
  onSelectionChange?: (selectedItems: Array<T>) => void
  columns: ITableColumn<T>[]
  paginationOptions?: IPaginationOption
  selectOptions?: ISelectOption
}

const TablePanel = <T extends {}>({
  id,
  columns,
  url,
  sortable = false,
  onRowClick,
  caption,
  selectable,
  multiple,
  onSelectionChange,
  paginationOptions = {
    pageSizeOptions: [10, 20, 30, 40],
    maxPages: 3,
  },
  selectOptions,
}: ITablePanelProps<T>) => {
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
      <TableView
        columns={columns}
        data={[]}
        sortable={sortable}
        caption={caption}
        onItemClick={onRowClick}
        isLoading={isLoading}
      />
    )
  }

  return (
    <>
      <div className='relative my-4'>
        <SearchField
          placeholder='Buscar...'
          value={search}
          onSearch={(value) => {
            setSearch(value)
            setPage(1)
          }}
        />
      </div>
      <TableView<T>
        selectable={selectable}
        multiple={multiple}
        onSelectionChange={onSelectionChange}
        columns={columns}
        data={items}
        sortable={sortable}
        caption={caption}
        isLoading={isLoading}
        onItemClick={onRowClick}
      />
      <PaginationView
        page={page}
        pageSize={pageSize}
        total={totalItems}
        variant='default'
        maxPages={paginationOptions?.maxPages}
        onPageChange={(page) => {
          setPage(page)
        }}
        pageSizeOptions={paginationOptions?.pageSizeOptions}
        onPageSizeChange={(value) => {
          setPageSize(Number(value))
          setPage(1)
        }}
        padding={0}
      />

      {multiple && (
        <div className='my-4'>
          <SelectedItems
            selectedItems={selectOptions?.selectedItems as any[]}
            onClick={() => setFilterSelected(!filterSelected)}
          />
        </div>
      )}
    </>
  )
}

export default TablePanel
