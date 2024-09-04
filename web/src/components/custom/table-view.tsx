import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { ITableColumn } from '@/types/table-column'
import { Button } from './button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

interface ITableViewProps {
  columns: ITableColumn[]
  data: Array<Record<string, any>>
  sortable?: boolean
  isLoading?: boolean
  multipleSelect?: boolean
  onItemClick?: (
    row: Record<string, any>,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  onItemContextMenu?: (
    row: Record<string, any>,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  caption?: string
  render?: (item: Record<string, any>, index: number) => JSX.Element
}

const TableView = ({
  columns,
  data,
  sortable = false,
  isLoading = false,
  onItemClick,
  onItemContextMenu,
  caption,
  render = (row: Record<string, any>, rowIndex: number) => {
    return (
      <TableRow
        key={rowIndex}
        onClick={(event) => {
          if (typeof onItemClick === 'function') {
            onItemClick(row, rowIndex, event)
          }
        }}
        onContextMenu={(event) => {
          if (typeof onItemContextMenu === 'function')
            onItemContextMenu(row, rowIndex, event)
        }}
      >
        {columns.map((col, index) => {
          return col && 'key' in col ? (
            <TableCell key={`${col.key}-${index}`}>{row[col.key]}</TableCell>
          ) : (
            <TableCell key={`actions-${index}`}>
              <div className='grid auto-cols-max grid-flow-col gap-1'>
                {col.actions.map(
                  ({ handler, icon, tooltip, ...props }, actionIndex) => (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (typeof handler === 'function') {
                                handler(row, actionIndex, e)
                              }
                            }}
                            {...props}
                          >
                            {icon}
                          </Button>
                        </TooltipTrigger>
                        {tooltip && (
                          <TooltipContent>
                            <p>{tooltip}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  )
                )}
              </div>
            </TableCell>
          )
        })}
      </TableRow>
    )
  },
}: ITableViewProps) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  // Ordenar dados
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection])

  return (
    <Table>
      {caption && <TableCaption className='mt-10'>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={'key' in col ? col.key : 'actions'}
              onClick={() => 'key' in col && sortable && handleSort(col.key)}
              className={sortable ? 'cursor-pointer' : ''}
            >
              {'header' in col ? col.header : ' '}
              {'key' in col && sortable && sortColumn === col.key && (
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
                  <TableCell
                    key={`skeleton-${'key' in col ? col.key : 'actions'}-${index}`}
                  >
                    <Skeleton className='h-8 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : (sortedData ?? []).map(render)}
      </TableBody>
    </Table>
  )
}

export default TableView
