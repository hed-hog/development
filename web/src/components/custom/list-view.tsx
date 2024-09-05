import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { v4 as uuidv4 } from 'uuid'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { IStyleOption } from '@/types/style-options'
import { SelectableItem } from '@/types/selectable-item'
import { objectToString } from '@/lib/utils'
import SelectAll from './select-all'

interface ListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  render?: (item: Record<string, any>, index: number) => JSX.Element
  styleOptions?: IStyleOption
  multipleSelect?: boolean
  onSelectionChange?: (selectedItems: Array<Record<string, any>>) => void
  itemClassName?: string
}

const ListView = ({
  styleOptions = {
    gap: 6,
    padding: 4,
  },
  data = [],
  render,
  multipleSelect,
  onSelectionChange,
  className,
  itemClassName,
  ...props
}: ListViewProps) => {
  const [_data, set_data] = useState<SelectableItem<Record<string, any>>[]>([])
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Atualiza a lista de dados com IDs únicos
  useEffect(() => {
    set_data(
      data.map((item) => ({
        id: uuidv4(),
        data: item,
      }))
    )
  }, [data])

  // Função para alternar a seleção de um item
  const toggleSelectItem = useCallback(
    (item: SelectableItem<Record<string, any>>) => {
      const isSelected = selectedItems.includes(item.id)
      const updatedSelection = multipleSelect
        ? isSelected
          ? selectedItems.filter((id) => id !== item.id)
          : [...selectedItems, item.id]
        : isSelected
          ? []
          : [item.id]

      setSelectedItems(updatedSelection)
    },
    [selectedItems, multipleSelect]
  )

  useEffectAfterFirstUpdate(() => {
    if (onSelectionChange) {
      onSelectionChange(
        _data
          .filter((item) => selectedItems.includes(item.id))
          .map((item) => item.data)
      )
    }
  }, [selectedItems])

  const selectAllItems = useCallback(() => {
    if (selectedItems.length === _data.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(_data.map((row) => row.id))
    }
  }, [_data, selectedItems])

  const listItems = _data.map((item, index) => (
    <div
      key={item.id}
      className={[
        itemClassName ?? 'border-b',
        'flex flex-row items-center truncate py-2 hover:bg-muted/50',
        selectedItems.includes(item.id) && 'bg-muted/30',
        typeof multipleSelect === 'boolean' && 'cursor-pointer',
      ].join(' ')}
      onClick={() => {
        if (typeof multipleSelect === 'boolean') {
          toggleSelectItem(item)
        }
      }}
      style={{ marginBottom: `${styleOptions.gap / 6}rem` }}
    >
      {multipleSelect !== undefined && (
        <Checkbox
          checked={selectedItems.includes(item.id)}
          onCheckedChange={() => toggleSelectItem(item)}
          className='mr-2'
        />
      )}
      {render ? (
        render(item.data, index)
      ) : (
        <div>{objectToString(item.data)}</div>
      )}
    </div>
  ))

  return (
    <div {...props} className={`p-${styleOptions.padding} ${className}`}>
      <div className='border-b'>
        {multipleSelect === true && (
          <SelectAll
            checked={selectedItems.length === _data.length}
            onChange={selectAllItems}
            label='Selecionar tudo'
          />
        )}
      </div>
      {listItems}
    </div>
  )
}

export default ListView
