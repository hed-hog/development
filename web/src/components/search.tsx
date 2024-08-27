import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import { ChangeEvent } from 'react'

interface IProps {
  value: string
  placeholder: string
  setValue: (e: ChangeEvent<HTMLInputElement>) => void
  icon?: JSX.Element
}

export function Search({ value, setValue, placeholder, icon }: IProps) {
  return (
    <div className='relative'>
      <Input
        value={value}
        onChange={setValue}
        type='search'
        placeholder={placeholder || 'Search...'}
        className='w-full'
      />
      {icon}
      {!icon && <IconSearch className='absolute right-1 top-1 w-5' />}
    </div>
  )
}
