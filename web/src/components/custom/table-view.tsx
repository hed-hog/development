import React, { useCallback, useEffect, useState } from 'react'
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
import { Checkbox } from '../ui/checkbox'
import { v4 as uuidv4 } from 'uuid'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'

type TableRow<T> = {
  id: string
  data: T
}

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
  render?: (item: TableRow<Record<string, any>>, index: number) => JSX.Element
  onSelectionChange?: (selectedItems: Array<Record<string, any>>) => void
}

const TableView = ({
  onSelectionChange,
  multipleSelect,
  columns,
  data,
  sortable = false,
  isLoading = false,
  onItemClick,
  onItemContextMenu,
  caption,
  render,
}: ITableViewProps) => {
  const [_data, set_data] = useState<TableRow<Record<string, any>>[]>([])

  const [selectedRows, setSelectedRows] = useState<string[]>([])
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
    if (!sortColumn) return _data
    return [..._data].sort((a, b) => {
      if (a.data[sortColumn] < b.data[sortColumn])
        return sortDirection === 'asc' ? -1 : 1
      if (a.data[sortColumn] > b.data[sortColumn])
        return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [_data, sortColumn, sortDirection])

  const toggleSelectRow = useCallback(
    (row: TableRow<Record<string, any>>) => {
      const id = row.id

      if (selectedRows.includes(id)) {
        setSelectedRows((prev) => prev.filter((item) => item !== id))
      } else {
        setSelectedRows((prev) => [...prev, id])
      }
    },
    [selectedRows]
  )

  const selectAllRows = useCallback(() => {
    if (selectedRows.length === _data.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(_data.map((row) => row.id))
    }
  }, [_data, selectedRows])

  useEffect(() => {
    set_data(
      data.map((item) => ({
        id: uuidv4(),
        data: item,
      }))
    )
  }, [data])

  useEffectAfterFirstUpdate(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(
        _data
          .filter((row) => selectedRows.includes(row.id))
          .map((row) => row.data)
      )
    }
  }, [selectedRows])

  if (!render) {
    render = (row: TableRow<Record<string, any>>, rowIndex: number) => {
      return (
        <TableRow
          key={rowIndex}
          onClick={(event) => {
            if (typeof onItemClick === 'function') {
              onItemClick(row.data, rowIndex, event)
            }
          }}
          onContextMenu={(event) => {
            if (typeof onItemContextMenu === 'function')
              onItemContextMenu(row.data, rowIndex, event)
          }}
        >
          {typeof multipleSelect === 'boolean' && multipleSelect && (
            <TableCell>
              <Checkbox
                checked={selectedRows.includes(row.id)}
                onCheckedChange={() => {
                  toggleSelectRow(row)
                }}
              />
            </TableCell>
          )}
          {columns.map((col, index) => {
            return col && 'key' in col ? (
              <TableCell key={`${col.key}-${index}`}>
                {row.data[col.key]}
              </TableCell>
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
    }
  }

  return (
    <Table>
      {caption && <TableCaption className='mt-10'>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {typeof multipleSelect === 'boolean' && multipleSelect && (
            <TableHead>
              <Checkbox
                checked={selectedRows.length === _data.length}
                onCheckedChange={() => selectAllRows()}
              />
            </TableHead>
          )}
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
