import { useEffect, useState } from 'react'
import { usePaginationFetch } from '@/hooks/use-pagination-fetch'
import TableView from './table-view'
import { PaginationView } from './pagination-view'
import { SearchField } from '../search-field'
import { ITableColumn } from '@/types/table-column'
import { ISelectOption } from '@/types/select-options'
import { IPaginationOption } from '@/types/pagination-options'

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
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(
    paginationOptions?.pageSizeOptions[0]
  )
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

  const [filterSelected, setFilterSelected] = useState<boolean>(false)

  useEffect(() => {
    if (selectOptions?.setIsAllSelected) selectOptions?.setIsAllSelected(false)
    refetch()
  }, [page, refetch, search, pageSize])

  useEffect(() => {
    if (data) {
      setItems(data.data)
      setTotalItems(data.total)
      setPage(data.page)
      setPageSize(data.pageSize)
    }
  }, [data])

  if (isLoading) {
    return (
      <TableView
        columns={columns}
        data={[]}
        sortable={sortable}
        caption={caption}
        onRowClick={onRowClick}
        rowActions={rowActions}
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
        onRowClick={onRowClick}
        rowActions={rowActions.map((action) => ({
          ...action,
          handleSelectAll: action.handleSelectAll
            ? () => (action.handleSelectAll as any)(items)
            : undefined,
        }))}
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
