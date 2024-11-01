import { buttonVariants } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { enUS, Locale, ptBR } from 'date-fns/locale'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { useTranslation } from 'react-i18next'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  name: string
}

function Calendar({
  name,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation('calendar', { useSuspense: false })
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  )
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  )
  const currentYear = new Date().getFullYear()

  const months = [
    t('january'),
    t('february'),
    t('march'),
    t('april'),
    t('may'),
    t('june'),
    t('july'),
    t('august'),
    t('september'),
    t('october'),
    t('november'),
    t('december'),
  ]

  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  const locale: { [key: string]: Locale } = {
    en: enUS,
    pt: ptBR,
  }

  const CustomCaption = ({ onMonthChange }: any) => {
    return (
      <div className='flex items-center justify-center space-x-2'>
        {/* Select para o mês */}
        <Select
          name={name}
          value={String(selectedMonth)}
          onValueChange={(value: string) => {
            const month = parseInt(value, 10)
            setSelectedMonth(month)
            const newDate = new Date(selectedYear, month)
            onMonthChange(newDate)
          }}
        >
          <SelectTrigger className='text-sm font-medium'>
            <SelectValue placeholder='Select month' />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={String(index)}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Select para o ano */}
        <Select
          value={String(selectedYear)}
          onValueChange={(value: string) => {
            const year = parseInt(value, 10)
            setSelectedYear(year)
            const newDate = new Date(year, selectedMonth)
            onMonthChange(newDate)
          }}
        >
          <SelectTrigger className='text-sm font-medium'>
            <SelectValue placeholder='Select year' />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      month={new Date(selectedYear, selectedMonth)}
      onMonthChange={(date) => {
        setSelectedMonth(date.getMonth())
        setSelectedYear(date.getFullYear())
      }}
      locale={locale[language]}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 min-w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'min-w-8 absolute left-1',
        nav_button_next: 'min-w-8 absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 min-w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeftIcon className='h-4 w-4' />,
        IconRight: () => <ChevronRightIcon className='h-4 w-4' />,
        Caption: CustomCaption,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
