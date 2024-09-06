import { DataPanel } from '@/components/custom/data-panel'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Panels/Data Panel',
  component: DataPanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof DataPanel>

export default meta
type Story = StoryObj<typeof meta>

export const GridSelectableUnique: Story = {
  args: {
    url: '/users',
    id: 'users',
    multipleSelect: false,
  },
}

export const GridSelectableMultiple: Story = {
  args: {
    url: '/users',
    id: 'users',
    multipleSelect: true,
  },
}

export const GridSearch: Story = {
  args: {
    url: '/users',
    id: 'users',
    hasSearch: true,
  },
}

export const ListSelectableUnique: Story = {
  args: {
    layout: 'list',
    url: '/users',
    id: 'users',
    multipleSelect: false,
  },
}

export const ListSelectableMultiple: Story = {
  args: {
    layout: 'list',
    url: '/users',
    id: 'users',
    multipleSelect: true,
  },
}

export const ListSearch: Story = {
  args: {
    layout: 'list',
    url: '/users',
    id: 'users',
    hasSearch: true,
  },
}

export const TableSelectableUnique: Story = {
  args: {
    layout: 'table',
    url: '/users',
    id: 'users',
    multipleSelect: false,
    columns: [
      {
        key: 'id',
        header: 'ID',
        width: 100,
      },
      {
        key: 'name',
        header: 'Nome',
      },
      {
        key: 'email',
        header: 'Email',
      },
    ],
  },
}

export const TableSelectableMultiple: Story = {
  args: {
    layout: 'table',
    url: '/users',
    id: 'users',
    multipleSelect: true,
    columns: [
      {
        key: 'id',
        header: 'ID',
        width: 100,
      },
      {
        key: 'name',
        header: 'Nome',
      },
      {
        key: 'email',
        header: 'Email',
      },
    ],
  },
}

export const TableSearch: Story = {
  args: {
    layout: 'table',
    url: '/users',
    id: 'users',
    hasSearch: true,
    columns: [
      {
        key: 'id',
        header: 'ID',
        width: 100,
      },
      {
        key: 'name',
        header: 'Nome',
      },
      {
        key: 'email',
        header: 'Email',
      },
    ],
  },
}
