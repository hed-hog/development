import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableHeadRow,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { formatDate, isValidDateString } from '@/lib/date-string'
import { ITableColumn } from '@/types/table-column'
import {
  IconCaretDownFilled,
  IconColumns,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react'
import React, { useCallback, useImperativeHandle, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { SelectAll } from '@/components/custom/select-items'
import { Button } from '@/components//ui/button'

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
  onSortChange?: (
    field: string,
    order: 'asc' | 'desc',
    isLocale: boolean
  ) => void
  onSelect?: (row: T, index: number) => void
  onUnselect?: (row: T, index: number) => void
  caption?: string
  checked?: (item: any) => boolean
  render?: (item: T, index: number) => JSX.Element
  onSelectionChange?: (selectedItems: T[]) => void
  itemClassName?: string
  selectedIds?: string[]
}

const TableViewInner = <T extends any>(
  {
    extractKey = (item: T) => {
      try {
        return 'id' in (item as any) ? String((item as any).id) : ''
      } catch (error) {
        return uuidv4()
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
    onSortChange,
    caption,
    render,
    onSelect,
    onUnselect,
    selectedIds = [],
  }: ITableViewProps<T>,
  ref: React.Ref<any>
) => {
  const tableViewId = uuidv4()
  const [visibleColumns, setVisibleColumns] = useState<ITableColumn<T>[]>(
    columns || []
  )
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedIds)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null
  )

  useEffectAfterFirstUpdate(() => {
    setVisibleColumns(columns)
  }, [columns])

  const handleSort = useCallback(
    (columnKey: string, isLocale: boolean) => {
      const order = sortDirection === 'asc' ? 'desc' : 'asc'
      setSortColumn(columnKey)
      setSortDirection(order)

      if (typeof onSortChange === 'function') {
        onSortChange(columnKey, order, isLocale)
      }
    },
    [sortDirection, onSortChange]
  )

  const toggleSelectItem = useCallback(
    (item: T, index: number, shiftKey: boolean) => {
      const id = extractKey(item)
      const isSelected = selectedItems.includes(id)

      if (shiftKey && lastSelectedIndex !== null) {
        const startIndex = Math.min(lastSelectedIndex, index)
        const endIndex = Math.max(lastSelectedIndex, index)

        const newSelection = new Set<string>(selectedItems)
        for (let i = startIndex; i <= endIndex; i++) {
          const currentItem = data[i]
          const currentId = extractKey(currentItem)
          if (!newSelection.has(currentId)) {
            newSelection.add(currentId)
            if (typeof onSelect === 'function') {
              onSelect(currentItem, i)
            }
          }
        }
        setSelectedItems(Array.from(newSelection))
      } else {
        if (typeof onSelect === 'function' && !isSelected) {
          onSelect(item, index)
        } else if (typeof onUnselect === 'function' && isSelected) {
          onUnselect(item, index)
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
      }

      setLastSelectedIndex(index)
    },
    [
      selectedItems,
      selectable,
      multiple,
      extractKey,
      data,
      onSelect,
      onUnselect,
      lastSelectedIndex,
    ]
  )

  const selectAllItems = useCallback(() => {
    setSelectedItems((prevSelectedItems) => {
      const newSelection = new Set<string>(prevSelectedItems)

      if (newSelection.size === data.length) {
        // If all items are already selected, unselect all
        if (typeof onUnselect === 'function') {
          for (const id of newSelection) {
            const item = data.find((i) => extractKey(i) === id)
            if (item) {
              onUnselect(
                item,
                data.findIndex((i) => extractKey(i) === id)
              )
            }
          }
        }
        return []
      } else {
        // Select all items
        if (typeof onSelect === 'function') {
          for (const item of data) {
            const id = extractKey(item)
            if (!newSelection.has(id)) {
              onSelect(
                item,
                data.findIndex((i) => extractKey(i) === id)
              )
            }
            newSelection.add(id)
          }
        }

        return Array.from(newSelection)
      }
    })
  }, [data, extractKey, onSelect, onUnselect])

  useEffectAfterFirstUpdate(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(
        data
          .filter((item) => selectedItems.includes(extractKey(item)))
          .map((item) => item)
      )
    }
  }, [selectedItems])

  const onColumnVisibilityChange = (columnKey: string) => {
    setVisibleColumns((prevColumns) => {
      const isColumnVisible = prevColumns.some(
        (col) => 'key' in col && col.key === columnKey
      )

      return isColumnVisible
        ? prevColumns.filter((col) => 'key' in col && col.key !== columnKey)
        : [
            ...prevColumns,
            columns.find((col) => 'key' in col && col.key === columnKey)!,
          ]
    })
  }

  const isAllSelected = React.useMemo(() => {
    const selectedKeys = new Set(selectedItems)
    const itemsToCheck = Array.isArray(data) ? data : []
    return itemsToCheck.every((item) => selectedKeys.has(extractKey(item)))
  }, [selectedItems, data, extractKey])

  const renderCell = (key: string, item: T) => {
    const value = (item as any)[key]

    if (typeof value === 'string' && isValidDateString(value)) {
      return formatDate(value)
    }

    return value
  }

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
              toggleSelectItem(row, index, event.shiftKey)
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
              <Checkbox
                className='mx-2'
                checked={selectedItems.includes(extractKey(row))}
              />
            </TableCell>
          )}
          {visibleColumns.map((col, index) => {
            return col && 'key' in col ? (
              <TableCell key={`${col.key}-${index}`}>
                {typeof col.render === 'function'
                  ? col.render(row, index)
                  : renderCell(col.key, row)}
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

  useImperativeHandle(
    ref,
    () => ({
      selectAllItems() {
        selectAllItems()
      },
      toggleSelectItem(item: T, index: number, shiftKey: boolean) {
        toggleSelectItem(item, index, shiftKey)
      },
      setSelectedItems(ids: string[]) {
        setSelectedItems(ids)
      },
      getSelectedItems() {
        return data.filter((item) => selectedItems.includes(extractKey(item)))
      },
    }),
    [selectAllItems, toggleSelectItem]
  )

  return (
    <Table>
      {caption && <TableCaption className='mt-10'>{caption}</TableCaption>}
      <TableHeader>
        <TableHeadRow>
          {selectable && (
            <TableHead style={{ width: 48 }}>
              {multiple && (
                <SelectAll
                  disableHover={true}
                  checked={isAllSelected}
                  onChange={selectAllItems}
                />
              )}
            </TableHead>
          )}
          {visibleColumns.map((col) => (
            <TableHead
              key={'key' in col ? col.key : 'actions'}
              onClick={() =>
                'key' in col && sortable && handleSort(col.key, col.isLocale)
              }
              onMouseEnter={() => 'key' in col && setHoveredColumn(col.key)}
              onMouseLeave={() => setHoveredColumn(null)}
              className={[
                !('actions' in col) && sortable
                  ? 'relative cursor-pointer hover:bg-muted/50'
                  : '',
                'overflow-hidden text-ellipsis whitespace-nowrap',
              ].join(' ')}
              style={{
                width: 'width' in col ? col.width : 'auto',
                maxWidth: '170px',
              }}
            >
              {'header' in col ? col.header : ' '}
              {'key' in col && sortable && sortColumn === col.key && (
                <span>{sortDirection === 'asc' ? '🔼' : '🔽'}</span>
              )}

              {'key' in col &&
                sortable &&
                typeof onSortChange === 'function' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      className={`ml-auto ${hoveredColumn === col.key ? 'visible' : 'invisible'}`}
                    >
                      <Button
                        variant='outline'
                        className='absolute right-0 top-0 h-full min-w-2 px-1'
                      >
                        <IconCaretDownFilled className='h-5 w-5' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          onSortChange(col.key, 'asc', col.isLocale)
                        }
                      >
                        <IconSortAscending className='mr-2' />
                        Ascendente
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onSortChange(col.key, 'desc', col.isLocale)
                        }
                      >
                        <IconSortDescending className='mr-2' />
                        Descendente
                      </DropdownMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className='flex w-full justify-start border-none px-2'
                            variant='outline'
                            size='sm'
                          >
                            <IconColumns className='mr-3 h-5 w-5 cursor-pointer' />
                            <span className='text-sm font-normal'>Colunas</span>
                            <IconCaretDownFilled className='absolute right-2 w-4 text-white/50' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {columns?.map((column) => (
                            <DropdownMenuRadioGroup
                              key={String('key' in column && column.key)}
                              value={String('key' in column && column.key)}
                            >
                              <DropdownMenuRadioItem
                                value={String('key' in column && column.key)}
                                onClick={() =>
                                  onColumnVisibilityChange(
                                    String('key' in column && column.key)
                                  )
                                }
                              >
                                <Checkbox
                                  checked={visibleColumns.some(
                                    (vc) =>
                                      'key' in vc &&
                                      'key' in column &&
                                      vc.key === column.key
                                  )}
                                  onChange={() =>
                                    onColumnVisibilityChange(
                                      String('key' in column && column.key)
                                    )
                                  }
                                  className='mr-2'
                                />
                                {'header' in column && column.header}
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
            </TableHead>
          ))}
        </TableHeadRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={`${tableViewId}-loading-${index}`}>
                {columns.map((col) => (
                  <TableCell
                    key={`${tableViewId}-loading-${index}-${'key' in col ? col.key : 'actions'}`}
                  >
                    <Skeleton className='h-8 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : (Array.isArray(data) ? data : []).map(render)}
      </TableBody>
    </Table>
  )
}

const TableView = React.forwardRef(TableViewInner) as <T>(
  props: ITableViewProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

export default TableView
