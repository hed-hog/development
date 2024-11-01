import Tree from '@/components/views/tree-view'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Views/TreeView',
  component: Tree,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'The hierarchical data structure to be displayed in the tree.',
      table: {
        type: { summary: 'Array' },
        defaultValue: { summary: '[]' },
      },
      control: 'object',
    },
  },
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: (args) => <Tree {...args} />,
  args: {
    data: [
      {
        id: '1',
        title: 'Root Node',
        children: [
          {
            id: '2',
            title: 'Child Node 1',
          },
          {
            id: '3',
            title: 'Child Node 2',
            children: [
              {
                id: '4',
                title: 'Grandchild Node 1',
              },
            ],
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `**TreeView** displays hierarchical data in a tree structure, supporting drag-and-drop functionality and context menu for node management.
          <br/><br/>
          <h3>Key Features</h3>
          <ul>
            <li>**Hierarchical Data Display:** Handles nested data with expandable and collapsible nodes.</li>
            <li>**Drag and Drop:** Reorder nodes using drag-and-drop functionality.</li>
            <li>**Context Menu:** Add or remove nodes with a context menu that appears on right-click.</li>
            <li>**Expand/Collapse Nodes:** Toggle node visibility to expand or collapse children.</li>
          </ul>
        `,
      },
    },
  },
}
