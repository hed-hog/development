import DraggableListView from '@/components/custom/draggable-list-view'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Views/DraggableListView',
  component: DraggableListView,
  parameters: {
    docs: {
      description: {
        component: `The **DraggableListView** component allows users to reorder items in a list by dragging and dropping them. It uses the **@dnd-kit/core** library for drag-and-drop functionality with smooth handling of user interactions.
        <br/><br/>
        <h3>Key Features:</h3>
        <ul style={{ listStyle: 'none '}}>
          <li>**Drag-and-Drop Functionality**: Users can easily reorder items using drag and drop.</li>
          <li>**Customizable List Items**: The content of each list item can be customized as needed.</li>
          <li>**Pointer Sensor**: Utilizes pointer sensor for dragging, with an activation constraint for more accurate drag interactions.</li>
          <li>**Vertical List Sorting Strategy**: Implements vertical list sorting, making it ideal for ordered lists.</li>
          <li>**API Integration Ready**: Updated list order can be easily persisted or sent to a backend for further processing.</li>
        </ul>
        This component is ideal for use cases where users need to prioritize or reorder items visually, such as in task management, playlist organization, or custom sorting features.`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description:
        'Array of list items to be displayed. Each item contains an `id` and `label`.',
      table: {
        type: { summary: 'Array<{ id: string, label: string }>' },
        defaultValue: { summary: '[]' },
      },
    },
  },
} satisfies Meta<typeof DraggableListView>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example: Story = {
  args: {
    data: [
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
      { id: '4', label: 'Item 4' },
      { id: '5', label: 'Item 5' },
    ],
  },
}
