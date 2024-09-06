import { Meta, StoryObj } from '@storybook/react'
import Field from '@/components/custom/field'
import { EnumFieldType } from '@/enums/EnumFieldType'

const meta: Meta<typeof Field> = {
  title: 'Fields/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `The Field component is a versatile form field that supports various input types including text, color, file, password, and more. Below are examples of each type and how to configure them.
        <br/><br/>
        <h3>Key Features</h3>
        <ul>
            <li>**Versatility**: Supports multiple field types including text, password, color, file, and more.</li>
            <li>**Customizable**: Each field type can be customized with specific options and behaviors.</li>
            <li>**State Management**: Handles state internally, with support for value changes and validation.</li>
            <li>**User Interaction**: Includes various input controls such as text input, radio buttons, checkboxes, sliders, and file uploads.</li>
            <li>**Accessibility**: Designed with accessibility in mind to ensure it meets usability standards for all users.</li>
        </ul>`,
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: Object.values(EnumFieldType),
      },
      description: 'The type of the field',
    },
    value: {
      control: 'text',
      description: 'The value of the field',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function to handle value changes',
    },
    options: {
      control: 'object',
      description: 'Options for select, radio group, and checkbox fields',
    },
    sliderOptions: {
      control: 'object',
      description: 'Configuration options for slider field',
    },
    label: {
      control: 'object',
      description: 'Label for select, date picker, and sheet picker fields',
    },
    required: {
      control: 'boolean',
      description: 'Indicates if the field is required',
    },
  },
}

export default meta

type Story = StoryObj<typeof Field>

export const TextInput: Story = {
  args: {
    type: EnumFieldType.TEXT,
    value: 'Sample Text',
  },
}

export const RichText: Story = {
  args: {
    type: EnumFieldType.RICHTEXT,
    value: 'Rich Text Content heheheh',
    onChange: (value: string) => console.log(value),
  },
}

export const ColorPicker: Story = {
  args: {
    type: EnumFieldType.COLOR,
    value: '#FF5733',
    onChange: (value: string) => console.log(value),
    required: true,
  },
}

export const FileInput: Story = {
  args: {
    type: EnumFieldType.FILE,
    value: '',
  },
}

export const PasswordInput: Story = {
  args: {
    type: EnumFieldType.PASSWORD,
    value: 'password123',
  },
}

export const RadioGroup: Story = {
  args: {
    type: EnumFieldType.RADIO,
    value: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
}

export const CheckboxGroup: Story = {
  args: {
    type: EnumFieldType.CHECKBOX,
    value: 'option1' as string[] & string,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
}

export const Slider: Story = {
  args: {
    type: EnumFieldType.RANGE,
    value: [30] as never,
    sliderOptions: {
      defaultValue: [30],
      max: 100,
      step: 1,
    },
  },
}

export const Select: Story = {
  args: {
    type: EnumFieldType.SELECT,
    value: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    label: { text: 'Select an Option' },
  },
}

export const MultiSelect: Story = {
  args: {
    type: EnumFieldType.MULTISELECT,
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
}

export const DatePicker: Story = {
  args: {
    type: EnumFieldType.DATEPICKER,
    value: '2024-09-06',
    label: { text: 'Pick a Date' },
  },
}

export const SheetPicker: Story = {
  args: {
    type: EnumFieldType.SHEETPICKER,
    value: ['sheet1'] as string[] & string,
    options: [
      { value: 'sheet1', label: 'Sheet 1' },
      { value: 'sheet2', label: 'Sheet 2' },
    ],
    label: { text: 'Select a Sheet' },
  },
}
