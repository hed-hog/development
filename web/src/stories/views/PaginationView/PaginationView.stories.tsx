import { useState } from 'react'
import { PaginationView } from '@/components/custom/pagination-view'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Views/PaginationView',
  component: PaginationView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PaginationView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
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
