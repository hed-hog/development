import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUp } from 'lucide-react'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'

type ListViewProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  loading?: boolean
  data: T[]
  render?: (item: T, index: number) => JSX.Element
  selectable?: boolean
  multiple?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
  onSelect?: (row: T, index: number) => void
  onUnselect?: (row: T, index: number) => void
  onItemDoubleClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  onItemClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  textLoading?: string
  textEmpty?: string
  columnName?: string
}

const ListViewInner = <T extends any>(
  {
    loading = false,
    data = [],
    render,
    selectable = false,
    multiple = true,
    onSelectionChange,
    className,
    onSelect,
    onUnselect,
    onItemDoubleClick,
    onItemClick,
    textLoading = 'Loading...',
    textEmpty = 'Empty list',
    columnName = 'Name',
    ...props
  }: ListViewProps<T>,
  ref: React.Ref<any>
) => {
  useImperativeHandle(
    ref,
    () => ({
      toggleSelectItem(item: T) {
        const row = table
          .getRowModel()
          .rows.find((row) => row.original === item)
        if (row) {
          row.toggleSelected(!row.getIsSelected())
        }
      },
      selectAllItems() {
        table.toggleAllRowsSelected(true)
      },
      setSelectedItems(ids: string[]) {
        const rows = table.getRowModel().rows
        rows.forEach((row) => {
          if (ids.includes(row.id)) {
            row.toggleSelected(true)
          } else {
            row.toggleSelected(false)
          }
        })
      },
      getSelectedItems() {
        return table.getSelectedRowModel().rows.map((row) => row.original)
      },
      setData(_data: T[]) {
        table.toggleAllRowsSelected(false)
        _setData([..._data])
      },
    }),
    []
  )

  if (typeof render !== 'function') {
    render = (item: T) => {
      if (typeof item === 'string') {
        return <div className='px-2'>{item}</div>
      }
      return <div className='px-2'>{JSON.stringify(item)}</div>
    }
  }

  const columns = React.useMemo<ColumnDef<T>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) =>
          multiple && (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label='Select all'
            />
          ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              if (!multiple) {
                table.toggleAllRowsSelected(false)
              }
              row.toggleSelected(!!value)
            }}
            aria-label='Select row'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              className='min-w-0 p-0 px-2'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              {columnName}
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp size={16} />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowUp size={16} style={{ transform: 'scaleY(-1)' }} />
              ) : null}
            </Button>
          )
        },
        cell: ({ row }) => render(row.original, row.index),
      },
    ],
    []
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [_data, _setData] = useState(() => [...data])
  const [columnFilters, setColumnFilters] = useState<any>([])
  const [columnVisibility, setColumnVisibility] = useState<any>({
    select: selectable,
    name: true,
  })
  const [rowSelection, setRowSelection] = useState<any>({})
  const [selection, setSelection] = useState<any>({})

  const table = useReactTable({
    data: _data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    const selectedItems = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    )
    const previousSelectedItems = Object.keys(selection).filter(
      (key) => selection[key]
    )

    const addedItems = selectedItems.filter(
      (item) => !previousSelectedItems.includes(item)
    )
    const removedItems = previousSelectedItems.filter(
      (item) => !selectedItems.includes(item)
    )

    addedItems.forEach((id) => {
      if (typeof onSelect === 'function') {
        const data = table.getRowModel().rows.find((r) => r.id === id)?.original
        if (data) {
          onSelect(
            data,
            table.getRowModel().rows.findIndex((r) => r.id === id)
          )
        }
      }
    })

    removedItems.forEach((id) => {
      if (typeof onUnselect === 'function') {
        const data = table.getRowModel().rows.find((r) => r.id === id)?.original
        if (data) {
          onUnselect(
            data,
            table.getRowModel().rows.findIndex((r) => r.id === id)
          )
        }
      }
    })

    setSelection(rowSelection)

    if (typeof onSelectionChange === 'function') {
      onSelectionChange(
        table.getSelectedRowModel().rows.map((row) => row.original)
      )
    }
  }, [rowSelection])

  useEffect(() => {
    table.toggleAllRowsSelected(false)
    _setData([...data])
  }, [data])

  return (
    <div {...props} className={`${className}`} data-component='ListView'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.id === 'select' ? 24 : 'auto' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                {textLoading || 'Carregando...'}
              </TableCell>
            </TableRow>
          ) : (
            <>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={(event) => {
                      row.toggleSelected(!!row.getIsSelected())
                      if (typeof onItemClick === 'function') {
                        onItemClick(row.original, row.index, event)
                      }
                    }}
                    onDoubleClick={(event) => {
                      if (typeof onItemDoubleClick === 'function') {
                        onItemDoubleClick(row.original, row.index, event)
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    {textEmpty || 'Empty list'}
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const ListView = React.forwardRef(ListViewInner) as <T>(
  props: ListViewProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

export default ListView
