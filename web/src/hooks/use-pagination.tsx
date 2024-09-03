import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { useEffect, useState } from 'react'

type PaginationProps = {
  page: number
  pageSize: number
  total: number
}

type IPaginationHook = {
  totalPages: number
  handlePageChange: (page: number) => void
  handlePageSizeChange: (value: string) => void
  renderPaginationButtons: (totalPages: number) => JSX.Element[]
} & PaginationProps

export const usePagination = (props: PaginationProps): IPaginationHook => {
  const [page, setPage] = useState<number>(props.page)
  const [pageSize, setPageSize] = useState<number>(props.pageSize)

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setPage(1) // Reset page to 1 when items per page changes
  }

  const [totalPages, setTotalPages] = useState<number>(props.total / pageSize)

  useEffect(() => {
    setTotalPages(Math.ceil(props.total / pageSize))
  }, [pageSize, props.total])

  const MAX_BUTTONS = 3

  const renderPaginationButtons = () => {
    const buttons = []
    let startPage = Math.max(page - Math.floor(MAX_BUTTONS / 2), 1)
    let endPage = Math.min(startPage + MAX_BUTTONS - 1, totalPages)

    if (endPage - startPage < MAX_BUTTONS - 1) {
      startPage = Math.max(endPage - MAX_BUTTONS + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(i)
            }}
            isActive={page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      buttons.push(
        <PaginationItem key='next'>
          <PaginationEllipsis />
        </PaginationItem>
      )
    }

    return buttons
  }

  return {
    ...props,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
    renderPaginationButtons,
  }
}
