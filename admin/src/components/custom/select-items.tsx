import { Checkbox } from '@/components/ui/checkbox'
import { isPlural } from '@/lib/utils'

interface ISelectAllProps {
  checked?: boolean
  label?: string
  onChange?: () => void
}

interface ISelectedItemsProps<T> {
  selectedItems: T[]
  onClick?: () => void
}

export const SelectAll = ({
  checked = false,
  label = '',
  onChange = () => {},
}: ISelectAllProps) => {
  return (
    <div
      className='flex cursor-pointer select-none items-center gap-x-2 py-2 hover:bg-muted/50'
      onClick={typeof onChange === 'function' ? onChange : () => {}}
    >
      <Checkbox checked={checked} />
      <span className='font-bold'>{label}</span>
    </div>
  )
}

export const SelectedItems = <T extends any>({
  selectedItems,
  onClick,
}: ISelectedItemsProps<T>) => {
  return (
    <p
      className={`mt-2 ${selectedItems.length > 0 && 'cursor-pointer'} text-sm ${(selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
      onClick={onClick}
    >
      {selectedItems && selectedItems.length > 0 && (
        <>
          {(selectedItems ?? []).length} ite
          {isPlural(selectedItems.length, 'm', 'ns')} selecionado
          {isPlural(selectedItems.length)}
        </>
      )}
      {(!selectedItems || selectedItems.length === 0) &&
        'Nenhum item selecionado'}
    </p>
  )
}
