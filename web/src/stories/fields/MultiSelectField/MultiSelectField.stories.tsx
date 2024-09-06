import { Meta, StoryObj } from '@storybook/react'
import { MultiSelectField } from '@/components/ui/multi-select-field'
import React from 'react'

const meta: Meta<typeof MultiSelectField> = {
  title: 'Fields/MultiSelectField',
  component: MultiSelectField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The MultiSelectField component provides a flexible multi-select dropdown with search functionality. It's ideal for selecting multiple options from a list and can be used in various forms and interfaces. The component supports various configurations like custom styles, placeholder text, and animation effects.`,
      },
    },
  },
  argTypes: {
    options: {
      description:
        'An array of options available for selection. Each option should have a `label` and `value` property.',
      control: 'object',
    },
    value: {
      description:
        'An array of currently selected values. These should correspond to the `value` properties of the options.',
      control: 'object',
    },
    onChange: {
      description:
        'Callback function triggered when the selected options change. Receives the new array of selected values.',
      action: 'changed',
    },
    placeholder: {
      description: 'Placeholder text to display when no options are selected.',
      control: 'text',
      type: 'string',
    },
    defaultValue: {
      description:
        'Initial array of selected values. This value will be used when the component is first rendered.',
      control: 'object',
    },
    readOnly: {
      description:
        "If true, the multi-select field will be read-only and users won't be able to select or deselect options.",
      control: 'boolean',
      type: 'boolean',
    },
    animation: {
      description:
        'Duration of the animation applied to selected options in seconds. Set to 0 to disable animations.',
      control: 'number',
    },
    input: {
      description:
        'Custom styles and class names for the main input/button of the multi-select field.',
      control: 'object',
    },
    badge: {
      description:
        'Custom styles and class names for the selected option badges.',
      control: 'object',
    },
    actionButtons: {
      description:
        'Custom styles and class names for the action buttons (Clear and Close) in the dropdown.',
      control: 'object',
    },
    search: {
      description:
        'Custom styles and class names for the search input within the dropdown.',
      control: 'object',
    },
    items: {
      description:
        'Custom styles and class names for the items in the dropdown list.',
      control: 'object',
    },
    checkbox: {
      description:
        'Custom styles and class names for the checkbox elements next to each option.',
      control: 'object',
    },
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
