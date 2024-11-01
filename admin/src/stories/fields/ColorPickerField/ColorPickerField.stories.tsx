import { ColorPickerField } from '@/components/pickers/color-picker-field'
import { ColorPickerFieldVariant } from '@/enums/EnumColorPickerFieldVariant'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ColorPickerField> = {
  title: 'Fields/ColorPickerField',
  component: ColorPickerField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `ColorPickerField is a flexible and user-friendly color picker component designed for React applications. It allows user to select colors through an interactive interface, making it perfect for form inputs, design tools, or any application requiring color selection.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The currently selected color in HEX format.',
      control: 'text',
      type: 'string',
    },
    onChange: {
      description:
        'Function triggered when the color changes. Receives the new color value.',
      type: 'function',
    },
    variant: {
      description: 'Specifies the style of the color picker.',
      control: 'select',
      options: [ColorPickerFieldVariant.DEFAULT, ColorPickerFieldVariant.FULL],
      type: 'string',
    },
    required: {
      description: 'Whether the color picker field is required.',
      control: 'boolean',
      defaultValue: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <ColorPickerField {...args} />,
  args: {
    value: '#ff75c3',
    required: false,
    variant: ColorPickerFieldVariant.DEFAULT,
  },
}

export const Full: Story = {
  render: (args) => <ColorPickerField {...args} />,
  args: {
    value: '#ff75c3',
    required: false,
    variant: ColorPickerFieldVariant.FULL,
  },
}
