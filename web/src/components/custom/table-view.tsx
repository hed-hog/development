import React, { useState, ChangeEvent } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'
import { Search } from '@/components/search'

interface ITableViewProps {
  columns: Array<{
    key: string
    header: string
  }>
  data: Array<Record<string, any>>
  sortable?: boolean
  pagination?: boolean
  onRowClick?: (row: Record<string, any>) => void
  rowActions?: Array<{
    label: string | JSX.Element
    onClick: (row: Record<string, any>) => void
  }>
  caption?: string
  itemsPerPage?: number
}

const TableView = ({
  columns,
  data,
  sortable = false,
  pagination = false,
  onRowClick,
  rowActions = [],
  caption,
  itemsPerPage = 10,
}: ITableViewProps) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data
    return data.filter((row) =>
      columns.some((col) =>
        row[col.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm, columns])

  // Sorting data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData
    return [...filteredData].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortColumn, sortDirection])

  const totalItems = sortedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Calcula os itens a serem exibidos na página atual
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reseta para a primeira página ao alterar o termo de busca
  }

  return (
    <>
      {/* Search Input */}
      <div className='relative my-4'>
        <Search
          placeholder='Buscar...'
          value={searchTerm}
          setValue={handleSearchChange}
        />
      </div>

      <Table>
        {caption && <TableCaption className='mt-10'>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                onClick={() => sortable && handleSort(col.key)}
                className={sortable ? 'cursor-pointer' : ''}
              >
                {col.header}{' '}
                {sortable && sortColumn === col.key && (
                  <span>{sortDirection === 'asc' ? '🔼' : '🔽'}</span>
                )}
              </TableHead>
            ))}
            {rowActions.length > 0 && <TableHead>Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col) => (
                <TableCell key={col.key}>{row[col.key]}</TableCell>
              ))}
              {rowActions.length > 0 && (
                <TableCell>
                  {rowActions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={(e) => {
                        e.stopPropagation()
                        action.onClick(row)
                      }}
                      className='btn-action'
                    >
                      {action.label}
                    </button>
                  ))}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        {pagination && (
          <TableCell
            colSpan={columns.length + (rowActions.length > 0 ? 1 : 0)}
            className='relative px-0'
          >
            <Pagination className='absolute right-0 mb-6 w-fit'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </TableCell>
        )}
      </Table>
    </>
  )
}

export default TableView
