import GridView from '@/components/custom/grid-view'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/GridView',
  component: GridView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: `**GridView** is a responsive grid layout component designed to display data in a structured, column-based format. It allows for dynamic rendering of content and can be customized to change the number of columns at various breakpoints for responsive design.
        <br/> <br/>
        <h3>Key features:</h3>
        <ul>
          <li>**Responsive Grid**: Adjusts the number of columns based on screen size.</li>
          <li>**Data Customization**: Easily pass in an array of objects to display in the grid.</li>
          <li>**Styling Options**: Control padding and gap between items with \`styleOptions\.</li>
        </ul>
        `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    responsiveColumns: {
      control: 'object',
      description:
        'Defines the responsive number of columns for different breakpoints.',
      defaultValue: {
        default: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      },
      table: {
        type: { summary: 'IResponsiveColumn' },
        defaultValue: { summary: '{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }' },
      },
    },
    data: {
      control: 'object',
      description: 'An array of objects to display in the grid view.',
      table: {
        type: { summary: 'T[]' },
      },
    },
    render: {
      control: false,
      description: 'Function to render each item in the grid.',
      table: {
        type: { summary: '(item: T, index: number) => JSX.Element' },
      },
    },
    styleOptions: {
      control: 'object',
      description:
        'Styling options for the grid, including padding and gap between items.',
      defaultValue: { padding: 4, gap: 2 },
      table: {
        type: { summary: 'IStyleOption' },
        defaultValue: { summary: '{ padding: 4, gap: 2 }' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Allows for item selection in the grid.',
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
    onItemClick: {
      action: 'itemClicked',
      description: 'Callback triggered when an item is clicked.',
      table: {
        type: {
          summary: '(row: T, index: number, e: React.MouseEvent) => void',
        },
      },
    },
    onItemContextMenu: {
      action: 'contextMenuClicked',
      description: 'Callback triggered when an item is right-clicked.',
      table: {
        type: {
          summary: '(row: T, index: number, e: React.MouseEvent) => void',
        },
      },
    },
    itemClassName: {
      control: 'text',
      description: 'CSS class for styling individual grid items.',
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
} satisfies Meta<typeof GridView>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    responsiveColumns: {
      default: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    },
    data: [
      {
        id: 1,
        title: 'Technology',
        body: 'Subtitle',
      },
      {
        id: 2,
        title: 'Healthy',
        body: 'Subtitle',
      },
      {
        id: 3,
        title: 'Quantum',
        body: 'Computing',
      },
      {
        id: 4,
        title: 'Exploring',
        body: 'Cosmos',
      },
      {
        id: 5,
        title: 'Evolution',
        body: 'Social',
      },
      {
        id: 6,
        title: 'Rise',
        body: 'Work',
      },
      {
        id: 7,
        title: 'Sustainable',
        body: 'Practices',
      },
      {
        id: 8,
        title: 'Power',
        body: 'Intelligence',
      },
      {
        id: 9,
        title: 'Innovations',
        body: 'Healthcare',
      },
      {
        id: 10,
        title: 'Art',
        body: 'Mindfulness',
      },
    ],
    render: (item: any, index: number) => (
      <div key={index} className='rounded border border-gray-300 p-4'>
        <h3 className='text-lg font-semibold'>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    ),
    styleOptions: {
      padding: 4,
      gap: 2,
    },
  },
}
