import { useState } from 'react'
import GridPanel from '@/components/custom/grid-panel'
import ListPanel from '@/components/custom/list-panel'
import { Button } from '@/components/custom/button'
import TablePanel from './table-panel'
import { Checkbox } from '@/components/ui/checkbox'
import { IResponsiveColumn } from '@/types/responsive-columns'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IStyleOption } from '@/types/style-options'
import { IPaginationOption } from '@/types/pagination-options'
import { ITableColumn } from '@/types/table-column'

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
}

export default function PickerPanel<T>({
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
  render,
}: IPickerPanelProps<T>) {
  const id = `${url}-picker-panel`
  const [selectedIds, setSelectedIds] = useState<
    (string | Record<string, any>)[]
  >([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filteredData, setFilteredData] = useState<any[]>([])

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

      return updatedSelectedIds
    })
  }

  const handleSelectAll = (data: any[]) => {
    if (isAllSelected) {
      setSelectedIds((prevIds) =>
        prevIds.filter((id) => !data.some((d) => d.id === id))
      )
      setFilteredData((prevData) =>
        prevData.filter((item) => !data.some((d) => d.id === item.id))
      )
    } else {
      const newIds = new Set(data.map((item) => item.id))

      setFilteredData((prevData) => [
        ...prevData.filter((item) => !newIds.has(item.id)),
        ...data,
      ])

      setSelectedIds((prevIds) => [
        ...prevIds.filter((id) => !newIds.has(id)),
        ...data.map((item) => item.id),
      ])
    }

    setIsAllSelected(!isAllSelected)
  }

  const renderWithCheckbox = (item: any) => {
    const isChecked = selectedIds.includes(item.id)
    return (
      <div
        key={item.id}
        className='rounded border border-gray-300 p-4'
        onClick={() => handleCheckboxChange(item, item.id)}
      >
        <Checkbox
          checked={isChecked}
          onChange={() => handleCheckboxChange(item, item.id)}
        />
        {typeof render === 'function' && render(item)}
      </div>
    )
  }

  return (
    <Card className='mx-auto max-w-[95%]'>
      <CardContent className='w-full overflow-auto'>
        <CardHeader className='px-4'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        {type === 'table' && columns && Boolean(columns?.length) ? (
          <TablePanel
            id={id}
            columns={columns}
            url={url}
            caption={caption}
            sortable={sortable}
            multipleSelect={true}
            onSelectionChange={(selectedItems) => {
              setSelectedIds((prevIds) => [...prevIds, ...selectedItems])
            }}
            onRowClick={(row) => handleCheckboxChange(row, row.id)}
            paginationOptions={{
              pageSizeOptions: paginationOptions?.pageSizeOptions,
            }}
            selectOptions={{
              selectedItems: selectedIds,
              setIsAllSelected,
            }}
          />
        ) : type === 'grid' ? (
          <GridPanel
            id={id}
            paginationOptions={{
              pageSizeOptions: paginationOptions?.pageSizeOptions,
            }}
            styleOptions={{
              gap: styleOptions.gap,
              padding: styleOptions.padding,
            }}
            url={url}
            render={renderWithCheckbox}
            responsiveColumns={responsiveColumns}
            selectOptions={{
              selectedItems: filteredData,
              setIsAllSelected,
              isAllSelected,
              handleSelectAll,
            }}
          />
        ) : (
          <ListPanel
            id={id}
            url={url}
            render={renderWithCheckbox}
            paginationOptions={{
              pageSizeOptions: paginationOptions?.pageSizeOptions,
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
        <CardFooter
          className={`flex w-full justify-end px-${styleOptions.padding} py-4`}
        >
          <Button type='submit' onClick={() => console.log(selectedIds)}>
            Save changes
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
