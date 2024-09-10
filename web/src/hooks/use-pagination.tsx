import { useEffect, useState } from 'react'
import { usePaginationFetch } from './use-pagination-fetch'
import { IPaginationOption } from '@/types/pagination-options'
import { ISelectOption } from '@/types/select-options'

type UsePaginationProps = {
  selectOptions?: ISelectOption
  paginationOptions?: IPaginationOption
  url: string
  id: string
  orderField?: string
  orderDirection?: 'asc' | 'desc'
}

export const usePagination = ({
  id,
  url,
  selectOptions,
  paginationOptions,
  orderField,
  orderDirection,
}: UsePaginationProps) => {
  const [sortField, setSortField] = useState<string | undefined>(orderField)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    orderDirection
  )
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(
    paginationOptions?.pageSizeOptions[0] || 10
  )
  const [items, setItems] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')

  const { data, isLoading, refetch } = usePaginationFetch({
    url,
    page,
    pageSize,
    search,
    sortField,
    sortOrder,
    queryKey: id,
  })

  useEffect(() => {
    if (data) {
      setItems(data.data)
      setTotalItems(data.total)
      setPage(data.page)
      setPageSize(data.pageSize)
    }
  }, [data])

  useEffect(() => {
    if (selectOptions?.setIsAllSelected) selectOptions?.setIsAllSelected(false)
    refetch()
  }, [pageSize, page, search, sortField, sortOrder, refetch])

  return {
    page,
    setPage,
    pageSize,
    setPageSize,
    items,
    totalItems,
    isLoading,
    search,
    setSearch,
    setSortField,
    sortField,
    sortOrder,
    setSortOrder,
  }
}
