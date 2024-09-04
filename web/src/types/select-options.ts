import { Dispatch, SetStateAction } from 'react'

export interface ISelectOption {
  selectedItems?: any[]
  setIsAllSelected?: Dispatch<SetStateAction<boolean>>
  handleSelectAll?: (data: any[]) => void
  isAllSelected?: boolean
}
