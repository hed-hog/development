import { Checkbox } from '@/components/ui/checkbox'

interface ISelectAllProps {
  checked?: boolean
  label?: string
  onChange?: () => void
}

export default function SelectAll({
  checked = false,
  label = '',
  onChange = () => {},
}: ISelectAllProps) {
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
