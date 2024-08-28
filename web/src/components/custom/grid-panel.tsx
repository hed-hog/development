import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import GridView from '@/components/custom/grid-view' // Importa o GridView
import { IResponsiveColumn } from '@/types/responsive-columns'

interface GridPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  responsiveColumns?: IResponsiveColumn
  gap?: number
  padding?: number
  endpoint: string
  itemsPerPage?: number[]
  render: (item: any, index: number) => JSX.Element
}

const fetchItems = async (endpoint: string) => {
  const { data } = await axios.get(endpoint)
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
  ...props
}: GridPanelProps) => {
  const { data } = useQuery({
    queryKey: ['items', endpoint],
    queryFn: () => fetchItems(endpoint),
    staleTime: 5000,
  })

  return (
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
  )
}

export default GridPanel
