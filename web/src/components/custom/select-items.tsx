import { Checkbox } from '@/components/ui/checkbox'

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
      className={`mt-2 cursor-pointer text-sm ${(selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
      onClick={onClick}
    >
      {(selectedItems ?? []).length} itens selecionados
    </p>
  )
}
