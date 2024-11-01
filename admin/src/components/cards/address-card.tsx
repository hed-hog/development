import { PersonAddress } from '@/types/models/PersonAddress'
import { IconMapPin, IconPencil, IconTrash } from '@tabler/icons-react'

type Props = {
  address: PersonAddress
  className?: string
  manageable?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export default function AddressCard({
  address,
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
        <IconMapPin className='text-white-500 mr-3 h-5 w-5' />
        <div className='flex flex-col'>
          <span
            className={`text-white-800 ${!manageable && 'max-w-[150px]'} text-sm font-normal`}
          >
            {address.street}, {address.number}
          </span>
          <span
            className={`text-white-800 ${!manageable && 'max-w-[150px]'} text-sm font-normal`}
          >
            {address.district}, {address.city}
          </span>
          <span
            className={`text-white-800 ${!manageable && 'max-w-[150px]'} text-sm font-normal`}
          >
            {address.state}
          </span>
        </div>
      </div>
      {manageable && (
        <div className='flex flex-row items-center justify-center'>
          <IconPencil onClick={onClick} name='edit-address' />
          <IconTrash onClick={onDelete} name='delete-address' />
        </div>
      )}
    </div>
  )
}
