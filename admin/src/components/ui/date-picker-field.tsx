import { CSSProperties, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/custom/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { FormControl } from './form'
import { format, Locale } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'

interface IDatePickerFieldProps {
  icon?: JSX.Element
  label?: string
  date?: Date
  onDateChange?: (date: Date) => void
  style?: CSSProperties
  calendar?: {
    style?: CSSProperties
  }
  className?: string
}

export function DatePickerField({
  label,
  icon,
  date,
  onDateChange,
  style,
  calendar,
  className,
}: IDatePickerFieldProps) {
  const {
    i18n: { language },
  } = useTranslation()

  const [open, setOpen] = useState(false)

  const locales: { [key: string]: Locale } = {
    en: enUS,
    pt: ptBR,
  }

  const formatDateToUTC = (date: Date) => {
    const utcDate = new Date(date.toUTCString())
    if (date.getHours() >= 21) {
      utcDate.setUTCDate(utcDate.getUTCDate() + 1)
    }
    return format(utcDate, 'P', { locale: locales[language] })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            style={style}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className
            )}
          >
            {icon || <CalendarIcon className='mr-2 h-4 w-4' />}
            {date ? formatDateToUTC(date) : <span>{label}</span>}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='align-center flex justify-center p-0'>
        <Calendar
          style={calendar?.style}
          mode='single'
          selected={date}
          onSelect={(date) => {
            if (date) {
              onDateChange?.(date)
              setOpen(false)
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
