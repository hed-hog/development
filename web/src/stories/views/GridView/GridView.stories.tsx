import GridView from '@/components/custom/grid-view'
import type { Meta, StoryObj } from '@storybook/react'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Views/GridView',
  component: GridView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof GridView>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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
