import React, { useCallback, useState } from 'react'
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
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SelectAll } from './select-items'

interface ITableViewProps<T> {
  columns: ITableColumn<T>[]
  data: T[]
  sortable?: boolean
  isLoading?: boolean
  selectable?: boolean
  multiple?: boolean
  extractKey?: (item: T) => string
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
  onSelect?: (row: T, index: number) => void
  onUnselect?: (row: T, index: number) => void
  caption?: string
  render?: (item: T, index: number) => JSX.Element
  onSelectionChange?: (selectedItems: T[]) => void
  itemClassName?: string
  selectedIds?: string[]
}

const TableView = <T extends any>({
  extractKey = (item: T) => {
    try {
      return 'id' in (item as any) ? String((item as any).id) : ''
    } catch (e) {
      return ''
    }
  },
  itemClassName,
  onSelectionChange,
  selectable = false,
  multiple = true,
  columns,
  data,
  sortable = false,
  isLoading = false,
  onItemClick,
  onItemDoubleClick,
  onItemContextMenu,
  caption,
  render,
  onSelect,
  onUnselect,
  selectedIds = [],
}: ITableViewProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedIds)
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
    return [...data].sort((a: any, b: any) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection])

  const toggleSelectItem = useCallback(
    (item: T) => {
      const id = extractKey(item)
      const isSelected = selectedItems.includes(id)

      if (typeof onSelect === 'function' && !isSelected) {
        onSelect(
          item,
          data.findIndex((item) => extractKey(item) === id)
        )
      } else if (typeof onUnselect === 'function' && isSelected) {
        onUnselect(
          item,
          data.findIndex((item) => extractKey(item) === id)
        )
      }

      if (selectable) {
        if (multiple) {
          setSelectedItems(
            isSelected
              ? selectedItems.filter((item) => item !== id)
              : [...selectedItems, id]
          )
        } else {
          setSelectedItems(isSelected ? [] : [id])
        }
      }
    },
    [selectedItems, selectable, multiple, extractKey]
  )

  const selectAllItems = useCallback(() => {
    if (selectedItems.length === data.length) {
      if (typeof onUnselect === 'function') {
        for (const id of selectedItems) {
          const item = data.find((i) => extractKey(i) === id)
          if (item) {
            onUnselect(
              item,
              data.findIndex((i) => extractKey(i) === id)
            )
          }
        }
      }

      setSelectedItems([])
    } else {
      if (typeof onSelect === 'function') {
        for (const item of data) {
          onSelect(
            item,
            data.findIndex((i) => extractKey(i) === extractKey(item))
          )
        }
      }

      setSelectedItems(data.map((i) => extractKey(i)))
    }
  }, [data, selectedItems, extractKey])

  useEffectAfterFirstUpdate(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(
        data
          .filter((item) => selectedItems.includes(extractKey(item)))
          .map((item) => item)
      )
    }
  }, [selectedItems])

  useEffectAfterFirstUpdate(() => {
    if (multiple) {
      setSelectedItems(selectedIds)
    }
  }, [selectedIds])

  if (!render) {
    render = (row: T, index: number) => {
      return (
        <TableRow
          key={index}
          onDoubleClick={(event) => {
            if (typeof onItemDoubleClick === 'function') {
              onItemDoubleClick(row, index, event)
            }
          }}
          onClick={(event) => {
            if (selectable) {
              toggleSelectItem(row)
            }
            if (typeof onItemClick === 'function') {
              onItemClick(row, index, event)
            }
          }}
          onContextMenu={(event) => {
            if (typeof onItemContextMenu === 'function')
              onItemContextMenu(row, index, event)
          }}
          className={[
            itemClassName ?? '',
            selectedItems.includes(extractKey(row)) && 'bg-muted/30',
            (selectable || typeof onItemClick === 'function') &&
              'cursor-pointer',
          ].join(' ')}
        >
          {selectable && (
            <TableCell>
              <Checkbox checked={selectedItems.includes(extractKey(row))} />
            </TableCell>
          )}
          {columns.map((col, index) => {
            return col && 'key' in col ? (
              <TableCell key={`${col.key}-${index}`}>
                {(row as any)[col.key]}
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
          {selectable && multiple && (
            <TableHead>
              <SelectAll
                checked={selectedItems.length === data.length}
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
