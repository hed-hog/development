import React, { useCallback, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { IStyleOption } from '@/types/style-options'
import { objectToString } from '@/lib/utils'
import { SelectAll } from './select-items'

type ListViewProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  data: T[]
  render?: (item: T, index: number) => JSX.Element
  styleOptions?: IStyleOption
  selectable?: boolean
  multiple?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
  itemClassName?: string
  extractKey?: (item: T) => string
  onSelect?: (row: T, index: number) => void
  onUnselect?: (row: T, index: number) => void
  selectedIds?: string[]
}

const ListView = <T extends any>({
  styleOptions = {
    gap: 6,
    padding: 4,
  },
  data = [],
  render,
  selectable = false,
  multiple = true,
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
  selectedIds = [],
  ...props
}: ListViewProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedIds)

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

      if (selectable) {
        if (multiple) {
          setSelectedItems(
            isSelected
              ? selectedItems.filter((item) => item !== id)
              : [...selectedItems, id]
          )
        } else {
          setSelectedItems(isSelected ? [] : [id])
        }
      }
    },
    [selectedItems, selectable, extractKey]
  )

  const selectAllItems = useCallback(() => {
    setSelectedItems((prevSelectedItems) => {
      const newSelection = new Set<string>(prevSelectedItems)

      if (newSelection.size === data.length) {
        // If all items are already selected, unselect all
        if (typeof onUnselect === 'function') {
          for (const id of newSelection) {
            const item = data.find((i) => extractKey(i) === id)
            if (item) {
              onUnselect(
                item,
                data.findIndex((i) => extractKey(i) === id)
              )
            }
          }
        }
        return []
      } else {
        // Select all items
        if (typeof onSelect === 'function') {
          for (const item of data) {
            const id = extractKey(item)
            if (!newSelection.has(id)) {
              onSelect(
                item,
                data.findIndex((i) => extractKey(i) === id)
              )
            }
            newSelection.add(id)
          }
        }
        return Array.from(newSelection)
      }
    })
  }, [data, extractKey, onSelect, onUnselect])

  useEffectAfterFirstUpdate(() => {
    if (multiple) {
      setSelectedItems(selectedIds)
    }
  }, [selectedIds])

  const isAllSelected = React.useMemo(() => {
    const selectedKeys = new Set(selectedItems)
    return data.every((item) => selectedKeys.has(extractKey(item)))
  }, [selectedItems, data, extractKey])

  const listItems = data.map((item, index) => (
    <div
      key={extractKey(item)}
      className={[
        itemClassName ?? 'border-b',
        'flex flex-row items-center truncate py-2 hover:bg-muted/50',
        selectedItems.includes(extractKey(item)) && 'bg-muted/30',
        selectable && 'cursor-pointer',
      ].join(' ')}
      onClick={() => {
        if (selectable) {
          toggleSelectItem(item)
        }
      }}
      style={{ marginBottom: `${styleOptions.gap / 6}rem` }}
    >
      {selectable && (
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
        {selectable && multiple && (
          <SelectAll
            checked={isAllSelected}
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
