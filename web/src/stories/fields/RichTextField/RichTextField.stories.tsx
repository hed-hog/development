import { Meta, StoryObj } from '@storybook/react'
import { RichTextField } from '@/components/custom/rich-text-field'

const meta: Meta<typeof RichTextField> = {
  title: 'Fields/RichTextField',
  component: RichTextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `The RichTextField component is an advanced text editor that allows users to create and edit rich text content with formatting options such as bold, italic, strikethrough, and lists. It utilizes TipTap for rich text editing and provides a customizable toolbar for text formatting. Suitable for applications requiring rich text input such as content management systems, blogs, or any application with advanced text editing needs.`,
      },
    },
  },
  argTypes: {
    className: {
      description: 'Additional CSS classes to apply to the editor container.',
      control: 'text',
    },
    value: {
      description:
        'The initial content of the rich text editor, set as HTML string.',
      control: 'text',
    },
    onChange: {
      description:
        'Callback function triggered when the content of the editor changes. Receives the updated HTML content.',
      action: 'changed',
    },
  },
}

export default meta
type Story = StoryObj<typeof RichTextField>

// História padrão para o RichTextField
export const Default: Story = {
  render: (args) => <RichTextField {...args} />,
}
