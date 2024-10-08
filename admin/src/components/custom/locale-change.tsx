import { IconCheck, IconLanguage, IconWorld } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export const LocaleChange = () => {
  const { i18n, t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='scale-95 px-2'
          style={{ width: 'auto' }}
        >
          <IconLanguage size={16} className='mr-2 h-4 w-4' />
          {t(i18n.language)}
          <span className='sr-only'>Toggle Locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
          {t('en')}{' '}
          <IconCheck
            size={14}
            className={cn('ml-auto', i18n.language !== 'en' && 'hidden')}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => i18n.changeLanguage('pt')}>
          {t('pt')}
          <IconCheck
            size={14}
            className={cn('ml-auto', i18n.language !== 'pt' && 'hidden')}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
