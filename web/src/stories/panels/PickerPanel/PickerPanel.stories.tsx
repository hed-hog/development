import PickerPanel from '@/components/custom/picker-panel'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Panels/Picker Panel',
  component: PickerPanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof PickerPanel>

export default meta
type Story = StoryObj<typeof meta>

export const GridMode: Story = {
  args: {
    url: '/users',
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
  },
}

export const TableMode: Story = {
  args: {
    url: '/users',
    type: 'table',
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    sortable: true,
  },
}

export const ListMode: Story = {
  args: {
    url: '/users',
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
  },
}
