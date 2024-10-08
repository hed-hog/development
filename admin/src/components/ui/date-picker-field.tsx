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
import { formatDate } from '@/lib/date-string'
import { FormControl } from './form'

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
  const [open, setOpen] = useState(false)

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
            {date ? formatDate(date.toISOString()) : <span>{label}</span>}
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
