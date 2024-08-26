import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

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

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      // Toggle sort direction if the same column is clicked
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      // Set new column to sort and default to ascending direction
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  // Sorting data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const paginatedData = pagination
    ? sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : sortedData

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
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
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={columns.length + (rowActions.length > 0 ? 1 : 0)}
            >
              <div className='flex items-center justify-between'>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className='btn-pagination'
                >
                  <IconArrowLeft />
                </button>
                <span>
                  Página {currentPage} de{' '}
                  {Math.ceil(data.length / itemsPerPage)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage === Math.ceil(data.length / itemsPerPage)
                  }
                  className='btn-pagination'
                >
                  <IconArrowRight />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}

export default TableView
