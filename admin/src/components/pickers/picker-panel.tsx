import { Button, ButtonProps } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IPaginationOption } from '@/types/pagination-options'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { IStyleOption } from '@/types/style-options'
import { ITableColumn } from '@/types/table-column'
import { useEffect, useState } from 'react'
import { DataPanel } from '@/components/panels/data-panel'

interface IPickerPanelProps<T> {
  url: string
  type: 'grid' | 'table' | 'list'
  title?: string
  subtitle?: string
  caption?: string
  sortable?: boolean
  render?: (item: any) => JSX.Element
  responsiveColumns?: IResponsiveColumn
  paginationOptions?: IPaginationOption
  styleOptions?: IStyleOption
  columns?: ITableColumn<T>[]
  buttons?: (ButtonProps & { text: string })[]
  onSelectionChange?: (selectedItems: (string | Record<string, any>)[]) => void
}

export default function PickerPanel<T extends {}>({
  responsiveColumns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  url,
  type,
  paginationOptions = {
    pageSizeOptions: [10, 20, 30, 40],
  },
  title = 'Picker Panel',
  subtitle = "Select items from the list below. Click save when you're done.",
  columns,
  styleOptions = {
    gap: 6,
    padding: 4,
  },
  caption = 'List of Items',
  sortable,
  buttons = [],
  render,
  onSelectionChange,
}: IPickerPanelProps<T>) {
  const id = `${url}-picker-panel`
  const [selectedIds, setSelectedIds] = useState<
    (string | Record<string, any>)[]
  >([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filteredData, setFilteredData] = useState<any[]>([])

  useEffect(() => {
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(selectedIds)
    }
  }, [selectedIds])

  const handleCheckboxChange = (row: any, id: string) => {
    setSelectedIds((prevSelectedIds) => {
      const isAlreadySelected = prevSelectedIds.includes(id)
      const updatedSelectedIds = isAlreadySelected
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]

      setSelectedIds(updatedSelectedIds)
      setFilteredData((prevFilteredData) => {
        const isInFilteredData = prevFilteredData.some((item) => item.id === id)
        return isInFilteredData
          ? prevFilteredData.filter((item) => item.id !== id)
          : [...prevFilteredData, row]
      })

      if (typeof onSelectionChange === 'function') {
        onSelectionChange(updatedSelectedIds)
      }

      return updatedSelectedIds
    })
  }

  const handleSelectAll = (data: any[]) => {
    let newSelectedIds
    let newFilteredData

    if (isAllSelected) {
      newSelectedIds = selectedIds.filter(
        (id) => !data.some((d) => d.id === id)
      )
      newFilteredData = filteredData.filter(
        (item) => !data.some((d) => d.id === item.id)
      )
    } else {
      const newIds = new Set(data.map((item) => item.id))
      newSelectedIds = [
        ...selectedIds.filter((id) => !newIds.has(id)),
        ...data.map((item) => item.id),
      ]
      newFilteredData = [
        ...filteredData.filter((item) => !newIds.has(item.id)),
        ...data,
      ]
    }

    setSelectedIds(newSelectedIds)
    setFilteredData(newFilteredData)
    setIsAllSelected(!isAllSelected)
    onSelectionChange?.(newSelectedIds)
  }

  return (
    <Card className='mx-auto max-w-[95%]'>
      <CardContent className='w-full overflow-auto'>
        {(title || subtitle) && (
          <CardHeader className='px-4'>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </CardHeader>
        )}

        {type === 'table' && columns && Boolean(columns?.length) ? (
          <DataPanel
            layout='table'
            id={id}
            columns={columns}
            url={url}
            caption={caption}
            sortable={sortable}
            selectable={true}
            multiple={true}
            hasSearch={true}
            render={render}
            onSelectionChange={(selectedItems) => {
              setSelectedIds(selectedItems)
            }}
            onItemClick={(row: any) => handleCheckboxChange(row, row.id)}
            paginationOptions={{
              pageSizeOptions: paginationOptions?.pageSizeOptions,
            }}
            selectOptions={{
              selectedItems: filteredData,
              setIsAllSelected,
              isAllSelected,
              handleSelectAll,
            }}
          />
        ) : type === 'grid' ? (
          <DataPanel
            layout='grid'
            selectable={true}
            multiple={true}
            hasSearch={true}
            id={id}
            render={render}
            paginationOptions={{
              pageSizeOptions: paginationOptions?.pageSizeOptions,
            }}
            styleOptions={{
              gap: styleOptions.gap,
              padding: styleOptions.padding,
            }}
            url={url}
            responsiveColumns={responsiveColumns}
            selectOptions={{
              selectedItems: filteredData,
              setIsAllSelected,
              isAllSelected,
              handleSelectAll,
            }}
          />
        ) : (
          <DataPanel
            layout='list'
            id={id}
            url={url}
            selectable={true}
            multiple={true}
            hasSearch={true}
            render={render}
            paginationOptions={{
              pageSizeOptions: paginationOptions?.pageSizeOptions,
            }}
            onSelectionChange={(selectedItems) => {
              setSelectedIds(() => [...selectedItems])
            }}
            styleOptions={{
              gap: styleOptions.gap,
              padding: styleOptions.padding,
            }}
            selectOptions={{
              selectedItems: filteredData,
              setIsAllSelected,
              isAllSelected,
              handleSelectAll,
            }}
          />
        )}
        <CardFooter className={`flex w-full justify-between p-0 py-4`}>
          <div className='flex gap-2'>
            {buttons.map(({ text, onClick, ...props }, index) => (
              <Button key={index} {...props} onClick={onClick}>
                {text}
              </Button>
            ))}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
