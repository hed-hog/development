import React, { useState, ChangeEvent, useEffect } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
} from '../ui/select'

interface ITableViewProps {
  columns: Array<{
    key: string
    header: string
  }>
  endpoint: string
  sortable?: boolean
  searchable?: boolean
  onRowClick?: (row: Record<string, any>) => void
  rowActions?: Array<{
    label: string | JSX.Element
    onClick: (row: Record<string, any>) => void
  }>
  caption?: string
  itemsPerPage?: number[]
  totalItems: number
}

const TablePanel = ({
  columns,
  endpoint,
  sortable = false,
  searchable = true,
  onRowClick,
  rowActions = [],
  caption,
  itemsPerPage: itemsPerPageOptions = [10, 20, 30, 40],
  totalItems,
}: ITableViewProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const {
    currentPage,
    itemsPerPage,
    startIndex: start,
    endIndex: end,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination()

  const { data, isLoading, refetch } = useFetch(
    endpoint,
    start,
    end,
    'table-panel'
  )

  const [totalPages, setTotalPages] = useState<number>(
    totalItems / itemsPerPage
  )

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage))
  }, [itemsPerPage, totalItems])

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data
    return data.filter((row: any) =>
      columns.some((col) =>
        row[col.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm, columns])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  if (isLoading) {
    return (
      <TableView
        columns={columns}
        data={[]}
        sortable={sortable}
        caption={caption}
        onRowClick={onRowClick}
        rowActions={rowActions}
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
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(index + 1)
                  }}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
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
