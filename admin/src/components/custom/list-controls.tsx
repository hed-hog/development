import React, { Dispatch, SetStateAction } from 'react'
import { Checkbox } from '../ui/checkbox'
import { SearchField } from '../search-field'
import { SelectedItems } from './select-items'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('pagination')

  return (
    <>
      <div className='m-4 flex flex-col gap-4'>
        <SearchField
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
            <span>{t('selectAll')}</span>
          </div>
        )}
      </div>

      {children}

      {Boolean(selectedItems) && selectedItems !== undefined && (
        <div className={`my-4 px-4`}>
          <SelectedItems
            selectedItems={selectedItems}
            onClick={onFilterToggle}
          />
        </div>
      )}
    </>
  )
}

export default ListControls
