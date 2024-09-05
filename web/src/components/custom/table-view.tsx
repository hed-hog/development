import React, { useCallback, useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableHeadRow,
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
import { SelectableItem } from '@/types/selectable-item'
import SelectAll from './select-all'

interface ITableViewProps<T> {
  columns: ITableColumn[]
  data: T[]
  sortable?: boolean
  isLoading?: boolean
  multipleSelect?: boolean
  onItemDoubleClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  onItemClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  onItemContextMenu?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  caption?: string
  render?: (item: SelectableItem<T>, index: number) => JSX.Element
  onSelectionChange?: (selectedItems: T[]) => void
  itemClassName?: string
}

const TableView = <T extends any>({
  itemClassName,
  onSelectionChange,
  multipleSelect,
  columns,
  data,
  sortable = false,
  isLoading = false,
  onItemClick,
  onItemDoubleClick,
  onItemContextMenu,
  caption,
  render,
}: ITableViewProps<T>) => {
  const [_data, set_data] = useState<SelectableItem<T>[]>([])

  const [selectedItems, setSelectedItems] = useState<string[]>([])
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
      if ((a.data as any)[sortColumn] < (b.data as any)[sortColumn])
        return sortDirection === 'asc' ? -1 : 1
      if ((a.data as any)[sortColumn] > (b.data as any)[sortColumn])
        return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [_data, sortColumn, sortDirection])

  const toggleSelectItem = useCallback(
    (row: SelectableItem<T>) => {
      const id = row.id
      const isSelected = selectedItems.includes(id)

      const updateSelectedItems = (newSelectedItems: any[]) => {
        setSelectedItems(newSelectedItems)
      }

      if (multipleSelect) {
        updateSelectedItems(
          isSelected
            ? selectedItems.filter((item) => item !== id)
            : [...selectedItems, id]
        )
      } else {
        updateSelectedItems(isSelected ? [] : [id])
      }
    },
    [selectedItems, multipleSelect]
  )

  const selectAllItems = useCallback(() => {
    if (selectedItems.length === _data.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(_data.map((row) => row.id))
    }
  }, [_data, selectedItems])

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
          .filter((row) => selectedItems.includes(row.id))
          .map((row) => row.data)
      )
    }
  }, [selectedItems])

  if (!render) {
    render = (row: SelectableItem<T>, index: number) => {
      return (
        <TableRow
          key={index}
          onDoubleClick={(event) => {
            if (typeof onItemDoubleClick === 'function') {
              onItemDoubleClick(row.data, index, event)
            }
          }}
          onClick={(event) => {
            if (typeof multipleSelect === 'boolean') {
              toggleSelectItem(row)
            }
            if (typeof onItemClick === 'function') {
              onItemClick(row.data, index, event)
            }
          }}
          onContextMenu={(event) => {
            if (typeof onItemContextMenu === 'function')
              onItemContextMenu(row.data, index, event)
          }}
          className={[
            itemClassName ?? '',
            selectedItems.includes(row.id) && 'bg-muted/30',
            (typeof multipleSelect === 'boolean' ||
              typeof onItemClick === 'function') &&
              'cursor-pointer',
          ].join(' ')}
        >
          {typeof multipleSelect === 'boolean' && (
            <TableCell>
              <Checkbox checked={selectedItems.includes(row.id)} />
            </TableCell>
          )}
          {columns.map((col, index) => {
            return col && 'key' in col ? (
              <TableCell key={`${col.key}-${index}`}>
                {(row.data as any)[col.key]}
              </TableCell>
            ) : (
              <TableCell key={`actions-${index}`}>
                <div className='grid auto-cols-max grid-flow-col gap-1'>
                  {col.actions.map(
                    ({ handler, icon, tooltip, ...props }, actionIndex) => (
                      <TooltipProvider key={actionIndex}>
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
                              className='px-1'
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
        <TableHeadRow>
          {typeof multipleSelect === 'boolean' && (
            <TableHead>
              <SelectAll
                checked={selectedItems.length === _data.length}
                onChange={selectAllItems}
              />
            </TableHead>
          )}
          {columns.map((col) => (
            <TableHead
              key={'key' in col ? col.key : 'actions'}
              onClick={() => 'key' in col && sortable && handleSort(col.key)}
              className={
                !('actions' in col) && sortable
                  ? 'cursor-pointer hover:bg-muted/50'
                  : ''
              }
              style={{ width: 'width' in col ? col.width : 'auto' }}
            >
              {'header' in col ? col.header : ' '}
              {'key' in col && sortable && sortColumn === col.key && (
                <span>{sortDirection === 'asc' ? '🔼' : '🔽'}</span>
              )}
            </TableHead>
          ))}
        </TableHeadRow>
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
