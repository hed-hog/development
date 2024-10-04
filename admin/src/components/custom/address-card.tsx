import { PersonAddress } from '@/types/address'
import { IconMapPin, IconPencil } from '@tabler/icons-react'

type Props = {
  address: PersonAddress
  className?: string
  editable?: boolean
  onClick?: () => void
}

export default function AddressCard({
  address,
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
        <IconMapPin className='text-white-500 mr-3 h-5 w-5' />
        <div className='flex flex-col'>
          <span
            className={`text-white-800 ${!editable && 'max-w-[150px]'} text-sm font-normal`}
          >
            {address.street}, {address.number}
          </span>
          <span
            className={`text-white-800 ${!editable && 'max-w-[150px]'} text-sm font-normal`}
          >
            {address.district}, {address.city}
          </span>
          <span
            className={`text-white-800 ${!editable && 'max-w-[150px]'} text-sm font-normal`}
          >
            {address.state}
          </span>
        </div>
      </div>
      {editable && <IconPencil />}
    </div>
  )
}
