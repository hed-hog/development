import { useState } from 'react'
import GridPanel from '@/components/custom/grid-panel'
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
  endpoint: string
  type: 'grid' | 'table'
  responsiveColumns?: IResponsiveColumn
  render?: (item: any) => JSX.Element // Função de renderização personalizada
  itemsPerPage?: number[]
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
  endpoint,
  type,
  itemsPerPage: itemsPerPageOptions = [10, 20, 30, 40],
  title = 'Picker Panel',
  subtitle = "Select items from the list below. Click save when you're done.",
  columns,
  gap = 6,
  padding = 4,
  caption = 'List of Items',
  sortable,
  render,
}: IPickerPanelProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    )
  }

  const handleSelectAll = (data: any[]) => {
    if (isAllSelected) {
      setSelectedIds([])
    } else {
      const allIds = data.map((item) => item.id)
      setSelectedIds(allIds)
    }
    setIsAllSelected(!isAllSelected)
  }

  const renderWithCheckbox = (item: any) => {
    const isChecked = selectedIds.includes(item.id)
    return (
      <div
        key={item.id}
        className='rounded border border-gray-300 p-4'
        onClick={() => handleCheckboxChange(item.id)}
      >
        <Checkbox
          checked={isChecked}
          onChange={() => handleCheckboxChange(item.id)}
        />
        {typeof render === 'function' && render(item)}
      </div>
    )
  }

  const rowActions = [
    {
      label: (row: any) => <Checkbox checked={selectedIds.includes(row.id)} />,
      onClick: (row: any) => handleCheckboxChange(row.id),
      isCheckbox: true,
      isAllSelected: isAllSelected,
      handleSelectAll: handleSelectAll,
    },
  ]

  return (
    <Card className='mx-auto max-w-[80%]'>
      <CardContent className='w-full overflow-auto'>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        {type === 'table' && columns && Boolean(columns?.length) ? (
          <TablePanel
            columns={columns}
            endpoint={endpoint}
            caption={caption}
            sortable={sortable}
            itemsPerPage={[10, 20, 30, 40]} // Opções de itens por página
            rowActions={rowActions}
            onRowClick={(row) => handleCheckboxChange(row.id)}
          />
        ) : (
          <GridPanel
            itemsPerPage={itemsPerPageOptions}
            gap={gap}
            endpoint={endpoint}
            render={renderWithCheckbox}
            padding={padding}
            responsiveColumns={responsiveColumns}
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
