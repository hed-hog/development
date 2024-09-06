import { Meta, StoryObj } from '@storybook/react'
import { SheetPickerField } from '@/components/custom/sheet-picker-field'

const meta: Meta<typeof SheetPickerField> = {
  title: 'Fields/SheetPickerField',
  tags: ['autodocs'],
  component: SheetPickerField,
  argTypes: {
    options: {
      description: 'Options for the multi-select field',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback function when the selected values change',
    },
    title: {
      control: 'text',
      description: 'Title of the sheet',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle of the sheet',
    },
    titleStyle: {
      control: 'object',
      description: 'Inline style for the title',
    },
    subtitleStyle: {
      control: 'object',
      description: 'Inline style for the subtitle',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the button',
    },
    buttonStyle: {
      control: 'object',
      description: 'Inline style for the button',
    },
    defaultValue: {
      description: 'Default selected values',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A picker field that uses a modal (Sheet) to select options. It provides a list of options with a search field and a button to confirm selections.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SheetPickerField>

// História padrão para o SheetPickerField
export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    title: 'Select Options',
    subtitle: 'Choose your preferred options',
    buttonText: 'Save changes',
    defaultValue: [],
    required: false,
  },
}
