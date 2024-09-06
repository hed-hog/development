import { useState } from 'react'
import {
  ColorPickerField,
  ColorPickerFieldVariant,
} from '@/components/custom/color-picker-field'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ColorPickerField> = {
  title: 'Fields/ColorPickerField',
  component: ColorPickerField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'full'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Story com estado controlado para a cor
const ColorPickerExample = ({
  variant,
}: {
  variant: ColorPickerFieldVariant
}) => {
  const [color, setColor] = useState<string>('#ff75c3')

  const handleChange = (newColor: string) => {
    setColor(newColor)
  }

  return (
    <ColorPickerField
      value={color}
      onChange={handleChange}
      variant={variant}
      required
    />
  )
}

// Story para a variante default
export const Default: Story = {
  render: () => (
    <ColorPickerExample variant={ColorPickerFieldVariant.DEFAULT} />
  ),
}

// Story para a variante full
export const Full: Story = {
  render: () => <ColorPickerExample variant={ColorPickerFieldVariant.FULL} />,
}
