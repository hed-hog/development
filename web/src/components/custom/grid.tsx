import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface GridProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  renderItem: (item: T) => React.ReactNode // Função para renderizar cada item
  columns?: number // Colunas para o breakpoint padrão
  columnsSm?: number // Colunas para breakpoint sm
  columnsMd?: number // Colunas para breakpoint md
  columnsLg?: number // Colunas para breakpoint lg
  columnsXl?: number // Colunas para breakpoint xl
  gap?: number
  padding?: number
  paginatedItems: any[]
  isLoading?: boolean
  isError?: boolean
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>
  itemsPerPageOptions?: number[] // Opções para itens por página
  totalItems: number // Total de itens para calcular o número de páginas
  handlePageChange: (page: number) => void
  handleItemsPerPageChange: (value: string) => void
  currentPage: number
  itemsPerPage: number
}

const Grid = <T,>({
  renderItem,
  columns = 1,
  columnsSm,
  columnsMd,
  columnsLg,
  columnsXl,
  gap = 6,
  padding = 4,
  itemsPerPageOptions = [10, 20, 30, 40],
  paginatedItems,
  isLoading,
  isError,
  refetch,
  totalItems,
  handlePageChange,
  handleItemsPerPageChange,
  currentPage,
  itemsPerPage,
  className,
  ...props
}: GridProps<T>) => {
  const [gridColumns, setGridColumns] = useState<number>(columns)

  useEffect(() => {
    refetch()
  }, [currentPage, itemsPerPage, refetch])

  // Atualiza o número de colunas com base no tamanho da tela
  const updateColumnsBasedOnScreenSize = () => {
    if (window.innerWidth >= 1280) {
      setGridColumns(columnsXl || columns)
    } else if (window.innerWidth >= 1024) {
      setGridColumns(columnsLg || columns)
    } else if (window.innerWidth >= 768) {
      setGridColumns(columnsMd || columns)
    } else if (window.innerWidth >= 640) {
      setGridColumns(columnsSm || columns)
    } else {
      setGridColumns(1) // Coluna única para telas pequenas
    }
  }

  useEffect(() => {
    updateColumnsBasedOnScreenSize()
    window.addEventListener('resize', updateColumnsBasedOnScreenSize)
    return () => {
      window.removeEventListener('resize', updateColumnsBasedOnScreenSize)
    }
  }, [columns, columnsSm, columnsMd, columnsLg, columnsXl])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading items</div>

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <div {...props} className={`p-${padding}`}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          gap: `${gap / 4}rem`,
        }}
        className={className}
      >
        {paginatedItems.map((item: T, index: number) => (
          <div key={index} className='item'>
            {renderItem(item)}
          </div>
        ))}
      </div>

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
    </div>
  )
}

export default Grid
