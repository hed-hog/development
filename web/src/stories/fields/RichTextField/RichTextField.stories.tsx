import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RichTextField } from '@/components/custom/rich-text-field'

const meta: Meta<typeof RichTextField> = {
  title: 'Fields/RichTextField',
  tags: ['autodocs'],
  component: RichTextField,
  argTypes: {
    className: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof RichTextField>

// História padrão para o RichTextField
export const Default: Story = {
  render: (args) => {
    const [content, setContent] = useState('<p>Initial content</p>')

    const handleChange = (newValue: string) => {
      setContent(newValue)
    }

    return <RichTextField {...args} value={content} onChange={handleChange} />
  },
  args: {
    className: 'p-4 border border-gray-300 rounded-md',
  },
}
