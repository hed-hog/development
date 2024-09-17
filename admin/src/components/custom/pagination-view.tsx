import { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react'

export type PaginationViewProps = {
  variant: 'default' | 'compact'
  maxPages?: number
  page: number
  total: number
  pageSize: number
  pageSizeOptions: number[]
  onPageChange?: (page: number) => void
  onPageSizeChange?: (value: string) => void
  padding?: number
}

export const PaginationView = ({
  maxPages = 3,
  page,
  variant = 'default',
  onPageChange,
  onPageSizeChange,
  pageSize,
  pageSizeOptions,
  total,
  padding = 4,
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
    <div
      className={`mt-4 flex w-full items-center justify-between px-${padding}`}
    >
      <Select value={pageSize.toString()} onValueChange={onPageSizeChange}>
        <SelectTrigger className='w-80'>
          <SelectValue placeholder={`Itens por página: ${pageSize}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {variant === 'default' ? (
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
                key={p}
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
      ) : (
        <>
          <span className='mx-8'>
            Página {page} de {totalPages}
          </span>
          <Pagination className='mx-0 w-fit'>
            <PaginationContent>
              <PaginationItem
                className={
                  page === 1
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer'
                }
                onClick={() => page !== 1 && handlerPageChange(1)}
              >
                <IconChevronsLeft
                  className='h-6 w-6'
                  style={{ strokeWidth: 1 }}
                />
              </PaginationItem>

              <PaginationItem
                className={
                  page <= 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }
                onClick={() => page > 1 && handlerPageChange(page - 1)}
              >
                <PaginationPrevious />
              </PaginationItem>

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

              <PaginationItem
                className={
                  page === totalPages
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer'
                }
                onClick={() =>
                  page !== totalPages && handlerPageChange(totalPages)
                }
              >
                <IconChevronsRight
                  className='h-6 w-6'
                  style={{ strokeWidth: 1 }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  )
}
