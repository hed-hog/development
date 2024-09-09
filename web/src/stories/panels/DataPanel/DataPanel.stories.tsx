import { DataPanel } from '@/components/custom/data-panel'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

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
      Ideal for use in applications where users need to view and interact with large sets of data, such as dashboards, admin panels, and data management tools.
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
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof DataPanel>

// Default stories for the DataPanel component

export const GridSelectableUnique: Story = {
  args: {
    url: '/users',
    id: 'users',
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
          'Displays a grid layout where users can select a single item from the list. Ideal for when only one selection is needed at a time.',
      },
    },
  },
}

export const GridSelectableMultiple: Story = {
  args: {
    url: '/users',
    id: 'users',
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
    url: '/users',
    id: 'users',
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

export const ListSelectableUnique: Story = {
  args: {
    layout: 'list',
    url: '/users',
    id: 'users',
    selectable: true,
    multiple: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a list layout where users can select only one item. Suitable for linear displays where single-item selection is required.',
      },
    },
  },
}

export const ListSelectableMultiple: Story = {
  args: {
    layout: 'list',
    url: '/users',
    id: 'users',
    selectable: true,
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a list layout with support for selecting multiple items. Ideal for scenarios where users need to select several items at once.',
      },
    },
  },
}

export const ListSearch: Story = {
  args: {
    layout: 'list',
    url: '/users',
    id: 'users',
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
    url: '/users',
    id: 'users',
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
    url: '/users',
    id: 'users',
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

export const TableSearch: Story = {
  args: {
    layout: 'table',
    url: '/users',
    id: 'users',
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
