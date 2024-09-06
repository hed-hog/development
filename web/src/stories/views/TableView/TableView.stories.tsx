import TableView from '@/components/custom/table-view'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/TableView',
  component: TableView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof TableView>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example: Story = {
  args: {
    data: [
      { name: 'João', email: 'joao@example.com', role: 'Admin' },
      { name: 'Maria', email: 'maria@example.com', role: 'User' },
      { name: 'João', email: 'joao@example.com', role: 'Admin' },
      { name: 'Maria', email: 'maria@example.com', role: 'User' },
      { name: 'João', email: 'joao@example.com', role: 'Admin' },
      { name: 'Maria', email: 'maria@example.com', role: 'User' },
      { name: 'João', email: 'joao@example.com', role: 'Admin' },
      { name: 'Maria', email: 'maria@example.com', role: 'User' },
      { name: 'João', email: 'joao@example.com', role: 'Admin' },
      { name: 'Maria', email: 'maria@example.com', role: 'User' },
    ],
    columns: [
      { key: 'name', header: 'Nome' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Função' },
    ],
  },
}
