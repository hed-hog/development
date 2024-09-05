import React, { useCallback, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { IStyleOption } from '@/types/style-options'
import { objectToString } from '@/lib/utils'
import SelectAll from './select-all'

type ListViewProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  data: T[]
  render?: (item: T, index: number) => JSX.Element
  styleOptions?: IStyleOption
  multipleSelect?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
  itemClassName?: string
  extractKey?: (item: T) => string
  onSelect?: (row: T, index: number) => void
  onUnselect?: (row: T, index: number) => void
}

const ListView = <T extends any>({
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
  onSelect,
  onUnselect,
  extractKey = (item: T) => {
    try {
      return 'id' in (item as any) ? String((item as any).id) : ''
    } catch (e) {
      return ''
    }
  },
  ...props
}: ListViewProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffectAfterFirstUpdate(() => {
    if (onSelectionChange) {
      onSelectionChange(
        data
          .filter((item) => selectedItems.includes(extractKey(item)))
          .map((item) => item)
      )
    }
  }, [selectedItems])

  const toggleSelectItem = useCallback(
    (item: T) => {
      const id = extractKey(item)
      const isSelected = selectedItems.includes(id)

      if (typeof onSelect === 'function' && !isSelected) {
        onSelect(
          item,
          data.findIndex((item) => extractKey(item) === id)
        )
      } else if (typeof onUnselect === 'function' && isSelected) {
        onUnselect(
          item,
          data.findIndex((item) => extractKey(item) === id)
        )
      }

      const updateSelectedItems = (newSelectedItems: any[]) => {
        setSelectedItems(newSelectedItems)
      }

      if (multipleSelect) {
        updateSelectedItems(
          isSelected
            ? selectedItems.filter((item) => item !== id)
            : [...selectedItems, id]
        )
      } else {
        updateSelectedItems(isSelected ? [] : [id])
      }
    },
    [selectedItems, multipleSelect, extractKey]
  )

  const selectAllItems = useCallback(() => {
    if (selectedItems.length === data.length) {
      if (typeof onUnselect === 'function') {
        for (const id of selectedItems) {
          const item = data.find((i) => extractKey(i) === id)
          if (item) {
            onUnselect(
              item,
              data.findIndex((i) => extractKey(i) === id)
            )
          }
        }
      }

      setSelectedItems([])
    } else {
      if (typeof onSelect === 'function') {
        for (const item of data) {
          onSelect(
            item,
            data.findIndex((i) => extractKey(i) === extractKey(item))
          )
        }
      }

      setSelectedItems(data.map((i) => extractKey(i)))
    }
  }, [data, selectedItems, extractKey])

  const listItems = data.map((item, index) => (
    <div
      key={extractKey(item)}
      className={[
        itemClassName ?? 'border-b',
        'flex flex-row items-center truncate py-2 hover:bg-muted/50',
        selectedItems.includes(extractKey(item)) && 'bg-muted/30',
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
          checked={selectedItems.includes(extractKey(item))}
          onCheckedChange={() => toggleSelectItem(item)}
          className='mr-2'
        />
      )}
      {render ? render(item, index) : <div>{objectToString(item)}</div>}
    </div>
  ))

  return (
    <div {...props} className={`p-${styleOptions.padding} ${className}`}>
      <div className='border-b'>
        {multipleSelect === true && (
          <SelectAll
            checked={selectedItems.length === data.length}
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
