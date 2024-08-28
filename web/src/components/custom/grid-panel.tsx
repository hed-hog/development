import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import GridView from '@/components/custom/grid-view' // Importa o GridView
import { IResponsiveColumn } from '@/types/responsive-columns'
import { usePagination } from '@/hooks/use-pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'
import { SkeletonCard } from './skeleton-card'

interface GridPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  responsiveColumns?: IResponsiveColumn
  gap?: number
  padding?: number
  endpoint: string
  itemsPerPage?: number[]
  render: (item: any, index: number) => JSX.Element
  totalItems: number
}

const fetchItems = async (endpoint: string, start: number, end: number) => {
  const { data } = await axios.get(endpoint, {
    params: { _start: start, _end: end },
  })
  return data
}

const GridPanel = ({
  responsiveColumns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  gap = 6,
  padding = 4,
  endpoint,
  itemsPerPage: itemsPerPageOptions = [10, 20, 30, 40],
  className,
  render,
  totalItems,
  ...props
}: GridPanelProps) => {
  const {
    endIndex: end,
    startIndex: start,
    currentPage,
    handleItemsPerPageChange,
    handlePageChange,
    itemsPerPage,
  } = usePagination()

  const [totalPages, setTotalPages] = useState<number>(
    totalItems / itemsPerPage
  )

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage))
  }, [itemsPerPage, totalItems])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['items', endpoint, start, end],
    queryFn: () => fetchItems(endpoint, start, end),
  })

  useEffect(() => {
    refetch()
  }, [currentPage, refetch])

  if (isLoading) {
    return (
      <GridView
        data={Array.from({ length: itemsPerPageOptions[0] })}
        responsiveColumns={responsiveColumns}
        gap={gap}
        padding={padding}
        render={() => <SkeletonCard />}
        itemsPerPage={itemsPerPageOptions}
        className={className}
        {...props}
      />
    )
  }

  return (
    <>
      <GridView
        data={data}
        responsiveColumns={responsiveColumns}
        gap={gap}
        padding={padding}
        render={render}
        itemsPerPage={itemsPerPageOptions}
        className={className}
        {...props}
      />

      <div className='mt-4 flex w-full items-center justify-between'>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={handleItemsPerPageChange}
        >
          <SelectTrigger className='w-80'>
            <SelectValue placeholder={`Itens por página: ${itemsPerPage}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Pagination className='mx-0 w-fit'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.max(currentPage - 1, 1))
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(index + 1)
                  }}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default GridPanel
