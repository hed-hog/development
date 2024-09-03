import { PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { useEffect, useMemo, useState } from 'react'

interface IPaginationHook {
  currentPage: number
  itemsPerPage: number
  startIndex: number
  endIndex: number
  totalPages: number
  handlePageChange: (page: number) => void
  handleItemsPerPageChange: (value: string) => void
  renderPaginationButtons: (totalPages: number) => JSX.Element[]
}

export const usePagination = (totalItems: number): IPaginationHook => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  )
  const endIndex = useMemo(
    () => startIndex + itemsPerPage,
    [startIndex, itemsPerPage]
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset page to 1 when items per page changes
  }

  const [totalPages, setTotalPages] = useState<number>(
    totalItems / itemsPerPage
  )

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage))
  }, [itemsPerPage, totalItems])

  const MAX_BUTTONS = 10

  const renderPaginationButtons = () => {
    const buttons = []
    let startPage = Math.max(currentPage - Math.floor(MAX_BUTTONS / 2), 1)
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
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return buttons
  }

  return {
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    renderPaginationButtons,
  }
}
