import ListView from '@/components/views/list-view'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/ListView',
  component: ListView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
  The \`ListView\` component is a flexible solution for displaying data in a list format. It supports custom item rendering, multiple selection, and responsive style options. Ideal for cases where structured data needs to be presented in a list, with optional interactivity.
  
  ### Key Features:
  - **Custom Rendering**: Render each item in any desired format with full control over presentation.
  - **Multiple Selection**: Enable or disable multiple item selection with real-time callbacks.
  - **Responsive Styling**: Adjust padding, gap, and layout to fit different screen sizes or design needs.
  - **Key Extraction**: Custom function to define unique keys for each item.
  - **Selection Callbacks**: Trigger actions on item selection or deselection with full flexibility.
  `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    data: {
      control: 'object',
      description: 'An array of items to be displayed in the ListView.',
      table: {
        type: { summary: 'T[]' },
      },
    },
    render: {
      control: false,
      description: 'A function to render each item in the list.',
      table: {
        type: { summary: '(item: T, index: number) => JSX.Element' },
      },
    },
    styleOptions: {
      control: 'object',
      description:
        'Styling options for the ListView, including gap and padding.',
      defaultValue: { padding: 4, gap: 8 },
      table: {
        type: { summary: 'IStyleOption' },
        defaultValue: { summary: '{ padding: 4, gap: 8 }' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Allows for item selection in the list.',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiple: {
      control: 'boolean',
      description:
        'If true, multiple items can be selected. If false, only one item can be selected at a time.',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    selectedIds: {
      control: { summary: 'array' },
      description: 'Array of IDs of the selected items.',
      defaultValue: [],
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onSelectionChange: {
      action: 'selectionChanged',
      description: 'Callback triggered when the selected items change.',
      table: {
        type: { summary: '(selectedItems: T[]) => void' },
      },
    },
    itemClassName: {
      control: 'text',
      description: 'CSS class for styling individual list items.',
      table: {
        type: { summary: 'string' },
      },
    },
    extractKey: {
      control: false,
      description: 'Function to extract a unique key for each item.',
      table: {
        type: { summary: '(item: T) => string' },
        defaultValue: { summary: '(item) => item.id' },
      },
    },
    onSelect: {
      action: 'itemSelected',
      description: 'Callback triggered when an item is selected.',
      table: {
        type: { summary: '(row: T, index: number) => void' },
      },
    },
    onUnselect: {
      action: 'itemUnselected',
      description: 'Callback triggered when an item is unselected.',
      table: {
        type: { summary: '(row: T, index: number) => void' },
      },
    },
  },
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
