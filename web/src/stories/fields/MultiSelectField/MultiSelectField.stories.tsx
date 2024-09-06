import { Meta, StoryObj } from '@storybook/react'
import { MultiSelectField } from '@/components/ui/multi-select-field'
import React from 'react'

const meta: Meta<typeof MultiSelectField> = {
  title: 'Fields/MultiSelectField',
  component: MultiSelectField,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    placeholder: { control: 'text' },
    readOnly: { control: 'boolean' },
    animation: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof MultiSelectField>

// Exemplo de story com estado controlado
export const Default: Story = {
  render: (args) => {
    const [selectedOptions, setSelectedOptions] = React.useState(
      args.value || []
    )

    return (
      <MultiSelectField
        {...args}
        value={selectedOptions}
        onChange={setSelectedOptions}
      />
    )
  },
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    value: [],
    placeholder: 'Select options',
    readOnly: false,
    animation: 0,
    onChange: (newValue: string[]) => {
      console.log('Selected options:', newValue)
    },
  },
}
