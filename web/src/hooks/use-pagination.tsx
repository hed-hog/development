import { useState } from 'react'

interface IPaginationHook {
  currentPage: number
  itemsPerPage: number
  startIndex: number
  endIndex: number
  handlePageChange: (page: number) => void
  handleItemsPerPageChange: (value: string) => void
}

export const usePagination = (): IPaginationHook => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset page to 1 when items per page changes
  }

  return {
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    handlePageChange,
    handleItemsPerPageChange,
  }
}
