import React, { useState, useEffect } from 'react'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { IStyleOption } from '@/types/style-options'

interface GridViewProps extends React.HTMLAttributes<HTMLDivElement> {
  responsiveColumns?: IResponsiveColumn
  data: any[]
  render?: (item: Record<number, any>, index: number) => JSX.Element
  styleOptions?: IStyleOption
  multipleSelect?: boolean
}

const GridView = ({
  responsiveColumns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
  styleOptions = {
    gap: 6,
    padding: 4,
  },
  data = [],
  render = (item: any, index: number) => (
    <div>
      {index}. {item?.name ?? item?.title ?? JSON.stringify(item)}
    </div>
  ),
  className,
  ...props
}: GridViewProps) => {
  const [gridColumns, setGridColumns] = useState<number>(
    responsiveColumns.default
  )

  const gridItems = (data ?? []).map(render)

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
      setGridColumns(1)
    }
  }

  useEffect(() => {
    updateColumnsBasedOnScreenSize()
    window.addEventListener('resize', updateColumnsBasedOnScreenSize)
    return () => {
      window.removeEventListener('resize', updateColumnsBasedOnScreenSize)
    }
  }, [responsiveColumns])

  return (
    <div {...props} className={`p-${styleOptions.padding}`}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          gap: `${styleOptions.gap / 4}rem`,
        }}
        className={className}
      >
        {gridItems}
      </div>
    </div>
  )
}

export default GridView
