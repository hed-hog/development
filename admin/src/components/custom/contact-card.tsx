import { PersonContact } from '@/types/contact'
import { IconPencil, IconPhone } from '@tabler/icons-react'

type Props = {
  contact: PersonContact
  className?: string
  editable?: boolean
  onClick?: () => void
}

export default function ContactCard({
  contact,
  className,
  editable = false,
  onClick,
}: Props) {
  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-between ${className}`}
      onClick={onClick}
    >
      <div className='my-3 flex items-center'>
        <IconPhone className='text-white-500 mr-3 h-5 w-5' />
        <span className='text-white-800 text-sm font-normal'>
          {contact.value} ({contact.person_contact_types.name})
        </span>
      </div>
      {editable && <IconPencil />}
    </div>
  )
}
