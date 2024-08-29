import { useEffect } from 'react'
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

interface ITableViewProps {
  columns: Array<{
    key: string
    header: string
  }>
  endpoint: string
  sortable?: boolean
  onRowClick?: (row: Record<string, any>) => void
  rowActions?: Array<{
    label: string | JSX.Element
    onClick: (row: Record<string, any>) => void
  }>
  caption?: string
  itemsPerPage?: number[]
}

const TablePanel = ({
  columns,
  endpoint,
  sortable = false,
  onRowClick,
  rowActions = [],
  caption,
  itemsPerPage: itemsPerPageOptions = [10, 20, 30, 40],
}: ITableViewProps) => {
  const totalItems = 5000 // esse valor virá da API

  const {
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex: start,
    endIndex: end,
    handlePageChange,
    handleItemsPerPageChange,
    renderPaginationButtons,
  } = usePagination(totalItems)

  const { data, isLoading, refetch } = useFetch(
    endpoint,
    start,
    end,
    'table-panel'
  )

  useEffect(() => {
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
        data={data}
        sortable={sortable}
        caption={caption}
        onRowClick={onRowClick}
        rowActions={rowActions}
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
    </>
  )
}

export default TablePanel
