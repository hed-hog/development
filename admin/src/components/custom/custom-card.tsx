import { PersonCustom } from '@/types/custom'
import { IconPencil, IconStar, IconTrash } from '@tabler/icons-react'

type Props = {
  custom: PersonCustom
  className?: string
  manageable?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export default function CustomCard({
  custom,
  className,
  manageable,
  onClick,
  onDelete,
}: Props) {
  console.log({ custom })
  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-between ${className}`}
    >
      <div className='my-3 flex items-center'>
        <IconStar className='text-white-500 mr-3 h-5 w-5' />
        <span className='text-white-800 text-sm font-normal'>
          {custom.name}: {custom.value} ({custom.person_custom_types?.name})
        </span>
      </div>
      {manageable && (
        <div className='flex flex-row items-center justify-center'>
          <IconPencil onClick={onClick} />
          <IconTrash onClick={onDelete} />
        </div>
      )}
    </div>
  )
}
