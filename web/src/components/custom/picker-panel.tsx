import { useState } from 'react'
import GridPanel from '@/components/custom/grid-panel'
import ListPanel from '@/components/custom/list-panel' // Importe o ListPanel
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

interface IPickerPanelProps {
  url: string
  type: 'grid' | 'table' | 'list' // Adicione o novo tipo "list"
  responsiveColumns?: IResponsiveColumn
  render?: (item: any) => JSX.Element // Função de renderização personalizada
  pageSizeOptions?: number[]
  title?: string
  subtitle?: string
  gap?: number
  padding?: number
  columns?: Array<{
    key: string
    header: string
  }>
  caption?: string
  sortable?: boolean
}

export default function PickerPanel({
  responsiveColumns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  url,
  type,
  pageSizeOptions = [10, 20, 30, 40],
  title = 'Picker Panel',
  subtitle = "Select items from the list below. Click save when you're done.",
  columns,
  gap = 6,
  padding = 4,
  caption = 'List of Items',
  sortable,
  render,
}: IPickerPanelProps) {
  const id = `${url}-picker-panel`
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [filteredData, setFilteredData] = useState<any[]>([])

  const handleCheckboxChange = (row: any, id: number) => {
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

  const rowActions = [
    {
      label: (row: any) => <Checkbox checked={selectedIds.includes(row.id)} />,
      onClick: (row: any) => handleCheckboxChange(row, row.id),
      isCheckbox: true,
      isAllSelected: isAllSelected,
      handleSelectAll: handleSelectAll,
    },
  ]

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
            pageSizeOptions={pageSizeOptions} // Opções de itens por página
            rowActions={rowActions}
            onRowClick={(row) => handleCheckboxChange(row, row.id)}
            selectedItems={filteredData}
            setIsAllSelected={setIsAllSelected}
          />
        ) : type === 'grid' ? (
          <GridPanel
            id={id}
            pageSizeOptions={pageSizeOptions}
            gap={gap}
            url={url}
            render={renderWithCheckbox}
            padding={padding}
            responsiveColumns={responsiveColumns}
            selectedItems={filteredData}
            setIsAllSelected={setIsAllSelected}
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
          />
        ) : (
          <ListPanel
            id={id}
            pageSizeOptions={pageSizeOptions}
            gap={gap}
            url={url}
            render={renderWithCheckbox}
            padding={padding}
            selectedItems={filteredData}
            setIsAllSelected={setIsAllSelected}
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
          />
        )}
        <CardFooter className={`flex w-full justify-end px-${padding} py-4`}>
          <Button type='submit' onClick={() => console.log(selectedIds)}>
            Save changes
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
