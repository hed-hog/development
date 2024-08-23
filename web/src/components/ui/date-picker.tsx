import { CSSProperties, useState } from 'react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/custom/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface IDatePickerProps {
  label: string
  icon: JSX.Element
  date?: Date
  onDateChange?: (date: Date) => void
  style?: CSSProperties
  calendar?: {
    style?: CSSProperties
  }
  className?: string
}

export default function DatePicker({
  label,
  icon,
  date,
  onDateChange,
  style,
  calendar,
  className,
}: IDatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          style={style}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          {icon}
          {date ? format(date, 'dd/MM/yyyy') : <span>{label}</span>}
        </Button>
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
