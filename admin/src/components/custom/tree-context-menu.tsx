interface ITreeContextMenuProps {
  onClick: () => void
  title: string
  icon: JSX.Element
}

export default function TreeContextMenu({
  onClick,
  title,
  icon,
}: ITreeContextMenuProps) {
  return (
    <div
      className='relative flex w-32 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      onClick={onClick}
    >
      <span>{title}</span>
      {icon}
    </div>
  )
}
