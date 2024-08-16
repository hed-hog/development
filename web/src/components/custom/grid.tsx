import React from 'react'

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: string
  gap?: string
  padding?: string
}

const Grid: React.FC<GridProps> = ({
  columns = '1',
  gap = '6',
  padding = '4',
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={`grid grid-cols-${columns} gap-${gap} p-${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Grid
