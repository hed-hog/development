import PickerPanel from '@/components/pickers/picker-panel'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Panels/Picker Panel',
  component: PickerPanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: `PickerPanel component is a versatile selection interface that allows user to pick items from a list displayed in various formats, including grid, table, and list views. It supports functionalities such as multi-selection, pagination, and custom rendering.
      <br/><br/>
      <h3>Key Features:</h3>
      <ul style={{ listStyle: 'none '}}>
        <li>**Multiple Layout Options**: Choose between grid, table, and list layouts to display and select items.</li>
        <li>**Customizable Rendering**: Render items with a custom function to control how each item appears.</li>
        <li>**Pagination Support**: Easily manage large sets of data with built-in pagination options.</li>
        <li>**Multi-Selection**: Allows user to select multiple items with visual feedback and an option to select all items.</li>
        <li>**Responsive Grid Layout**: For grid mode, adjust the number of columns based on screen size for a responsive design.</li>
        <li>**Checkbox Integration**: Integrates checkboxes for selection, allowing user to easily manage their selections.</li>
        <li>**Customizable Styling**: Adjust padding, gap, and other style options to fit your design needs.</li>
      </ul>
      Ideal for use in applications requiring dynamic item selection, such as filtering options, managing inventories, or selecting multiple entries from a dataset.
      `,
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    url: {
      control: 'text',
      description: 'The API endpoint URL used to fetch data for the panel.',
    },
    type: {
      control: 'select',
      table: {
        type: { summary: 'grid | table | list' },
        defaultValue: { summary: 'grid' },
      },
      options: ['grid', 'table', 'list'],
      description: 'Defines the layout type of the panel.',
    },
    title: {
      control: 'text',
      description: 'The title displayed at the top of the panel.',
    },
    subtitle: {
      control: 'text',
      description: 'The subtitle displayed below the title.',
    },
    caption: {
      control: 'text',
      description: 'A caption or description displayed below the content.',
    },
    sortable: {
      control: 'boolean',
      description: 'Determines if the items in the table are sortable.',
    },
    responsiveColumns: {
      control: 'object',
      description:
        'Defines the number of columns for grid layout at different screen sizes.',
    },
    paginationOptions: {
      control: 'object',
      description: 'Options for pagination, such as page size options.',
    },
    styleOptions: {
      control: 'object',
      description: 'Styling options for the panel, including padding and gap.',
    },
    columns: {
      control: 'object',
      description:
        'Defines the columns for the table layout, including headers and data keys.',
    },
    render: {
      type: 'function',
      description: 'A custom render function to display each item.',
    },
    buttons: {
      control: 'object',
      description:
        'An array of button objects to display in the panel footer, with each button having a variant, text, and onClick handler.',
      table: {
        type: { summary: '(ButtonProps & { text: string })[]' },
        defaultValue: { summary: '[]' },
      },
      defaultValue: [],
    },
  },
} satisfies Meta<typeof PickerPanel>

export default meta
type Story = StoryObj<typeof meta>

export const GridMode: Story = {
  args: {
    url: '/user',
    type: 'grid',
    responsiveColumns: { default: 1, sm: 2, md: 3, lg: 4, xl: 5 },
    styleOptions: {
      padding: 4,
      gap: 6,
    },
    paginationOptions: {
      pageSizeOptions: [10, 20, 30, 40],
    },
    render: (item: any) => (
      <div key={item.id}>
        <h3 className='text-lg font-semibold'>{item.name}</h3>
        <p>{item.email}</p>
      </div>
    ),
    buttons: [
      {
        variant: 'destructive',
        text: 'Cancel',
        onClick: () => alert('Cancel clicked'),
      },
      {
        variant: 'secondary',
        text: 'Confirm',
        onClick: () => alert('Confirm clicked'),
      },
    ],
  },
}

export const TableMode: Story = {
  args: {
    url: '/user',
    type: 'table',
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    sortable: true,
    buttons: [
      {
        variant: 'destructive',
        text: 'Cancel',
        onClick: () => alert('Cancel clicked'),
      },
      {
        variant: 'secondary',
        text: 'Confirm',
        onClick: () => alert('Confirm clicked'),
      },
    ],
  },
}

export const ListMode: Story = {
  args: {
    url: '/user',
    type: 'list',
    paginationOptions: {
      pageSizeOptions: [5, 10, 20],
    },
    styleOptions: {
      padding: 4,
      gap: 8,
    },
    render: (item: any) => (
      <div key={item.id} className='w-56'>
        <h3 className='text-lg font-semibold'>{item.name}</h3>
        <p>{item.email}</p>
      </div>
    ),
    buttons: [
      {
        variant: 'destructive',
        text: 'Cancel',
        onClick: () => alert('Cancel clicked'),
      },
      {
        variant: 'secondary',
        text: 'Confirm',
        onClick: () => alert('Confirm clicked'),
      },
    ],
  },
}
