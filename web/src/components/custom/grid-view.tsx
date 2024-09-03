import React, { useState, useEffect } from 'react'
import { IResponsiveColumn } from '@/types/responsive-columns'

interface GridViewProps extends React.HTMLAttributes<HTMLDivElement> {
  responsiveColumns?: IResponsiveColumn
  gap?: number
  padding?: number
  data: any[]
  render: (item: any, index: number) => JSX.Element
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
  data = [],
  render,
  className,
  ...props
}: GridViewProps) => {
  const [gridColumns, setGridColumns] = useState<number>(
    responsiveColumns.default
  )

  const gridItems = (data ?? []).map(render)

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

  // Função para filtrar os dados com base no termo de pesquisa

  useEffect(() => {
    updateColumnsBasedOnScreenSize()
    window.addEventListener('resize', updateColumnsBasedOnScreenSize)
    return () => {
      window.removeEventListener('resize', updateColumnsBasedOnScreenSize)
    }
  }, [responsiveColumns])

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
        {gridItems}
      </div>
    </div>
  )
}

export default GridView
