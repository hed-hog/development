import { PersonContact } from '@/types/models/PersonContact'
import {
  IconAddressBook,
  IconPencil,
  IconPhone,
  IconTrash,
} from '@tabler/icons-react'

type Props = {
  contact: PersonContact
  className?: string
  manageable?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export default function ContactCard({
  contact,
  className,
  manageable = false,
  onClick,
  onDelete,
}: Props) {
  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-between ${className}`}
    >
      <div className='my-2 flex items-center'>
        {isNaN(+contact.value) ? (
          <IconAddressBook className='text-white-500 mr-3 h-5 w-5' />
        ) : (
          <IconPhone className='text-white-500 mr-3 h-5 w-5' />
        )}

        <span className='text-white-800 text-sm font-normal'>
          {contact.value}
        </span>
      </div>
      {manageable && (
        <div className='flex flex-row items-center justify-center'>
          <IconPencil onClick={onClick} name='edit-contact' />
          <IconTrash onClick={onDelete} name='delete-contact' />
        </div>
      )}
    </div>
  )
}
