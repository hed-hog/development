import React from 'react'

interface ListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number
  padding?: number
  data: any[]
  render: (item: any, index: number) => JSX.Element
}

const ListView = ({
  gap = 6,
  padding = 4,
  data = [],
  render,
  className,
  ...props
}: ListViewProps) => {
  const listItems = (data ?? []).map((item, index) => (
    <div key={index} style={{ marginBottom: `${gap / 6}rem` }}>
      {render(item, index)}
    </div>
  ))

  return (
    <div {...props} className={`p-${padding} ${className}`}>
      {listItems}
    </div>
  )
}

export default ListView
