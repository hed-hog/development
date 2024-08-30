import React, { useEffect } from 'react'
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
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { SkeletonCard } from './skeleton-card'
import { useFetch } from '@/hooks/use-fetch'

interface GridPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  responsiveColumns?: IResponsiveColumn
  gap?: number
  padding?: number
  endpoint: string
  itemsPerPage?: number[]
  render: (item: any, index: number) => JSX.Element
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
  ...props
}: GridPanelProps) => {
  const totalItems = 100

  const {
    endIndex: end,
    startIndex: start,
    currentPage,
    itemsPerPage,
    totalPages,
    handleItemsPerPageChange,
    handlePageChange,
    renderPaginationButtons,
  } = usePagination(totalItems)

  const { data, isLoading, refetch } = useFetch(
    endpoint,
    start,
    end,
    'grid-panel'
  )

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
        render={() => <SkeletonCard key={Math.random()} />}
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

      <div
        className={`mt-4 flex w-full items-center justify-between px-${padding}`}
      >
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
            {renderPaginationButtons(totalPages)}
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
