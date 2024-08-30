import { useState } from 'react'
import GridPanel from '@/components/custom/grid-panel'
import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import TablePanel from './table-panel'
import { Checkbox } from '@/components/ui/checkbox'
import { useDialog } from '@/hooks/use-dialog'
import { IResponsiveColumn } from '@/types/responsive-columns'

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
  const { isOpen, open, close } = useDialog()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    )
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
    },
  ]

  return (
    <>
      <Button variant='outline' onClick={open} className='w-full'>
        Open Picker
      </Button>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className='max-h-[95%] max-w-[90%] overflow-auto'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
          </DialogHeader>
          {type === 'table' && columns && Boolean(columns?.length) ? (
            <TablePanel
              columns={columns}
              endpoint={endpoint}
              caption={caption}
              sortable={sortable}
              itemsPerPage={[10, 20, 30, 40]} // Opções de itens por página
              rowActions={rowActions}
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
          <DialogFooter className={`px-${padding}`}>
            <Button type='submit' onClick={() => console.log(selectedIds)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
