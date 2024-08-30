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

interface IPickerPanelProps {
  endpoint: string
  type: 'grid' | 'table'
  title?: string
  subtitle?: string
  padding?: number
  columns?: Array<{
    key: string
    header: string
  }>
  render: (item: any) => JSX.Element // Função de renderização personalizada
}

export default function PickerPanel({
  endpoint,
  type,
  title = 'Picker Panel',
  subtitle = "Select items from the list below. Click save when you're done.",
  columns,
  padding = 4,
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
        {render(item)}
      </div>
    )
  }

  return (
    <>
      <Button variant='outline' onClick={open}>
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
              caption='List of Items'
            />
          ) : (
            <GridPanel
              endpoint={endpoint}
              render={renderWithCheckbox}
              padding={padding}
              responsiveColumns={{
                default: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
              }}
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
