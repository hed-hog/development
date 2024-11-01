import { PersonCustom } from '@/types/models/PersonCustom'
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
  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-between ${className}`}
    >
      <div className='my-2 flex items-center'>
        <IconStar className='text-white-500 mr-3 h-5 w-5' />
        <span className='text-white-800 text-sm font-normal'>
          {custom.name}: {custom.value} ({custom.person_custom_type?.name})
        </span>
      </div>
      {manageable && (
        <div className='flex flex-row items-center justify-center'>
          <IconPencil onClick={onClick} name='edit-custom' />
          <IconTrash onClick={onDelete} name='delete-custom' />
        </div>
      )}
    </div>
  )
}
