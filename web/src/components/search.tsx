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
      <div className='absolute aspect-square h-[36px]'>
        {icon}
        {!icon && <IconSearch className='absolute left-1 top-1 w-5' />}
      </div>
      <Input
        value={value}
        onChange={setValue}
        type='search'
        placeholder={placeholder || 'Search...'}
        className='h-[36px] w-full pb-[7px] pl-8'
      />
    </div>
  )
}
