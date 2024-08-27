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

interface IResponsiveColumn {
  default: number
  sm: number
  md: number
  lg: number
  xl: number
}

interface GridViewProps extends React.HTMLAttributes<HTMLDivElement> {
  responsiveColumns?: IResponsiveColumn
  gap?: number
  padding?: number
  data: React.ReactNode[]
  itemsPerPage?: number[]
}

const GridView = ({
  responsiveColumns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  gap = 6,
  padding = 4,
  itemsPerPage: itemsPerPageOptions = [10, 20, 30, 40],
  data,
  className,
  ...props
}: GridViewProps) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    itemsPerPageOptions[0]
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [gridColumns, setGridColumns] = useState<number>(
    responsiveColumns.default
  )
  const [totalPages, setTotalPages] = useState<number>(
    data.length / itemsPerPage
  )

  const totalItems = data.length
  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage))
  }, [itemsPerPage, totalItems])

  // Calcula os itens a serem exibidos na página atual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = data.slice(startIndex, endIndex)

  // Atualiza o número de colunas com base no tamanho da tela
  const updateColumnsBasedOnScreenSize = () => {
    if (window.innerWidth >= 1280) {
      setGridColumns(responsiveColumns.xl || responsiveColumns.default)
    } else if (window.innerWidth >= 1024) {
      setGridColumns(responsiveColumns.lg || responsiveColumns.default)
    } else if (window.innerWidth >= 768) {
      setGridColumns(responsiveColumns.md || responsiveColumns.default)
    } else if (window.innerWidth >= 640) {
      setGridColumns(responsiveColumns.sm || responsiveColumns.default)
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
  }, [responsiveColumns])

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reseta para a primeira página ao alterar o número de itens por página
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

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
        {paginatedItems}
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

export default GridView
