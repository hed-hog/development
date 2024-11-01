import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface IProps {
  value?: string
  placeholder?: string
  icon?: JSX.Element
  buttonText?: string
  onSearch?: (value: string) => void
}

export function SearchField({
  value = '',
  placeholder,
  icon,
  buttonText,
  onSearch = () => {},
}: IProps) {
  const { t } = useTranslation('search')

  const [search, setSearch] = useState<string>(value)

  const callOnSearch = useCallback(() => {
    if (typeof onSearch === 'function') {
      onSearch(search)
    }
  }, [search])

  return (
    <div className='relative flex w-full'>
      <div className='absolute left-2 top-2 text-muted-foreground'>
        {icon}
        {!icon && <IconSearch className='h-5 w-5 text-gray-500' />}
      </div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type='search'
        placeholder={placeholder || t('search')}
        onKeyUp={(e) => e.key === 'Enter' && callOnSearch()}
        className='flex-1 bg-transparent py-2 pl-8 pr-20 text-sm focus:ring-0'
      />
      <Button
        variant='ghost'
        onClick={callOnSearch}
        className='absolute right-0 rounded-r-lg px-4 py-2'
      >
        {buttonText || t('search')}
      </Button>
    </div>
  )
}
