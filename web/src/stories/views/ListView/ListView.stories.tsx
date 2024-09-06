import ListView from '@/components/custom/list-view'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/ListView',
  component: ListView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof ListView>

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
    ],
    styleOptions: {
      padding: 4,
      gap: 8,
    },
    render: (item: any) => (
      <div
        style={{
          width: '200px',
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <h2>{item.name}</h2>
        <p>{item.email}</p>
      </div>
    ),
  },
}
