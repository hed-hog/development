import { Meta, StoryObj } from '@storybook/react'
import { SearchField } from '@/components/search-field'

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
    docs: {
      description: {
        component:
          'A search field component with an input field and a search button. You can customize the placeholder text, icon, and button text.',
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
