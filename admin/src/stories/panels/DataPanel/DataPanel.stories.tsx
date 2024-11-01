import { DataPanel } from '@/components/panels/data-panel'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataPanel> = {
  title: 'Panels/Data Panel',
  component: DataPanel,
  parameters: {
    // Center the component in the Canvas
    layout: 'centered',
    docs: {
      description: {
        component: `The DataPanel component provides a versatile interface for displaying data in various formats, including grid, list, and table layouts. It supports features such as single and multiple item selection, integrated search functionality, and customizable columns. This component is ideal for applications that require dynamic and interactive data presentation.
      <br/><br/>
      <h3>Key Features:</h3>
      <ul style={{ listStyle: 'none '}}>
        <li>**Multiple Layout Options**: Choose between grid, list, and table layouts to best present your data.</li>
        <li>**Selection Modes**: Supports both single and multiple item selections to accommodate different user needs.</li>
        <li>**Search Functionality**: Includes a search feature to filter items dynamically, improving usability and data management.</li>
        <li>**Customizable Columns**: For table layouts, customize column headers and data keys to fit your data structure.</li>
        <li>**Flexible Data Source**: Fetch data from an API endpoint specified by the url prop, enabling dynamic content updates.</li>
      </ul>
      Ideal for use in applications where user need to view and interact with large sets of data, such as dashboards, admin panels, and data management tools.
      `,
      },
    },
  },
  // Automatic Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // ArgTypes configuration
  argTypes: {
    url: {
      control: 'text',
      description: 'The API endpoint URL used to fetch data for the panel.',
    },
    id: {
      control: 'text',
      description:
        'A unique identifier for the panel, used for managing state and interactions.',
    },
    selectable: {
      control: 'boolean',
      description:
        'Determines if items in the panel can be selected by the user',
    },
    multiple: {
      control: 'boolean',
      description:
        'Determines if multiple items can be selected simultaneously in the panel.',
    },
    hasSearch: {
      control: 'boolean',
      description:
        'Enables a search functionality within the panel for filtering items.',
    },
    layout: {
      control: 'select',
      options: ['grid', 'list', 'table'],
      table: {
        type: { summary: 'grid | table | list' },
        defaultValue: { summary: 'grid' },
      },
      description:
        'Defines the layout of the panel, affecting how items are displayed.',
    },
    columns: {
      control: 'object',
      description:
        'Defines the columns for the table layout, including headers and data keys.',
    },
    render: {
      type: 'function',
      description:
        'A render function that defines how each item is displayed within the panel. It takes an item and its index as arguments and returns a JSX element for rendering the item.',
    },
    menuOrders: {
      control: 'object',
      description:
        'Defines the available sorting options for the data in the panel.',
    },
    menuActions: {
      control: 'object',
      description:
        'Defines the actions available for items in the panel, such as edit, delete, etc.',
    },
    paginationOptions: {
      control: 'object',
      description:
        'Options for pagination. This includes configurations such as page size, current page, and total item count.',
    },
    selectOptions: {
      control: 'object',
      description:
        'Options for selecting items within the panel. This could include configurations for selection behavior, such as single or multiple selection.',
    },
    styleOptions: {
      control: 'object',
      description:
        'Custom style options for the panel. This can include properties like gap and padding to control the layout and appearance of items within the panel.',
    },
    itemClassName: {
      control: 'text',
      description:
        'A CSS class name that can be applied to each item in the panel for additional styling.',
    },
    extractKey: {
      type: 'function',
      description:
        'A function to extract a unique key from each item in the panel. This is used for identifying items in lists and ensuring efficient rendering.',
    },
    onSelectionChange: {
      type: 'function',
      description:
        'A callback function that is triggered when the selection of items changes. It receives an array of selected items as its argument.',
    },
    sortable: {
      control: 'boolean',
      description:
        'Determines if the items in the panel can be sorted. When true, user can interact with the panel to sort items based on various criteria.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof DataPanel>

// Default stories for the DataPanel component

export const GridSelectableUnique: Story = {
  args: {
    url: '/user',
    id: 'user',
    selectable: true,
    multiple: false,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a grid layout where user can select a single item from the list. Ideal for when only one selection is needed at a time.',
      },
    },
  },
}

export const GridSelectableMultiple: Story = {
  args: {
    url: '/user',
    id: 'user',
    selectable: true,
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a grid layout with support for selecting multiple items simultaneously. Useful for bulk actions or selections.',
      },
    },
  },
}

export const GridSearch: Story = {
  args: {
    url: '/user',
    id: 'user',
    hasSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a grid layout with an integrated search feature to filter items dynamically. Enhances usability by allowing quick searches.',
      },
    },
  },
}

export const GridWithMenuOrders: Story = {
  args: {
    id: 'data-panel-grid-menu-orders',
    url: '/user',
    hasSearch: true,
    selectable: true,
    multiple: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    menuOrders: [
      {
        label: 'Name - A to Z',
        field: 'name',
        order: 'asc',
      },
      {
        label: 'Name - Z to A',
        field: 'name',
        order: 'desc',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'This grid layout allows user to sort items by name using the menu order options.',
      },
    },
  },
}

export const GridWithMenuActions: Story = {
  args: {
    id: 'data-panel-grid-menu-actions',
    url: '/user',
    hasSearch: true,
    selectable: true,
    multiple: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    menuActions: [
      {
        icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
        label: 'Edit',
        tooltip: 'Edit selected user(s)',
        handler: () => {},
        show: 'once',
      },
      {
        icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
        label: 'Delete',
        tooltip: 'Delete selected user(s)',
        variant: 'destructive',
        handler: () => {},
        show: 'some',
      },
      {
        icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
        label: 'Create',
        tooltip: 'Create a new user',
        handler: () => {},
        show: 'none',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'This grid layout includes actions such as edit, delete, and create for managing user.',
      },
    },
  },
}

export const ListSelectableUnique: Story = {
  args: {
    layout: 'list',
    url: '/user',
    id: 'user',
    selectable: true,
    multiple: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a list layout where user can select only one item. Suitable for linear displays where single-item selection is required.',
      },
    },
  },
}

export const ListSelectableMultiple: Story = {
  args: {
    layout: 'list',
    url: '/user',
    id: 'user',
    selectable: true,
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a list layout with support for selecting multiple items. Ideal for scenarios where user need to select several items at once.',
      },
    },
  },
}

export const ListWithMenuOrders: Story = {
  args: {
    layout: 'list',
    url: '/user',
    id: 'data-panel-list-menu-orders',
    hasSearch: true,
    selectable: true,
    multiple: true,
    menuOrders: [
      {
        label: 'Name - A to Z',
        field: 'name',
        order: 'asc',
      },
      {
        label: 'Name - Z to A',
        field: 'name',
        order: 'desc',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a list layout with menu orders for sorting items by name. This layout supports searching and multiple item selections.',
      },
    },
  },
}

export const ListWithMenuActions: Story = {
  args: {
    layout: 'list',
    url: '/user',
    id: 'data-panel-list-menu-actions',
    hasSearch: true,
    selectable: true,
    multiple: true,
    menuActions: [
      {
        icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
        label: 'Edit',
        tooltip: 'Edit selected user(s)',
        handler: () => {},
        show: 'once',
      },
      {
        icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
        label: 'Delete',
        tooltip: 'Delete selected user(s)',
        variant: 'destructive',
        handler: () => {},
        show: 'some',
      },
      {
        icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
        label: 'Create',
        tooltip: 'Create a new user',
        handler: () => {},
        show: 'none',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a list layout with menu actions for managing user. Includes actions such as edit, delete, and create, with support for search and multiple item selections.',
      },
    },
  },
}

export const ListSearch: Story = {
  args: {
    layout: 'list',
    url: '/user',
    id: 'user',
    hasSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a list layout with a search bar for filtering items. Provides an efficient way to find specific items within a long list.',
      },
    },
  },
}

export const TableSelectableUnique: Story = {
  args: {
    layout: 'table',
    url: '/user',
    id: 'user',
    selectable: true,
    multiple: false,
    columns: [
      { key: 'id', header: 'ID', width: 100 },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Renders a table layout with single-item selection. Suitable for detailed data presentation where each row represents a distinct item.',
      },
    },
  },
}

export const TableSelectableMultiple: Story = {
  args: {
    layout: 'table',
    url: '/user',
    id: 'user',
    selectable: true,
    multiple: true,
    columns: [
      { key: 'id', header: 'ID', width: 100 },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a table layout allowing multiple selections. Useful for operations requiring bulk actions or multiple item manipulations.',
      },
    },
  },
}

export const TableWithMenuOrders: Story = {
  args: {
    layout: 'table',
    url: '/user',
    id: 'data-panel-table-menu-orders',
    hasSearch: true,
    selectable: true,
    multiple: true,
    columns: [
      { key: 'id', header: 'ID', width: 100 },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    menuOrders: [
      {
        label: 'Nome - A-Z',
        field: 'name',
        order: 'asc',
      },
      {
        label: 'Nome - Z-A',
        field: 'name',
        order: 'desc',
      },
      {
        label: 'Email - A-Z',
        field: 'email',
        order: 'asc',
      },
      {
        label: 'Email - Z-A',
        field: 'email',
        order: 'desc',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a table layout with menu orders for sorting items by name. This layout supports search and multiple item selections, ideal for detailed data presentation.',
      },
    },
  },
}

export const TableWithMenuActions: Story = {
  args: {
    layout: 'table',
    url: '/user',
    id: 'data-panel-table-menu-actions',
    hasSearch: true,
    selectable: true,
    multiple: true,
    columns: [
      { key: 'id', header: 'ID', width: 100 },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    menuActions: [
      {
        icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
        label: 'Edit',
        tooltip: 'Edit selected user(s)',
        handler: () => {},
        show: 'once',
      },
      {
        icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
        label: 'Delete',
        tooltip: 'Delete selected user(s)',
        variant: 'destructive',
        handler: () => {},
        show: 'some',
      },
      {
        icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
        label: 'Create',
        tooltip: 'Create a new user',
        handler: () => {},
        show: 'none',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a table layout with menu actions for managing user. Includes actions such as edit, delete, and create, along with search functionality and support for multiple selections.',
      },
    },
  },
}

export const TableSortable: Story = {
  args: {
    layout: 'table',
    url: '/user',
    id: 'data-panel-table-menu-orders',
    hasSearch: true,
    selectable: true,
    multiple: true,
    sortable: true,
    columns: [
      { key: 'id', header: 'ID', width: 100 },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a table layout with menu orders for sorting items by name. This layout supports search and multiple item selections, ideal for detailed data presentation.',
      },
    },
  },
}

export const TableSearch: Story = {
  args: {
    layout: 'table',
    url: '/user',
    id: 'user',
    hasSearch: true,
    columns: [
      { key: 'id', header: 'ID', width: 100 },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Features a table layout with a search bar to filter the data displayed. Enhances navigation and data management by allowing dynamic searches.',
      },
    },
  },
}
