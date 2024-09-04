import { useState } from 'react'
import TableView from './table-view'
import { PaginationView } from './pagination-view'
import { SearchField } from '../search-field'
import { ITableColumn } from '@/types/table-column'
import { ISelectOption } from '@/types/select-options'
import { IPaginationOption } from '@/types/pagination-options'
import { usePagination } from '@/hooks/use-pagination'

interface ITablePanelProps {
  id: string
  url: string
  sortable?: boolean
  onRowClick?: (row: Record<string, any>) => void
  rowActions?: Array<{
    label: (row: Record<string, any>) => string | JSX.Element
    onClick: (row: Record<string, any>) => void
    isCheckbox?: boolean
    isAllSelected?: boolean
    handleSelectAll?: (data: any[]) => void
  }>
  caption?: string
  columns: ITableColumn[]
  paginationOptions?: IPaginationOption
  selectOptions?: ISelectOption
}

const TablePanel = ({
  id,
  columns,
  url,
  sortable = false,
  onRowClick,
  rowActions = [],
  caption,
  paginationOptions = {
    pageSizeOptions: [10, 20, 30, 40],
    maxPages: 3,
  },
  selectOptions,
}: ITablePanelProps) => {
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
      <TableView
        columns={columns}
        data={
          filterSelected && selectOptions?.selectedItems
            ? selectOptions?.selectedItems
            : items
        }
        sortable={sortable}
        caption={caption}
        onItemClick={onRowClick}
        isLoading={isLoading}
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
        padding={0}
      />

      {Boolean(rowActions.filter((row) => row.isCheckbox).length) && (
        <div className='my-4'>
          <p
            className={`cursor-pointer text-sm ${(selectOptions?.selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
            onClick={() => setFilterSelected(!filterSelected)}
          >
            {(selectOptions?.selectedItems ?? []).length} itens selecionados
          </p>
        </div>
      )}
    </>
  )
}

export default TablePanel
