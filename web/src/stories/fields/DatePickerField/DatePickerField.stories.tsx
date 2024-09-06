import { useState } from 'react'
import { DatePickerField } from '@/components/ui/date-picker-field'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DatePickerField> = {
  title: 'Fields/DatePickerField',
  component: DatePickerField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', defaultValue: 'Pick a date' },
    icon: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Story com estado controlado para a data
const DatePickerExample = ({ label }: { label: string }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <DatePickerField
      label={label}
      date={selectedDate}
      onDateChange={handleDateChange}
    />
  )
}

// Story padrão para o DatePickerField
export const Default: Story = {
  render: () => <DatePickerExample label='Selecione uma data' />,
}
