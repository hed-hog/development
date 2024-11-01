import { SearchField } from '@/components/fields/search-field'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SearchField> = {
  title: 'Fields/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the search input field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    icon: {
      description: 'Custom icon to display in the search field',
      type: 'function',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the search button',
    },
    onSearch: {
      action: 'searched',
      description: 'Callback function when search is performed',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The SearchField component features an input field with an optional custom icon and a button. It provides user with an intuitive interface for entering search queries and executing searches. Ideal for use in applications that require user-driven searches, including dashboards, setting, and content management systems.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchField>

// História padrão para o SearchField
export const Default: Story = {
  args: {
    placeholder: 'Buscar...',
    buttonText: 'Buscar',
  },
}
