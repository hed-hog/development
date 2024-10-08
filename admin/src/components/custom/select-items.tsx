import { Checkbox } from '@/components/ui/checkbox'
import { useTranslation } from 'react-i18next'

interface ISelectAllProps {
  checked?: boolean
  label?: string
  onChange?: () => void
  disableHover?: boolean
}

interface ISelectedItemsProps<T> {
  selectedItems: T[]
  onClick?: () => void
}

export const SelectAll = ({
  checked = false,
  label = '',
  onChange = () => {},
  disableHover = false,
}: ISelectAllProps) => {
  return (
    <div
      className={`mx-2 flex cursor-pointer select-none items-center gap-x-2 py-2 ${disableHover === false && 'hover:bg-muted/50'}`}
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
  const { t } = useTranslation('pagination')

  return (
    <p
      className={`mt-2 ${selectedItems.length > 0 && 'cursor-pointer'} text-sm ${(selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
      onClick={onClick}
    >
      {selectedItems && selectedItems.length > 0 && (
        <>
          {(selectedItems ?? []).length} {t('selected')}
        </>
      )}
      {(!selectedItems || selectedItems.length === 0) && t('noneSelected')}
    </p>
  )
}
