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
import { Search } from '@/components/search'
import { Skeleton } from '@/components/ui/skeleton'

interface ITableViewProps {
  columns: Array<{
    key: string
    header: string
  }>
  data: Array<Record<string, any>>
  sortable?: boolean
  searchable?: boolean
  isLoading?: boolean
  onRowClick?: (row: Record<string, any>) => void
  rowActions?: Array<{
    label: (row: Record<string, any>) => string | JSX.Element
    onClick: (row: Record<string, any>) => void
  }>
  caption?: string
}

const TableView = ({
  columns,
  data,
  sortable = false,
  searchable = true,
  isLoading = false,
  onRowClick,
  rowActions = [],
  caption,
}: ITableViewProps) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  // Filtrar dados com base no termo de busca
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data
    return data.filter((row) =>
      columns.some((col) =>
        row[col.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm, columns])

  // Ordenar dados
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData
    return [...filteredData].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortColumn, sortDirection])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      {/* Campo de Busca */}
      {searchable && (
        <div className='relative my-4'>
          <Search
            placeholder='Buscar...'
            value={searchTerm}
            setValue={handleSearchChange}
          />
        </div>
      )}

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={`${col.key}-${index}`}>
                      <Skeleton className='h-8 w-full' />
                    </TableCell>
                  ))}
                  {rowActions.length > 0 && (
                    <TableCell>
                      <Skeleton className='h-8 w-full' />
                    </TableCell>
                  )}
                </TableRow>
              ))
            : sortedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key}>{row[col.key]}</TableCell>
                  ))}
                  {rowActions.length > 0 && (
                    <TableCell style={{ padding: '0.5rem 0' }}>
                      {rowActions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={(e) => {
                            e.stopPropagation()
                            action.onClick(row)
                          }}
                          className='btn-action'
                        >
                          {action.label(row)}
                        </button>
                      ))}
                    </TableCell>
                  )}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  )
}

export default TableView
