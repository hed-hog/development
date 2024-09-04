import { IStyleOption } from '@/types/style-options'
import React from 'react'

interface ListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  render?: (item: any, index: number) => JSX.Element
  styleOptions?: IStyleOption
  multipleSelect?: boolean
}

const ListView = ({
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
}: ListViewProps) => {
  const listItems = (data ?? []).map((item, index) => (
    <div key={index} style={{ marginBottom: `${styleOptions.gap / 6}rem` }}>
      {render(item, index)}
    </div>
  ))

  return (
    <div {...props} className={`p-${styleOptions.padding} ${className}`}>
      {listItems}
    </div>
  )
}

export default ListView
