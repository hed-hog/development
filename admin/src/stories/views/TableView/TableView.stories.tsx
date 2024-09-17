import TableView from '@/components/custom/table-view'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/TableView',
  component: TableView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`TableView\` component is a versatile table for displaying data with support for sorting, selection, and custom rendering. It is designed for handling large datasets efficiently and offers various features to enhance the user experience.

### Key Features:
- **Sortable Columns**: Click on column headers to sort data in ascending or descending order.
- **Multiple Selection**: Supports selection of multiple rows with optional checkboxes.
- **Custom Rendering**: Render custom content for each row with a flexible \`render\` function.
- **Loading State**: Display skeleton loaders while data is being fetched.
- **Dynamic Actions**: Define custom actions for each row with optional tooltips.
- **Caption Support**: Add a caption to the table for additional context or information.
`,
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of objects representing the rows of the table.',
      defaultValue: [
        { name: 'João', email: 'joao@example.com', role: 'Admin' },
        { name: 'Maria', email: 'maria@example.com', role: 'User' },
      ],
    },
    columns: {
      control: 'object',
      description:
        'Array of column definitions. Each column should include a key and header.',
      defaultValue: [
        { key: 'name', header: 'Nome' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Função' },
      ],
    },
    sortable: {
      control: 'boolean',
      description: 'Enable or disable sorting functionality.',
      defaultValue: false,
    },
    isLoading: {
      control: 'boolean',
      description: 'Indicates whether data is being loaded.',
      defaultValue: false,
    },
    selectable: {
      control: 'boolean',
      description: 'Allows for item selection in the table.',
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
    extractKey: {
      type: 'function',
      description: 'Function to extract a unique key for each row.',
      defaultValue: (item: any) => (item.id ? String(item.id) : ''),
    },
    onItemDoubleClick: {
      action: 'itemDoubleClick',
      description: 'Callback for double-click events on rows.',
    },
    onItemClick: {
      action: 'itemClick',
      description: 'Callback for single-click events on rows.',
    },
    onItemContextMenu: {
      action: 'itemContextMenu',
      description: 'Callback for right-click context menu events on rows.',
    },
    onSelect: {
      action: 'select',
      description: 'Callback when a row is selected.',
    },
    onUnselect: {
      action: 'unselect',
      description: 'Callback when a row is unselected.',
    },
    caption: {
      control: 'text',
      description: 'Optional caption text for the table.',
      defaultValue: '',
    },
    render: {
      type: 'function',
      description: 'Custom render function for rows.',
    },
    onSelectionChange: {
      action: 'selectionChange',
      description: 'Callback when the selection changes.',
    },
    itemClassName: {
      control: 'text',
      description: 'Optional class name for row elements.',
    },
  },
} satisfies Meta<typeof TableView>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example: Story = {
  args: {
    data: [
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
