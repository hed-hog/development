import { PersonDocument } from '@/types/document'
import { IconId, IconPencil } from '@tabler/icons-react'

type Props = {
  document: PersonDocument
  className?: string
  editable?: boolean
  onClick?: () => void
}

export default function DocumentCard({
  document,
  className,
  editable,
  onClick,
}: Props) {
  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-between ${className}`}
      onClick={onClick}
    >
      <div className='my-3 flex items-center'>
        <IconId className='text-white-500 mr-3 h-5 w-5' />
        <span className='text-white-800 text-sm font-normal'>
          {document.value} ({document.person_document_types.name})
        </span>
      </div>
      {editable && <IconPencil />}
    </div>
  )
}
