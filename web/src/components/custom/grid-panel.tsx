import React, { useEffect, useState } from 'react'
import GridView from '@/components/custom/grid-view' // Importa o GridView
import { IResponsiveColumn } from '@/types/responsive-columns'
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { SkeletonCard } from './skeleton-card'
import { usePaginationFetch } from '@/hooks/use-pagination-fetch'
import { SearchField } from '../search-field'

interface GridPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  responsiveColumns?: IResponsiveColumn
  gap?: number
  padding?: number
  url: string
  itemsPerPage?: number[]
  selectedItems?: any[]
  render: (item: any, index: number) => JSX.Element
  maxPages?: number
}

const GridPanel = ({
  id,
  responsiveColumns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  gap = 6,
  padding = 4,
  url,
  itemsPerPage: itemsPerPageOptions = [10, 20, 30, 40],
  className,
  selectedItems = [],
  render,
  maxPages = 3,
  ...props
}: GridPanelProps) => {
  const [pages, setPages] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(itemsPerPageOptions[0])
  const [items, setItems] = useState<any[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const totalPages = Math.ceil(totalItems / pageSize)

  const { data, isLoading, refetch } = usePaginationFetch({
    url,
    page,
    pageSize,
    search,
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
    refetch()
  }, [pageSize, page, search, refetch])

  useEffect(() => {
    const buttons: number[] = []
    const start =
      page + maxPages > totalPages && totalPages > maxPages
        ? totalPages - maxPages
        : page
    const end =
      start + maxPages > totalPages ? totalPages + 1 : start + maxPages

    for (let i = start; i < end; i++) {
      if (i <= totalPages) {
        buttons.push(i)
      }
    }

    setPages(buttons)
  }, [page, totalPages])

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
      <div className='my-4'>
        <SearchField
          placeholder='Buscar...'
          value={search}
          onSearch={(value) => {
            setSearch(value)
            setPage(1)
          }}
        />
      </div>

      <GridView
        data={items}
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
          value={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number(value))}
        >
          <SelectTrigger className='w-80'>
            <SelectValue placeholder={`Itens por página: ${pageSize}`} />
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
            <PaginationItem
              className={
                page <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }
              onClick={() => page > 1 && setPage(page - 1)}
            >
              <PaginationPrevious />
            </PaginationItem>

            {page > 1 && !pages.includes(1) && (
              <PaginationItem
                className='cursor-pointer'
                onClick={() => setPage(1)}
              >
                <PaginationLink isActive={1 === page}>1</PaginationLink>
              </PaginationItem>
            )}

            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {pages.map((p) => (
              <PaginationItem
                className='cursor-pointer'
                onClick={() => setPage(p)}
              >
                <PaginationLink isActive={p === page}>{p}</PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > maxPages && (
              <>
                {totalPages - (page + maxPages) > 0 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem
                  className='cursor-pointer'
                  onClick={() => setPage(totalPages)}
                >
                  <PaginationLink isActive={totalPages === page}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem
              className={
                page >= totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }
              onClick={() => {
                page < totalPages && setPage(page + 1)
              }}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {Boolean(selectedItems.length) && (
        <div className={`px-${padding} my-4`}>
          <p
            className={`cursor-pointer text-sm ${(selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
          >
            {(selectedItems ?? []).length} itens selecionados
          </p>
        </div>
      )}
    </>
  )
}

export default GridPanel
