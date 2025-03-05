import { PersonDocument } from '@/types/models/PersonDocument'
import { IconId, IconPencil, IconTrash } from '@tabler/icons-react'

type Props = {
  document: PersonDocument
  className?: string
  manageable?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export default function DocumentCard({
  document,
  className,
  manageable,
  onClick,
  onDelete,
}: Props) {
  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-between ${className}`}
    >
      <div className='my-3 flex items-center'>
        <IconId className='text-white-500 mr-3 h-5 w-5' />
        <span className='text-white-800 text-sm font-normal'>
          {document.value}
        </span>
      </div>
      {manageable && (
        <div className='flex flex-row items-center justify-center'>
          <IconPencil onClick={onClick} name='edit-document' />
          <IconTrash onClick={onDelete} name='delete-document' />
        </div>
      )}
    </div>
  )
}
