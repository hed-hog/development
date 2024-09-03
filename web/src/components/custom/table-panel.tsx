import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'
import { usePagination } from '@/hooks/use-pagination'
import { useFetch } from '@/hooks/use-fetch'
import TableView from './table-view'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ITablePanelProps {
  columns: Array<{
    key: string
    header: string
  }>
  endpoint: string
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
  itemsPerPage?: number[]
  selectedItems?: any[]
  setIsAllSelected?: Dispatch<SetStateAction<boolean>>
}

const TablePanel = ({
  columns,
  endpoint,
  sortable = false,
  onRowClick,
  rowActions = [],
  caption,
  itemsPerPage: itemsPerPageOptions = [10, 20, 30, 40],
  selectedItems,
  setIsAllSelected,
}: ITablePanelProps) => {
  const totalItems = 5000 // Esse valor virá da API

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    renderPaginationButtons,
  } = usePagination(totalItems)

  const { data, isLoading, refetch } = useFetch(
    endpoint,
    currentPage,
    itemsPerPage,
    'table-panel'
  )

  const [filterSelected, setFilterSelected] = useState<boolean>(false)

  useEffect(() => {
    if (setIsAllSelected) setIsAllSelected(false)
    refetch()
  }, [currentPage, refetch])

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
      <TableView
        columns={columns}
        data={filterSelected ? selectedItems : data}
        sortable={sortable}
        caption={caption}
        onRowClick={onRowClick}
        rowActions={rowActions.map((action) => ({
          ...action,
          handleSelectAll: action.handleSelectAll
            ? () => (action.handleSelectAll as any)(data)
            : undefined,
        }))}
        isLoading={isLoading}
      />
      <div className='mt-4 flex w-full items-center justify-between'>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className='w-80'>
            <SelectValue placeholder={`Itens por página: ${itemsPerPage}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Pagination className='mx-0 w-fit'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.max(currentPage - 1, 1))
                }}
              />
            </PaginationItem>
            {renderPaginationButtons(totalPages)}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {Boolean(rowActions.filter((row) => row.isCheckbox).length) && (
        <div className='my-4'>
          <p
            className={`cursor-pointer text-sm ${(selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
            onClick={() => setFilterSelected(!filterSelected)}
          >
            {(selectedItems ?? []).length} itens selecionados
          </p>
        </div>
      )}
    </>
  )
}

export default TablePanel
