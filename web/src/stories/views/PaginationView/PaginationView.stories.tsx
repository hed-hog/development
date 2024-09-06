import { useState } from 'react'
import { PaginationView } from '@/components/custom/pagination-view'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Views/PaginationView',
  component: PaginationView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`PaginationView\` component offers a user-friendly pagination control for navigating through large datasets. It provides options for displaying pagination in either a default or compact style, with customizable page sizes and total items.

### Key Features:
- **Default & Compact Variants**: Choose between a detailed pagination view or a more concise, compact view.
- **Customizable Page Size**: Allow users to select the number of items displayed per page.
- **Responsive Design**: Adjusts to fit various screen sizes and layouts.
- **Interactive Pagination**: Navigate through pages with easy-to-use controls.
- **Dynamic Page Handling**: Handles dynamic page numbers and adjusts to user input.
`,
      },
    },
  },
  argTypes: {
    page: {
      control: 'number',
      description: 'The current page number.',
      defaultValue: 1,
    },
    pageSize: {
      control: 'number',
      description: 'The number of items displayed per page.',
      defaultValue: 10,
    },
    total: {
      control: 'number',
      description: 'The total number of items.',
      required: true,
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'The style of the pagination component.',
      defaultValue: 'default',
    },
    maxPages: {
      control: 'number',
      description: 'The maximum number of page buttons to display.',
      defaultValue: 3,
    },
    pageSizeOptions: {
      control: { summary: 'number' },
      description: 'Options for selecting the number of items per page.',
      defaultValue: [10, 20, 30, 40],
    },
    onPageChange: {
      action: 'pageChange',
      description: 'Callback triggered when the page changes.',
    },
    onPageSizeChange: {
      action: 'pageSizeChange',
      description: 'Callback triggered when the page size changes.',
    },
    padding: {
      control: 'number',
      description: 'The padding around the pagination controls.',
      defaultValue: 4,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaginationView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <PaginationView {...args} />,
  args: {
    page: 1,
    pageSize: 10,
    total: 100,
    variant: 'default',
    maxPages: 3,
    pageSizeOptions: [10, 20, 30, 40],
  },
}

export const Compact: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page || 1)
    const [pageSize, setPageSize] = useState(args.pageSize || 10)

    const handlePageChange = (newPage: number) => {
      setPage(newPage)
    }

    const handlePageSizeChange = (newSize: string) => {
      setPageSize(Number(newSize))
    }

    return (
      <PaginationView
        {...args}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    )
  },
  args: {
    page: 1,
    pageSize: 10,
    total: 100,
    variant: 'compact',
    maxPages: 3,
    pageSizeOptions: [10, 20, 30, 40],
  },
}
