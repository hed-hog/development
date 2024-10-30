import { useState } from 'react'
import { Calendar } from '../ui/calendar'

export default function CalendarDemo() {
  const today = new Date()
  const oneWeekFromToday = new Date(today)
  oneWeekFromToday.setDate(today.getDate() + 7)

  const [range, setRange] = useState<{ from: Date; to: Date }>({
    from: today,
    to: oneWeekFromToday,
  })

  return (
    <Calendar
      name='demo'
      mode='range'
      selected={range}
      onSelect={(range) => setRange(range as any)}
      className='rounded-md border bg-background'
    />
  )
}
