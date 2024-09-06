import { DatePickerField } from '@/components/ui/date-picker-field'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DatePickerField> = {
  title: 'Fields/DatePickerField',
  component: DatePickerField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `DatePickerField is a versatile and user-friendly date picker component designed for React applications. It allows users to select dates through an intuitive and interactive calendar interface, making it ideal for forms, booking systems, and any application that requires date input.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'An icon to display inside the date picker field.',
      type: 'function',
    },
    label: {
      description: 'The label for the date picker field.',
      control: 'text',
      defaultValue: 'Pick a date',
    },
    date: {
      description: 'The currently selected date.',
      control: 'date',
    },
    onDateChange: {
      description: 'Function triggered when the date changes.',
      action: 'changed',
    },
    style: {
      description:
        'Inline styles to apply to the main button of the date picker.',
      control: 'object',
    },
    calendar: {
      description:
        'Custom styles and configuration for the calendar component.',
      control: 'object',
      properties: {
        style: {
          description: 'Inline styles to apply to the calendar component.',
          control: 'object',
        },
      },
    },
    className: {
      description:
        'Additional CSS classes to apply to the main button of the date picker.',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <DatePickerField {...args} label={args.label || 'Pick a date'} />
  ),
}
