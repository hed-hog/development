import React, { Dispatch, SetStateAction } from 'react'
import { Checkbox } from '../ui/checkbox'
import { SearchField } from '../search-field'

interface ListControlsProps {
  data: any[]
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  isAllSelected?: boolean
  handleSelectAll?: (data: any[]) => void
  selectedItems?: any[]
  onFilterToggle?: () => void
  children: React.ReactNode
}

const ListControls: React.FC<ListControlsProps> = ({
  data,
  search,
  setSearch,
  isAllSelected,
  handleSelectAll,
  selectedItems,
  onFilterToggle,
  children,
}) => {
  return (
    <>
      <div className='m-4 flex flex-col gap-4'>
        <SearchField
          placeholder='Buscar...'
          value={search}
          onSearch={(value) => {
            setSearch(value)
          }}
        />

        {selectedItems && (
          <div className='flex items-center gap-x-2'>
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={() => handleSelectAll && handleSelectAll(data)}
            />
            <span>Selecionar tudo</span>
          </div>
        )}
      </div>

      {children}

      {Boolean(selectedItems) && (
        <div className={`my-4 px-4`}>
          <p
            className={`cursor-pointer text-sm ${(selectedItems ?? []).length ? 'text-blue-500' : 'text-white'}`}
            onClick={onFilterToggle}
          >
            {(selectedItems ?? []).length} itens selecionados
          </p>
        </div>
      )}
    </>
  )
}

export default ListControls
