import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

export type PaginationViewProps = {
  variant: 'default' | 'compact'
  maxPages?: number
  page: number
  total: number
  pageSize: number
  onPageChange?: (page: number) => void
}

export const PaginationView = ({
  maxPages = 3,
  page,
  variant,
  onPageChange,
  pageSize,
  total,
}: PaginationViewProps) => {
  const [pages, setPages] = useState<number[]>([])
  const totalPages = Math.ceil(total / pageSize)

  const handlerPageChange = (page: number) => {
    if (typeof onPageChange === 'function') {
      onPageChange(page)
    }
  }

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

  return (
    <Pagination className='mx-0 w-fit'>
      <PaginationContent>
        <PaginationItem
          className={
            page <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }
          onClick={() => page > 1 && handlerPageChange(page - 1)}
        >
          <PaginationPrevious />
        </PaginationItem>

        {page > 1 && !pages.includes(1) && (
          <PaginationItem
            className='cursor-pointer'
            onClick={() => handlerPageChange(1)}
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
            onClick={() => handlerPageChange(p)}
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
              onClick={() => handlerPageChange(totalPages)}
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
            page < totalPages && handlerPageChange(page + 1)
          }}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
