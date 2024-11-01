import { SheetPickerField } from '@/components/pickers/sheet-picker-field'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SheetPickerField> = {
  title: 'Fields/SheetPickerField',
  tags: ['autodocs'],
  component: SheetPickerField,
  argTypes: {
    options: {
      description:
        'Options for the multi-select field, represented as an array of objects with `label` and `value` properties.',
      control: 'object',
    },
    onValueChange: {
      action: 'valueChanged',
      description:
        'Callback function triggered when the selected values change. Receives the updated list of selected values.',
    },
    title: {
      control: 'text',
      description:
        'Title of the sheet, which is displayed at the top of the modal.',
    },
    subtitle: {
      control: 'text',
      description:
        'Subtitle of the sheet, displayed below the title for additional context or instructions.',
    },
    titleStyle: {
      control: 'object',
      description: 'Inline style for the title to customize its appearance.',
    },
    subtitleStyle: {
      control: 'object',
      description: 'Inline style for the subtitle to customize its appearance.',
    },
    buttonText: {
      control: 'text',
      description:
        'Text to display on the confirmation button at the bottom of the sheet.',
    },
    buttonStyle: {
      control: 'object',
      description: 'Inline style for the button to customize its appearance.',
    },
    defaultValue: {
      description:
        'Array of default selected values to initialize the multi-select field.',
    },
    required: {
      control: 'boolean',
      description:
        'Indicates if the field is required. When true, user must select at least one option before submitting.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when the input is empty.',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `SheetPickerField component provides a modal (Sheet) that allows user to select options from a list. It features a multi-select field within a modal dialog, allowing user to choose multiple options and confirm their selections. 
        <br/> <br/> 
        <h3>Key Features:</h3>
        <ul style={{ listStyle: 'none '}}>
          <li>**Multi-Select Capability**: Users can select multiple options from the list.</li>
          <li>**Search Functionality**: The search field helps in filtering options based on user input.</li>
          <li>**Customizable**: The sheet's title, subtitle, and button text can be customized.</li>
          <li>**Required Field**: Optionally mark the field as required to ensure user input.</li>
        </ul>
        Ideal for use in forms where user need to make multiple selections, such as filtering options, setting preferences, or selecting tags.
          `,
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
