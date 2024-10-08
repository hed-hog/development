import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Checkbox } from '../ui/checkbox'
import { IStyleOption } from '@/types/style-options'
import { objectToString } from '@/lib/utils'
import { SelectAll } from './select-items'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'

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
  onItemDoubleClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  onItemClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
}

const ListViewInner = <T extends any>(
  {
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
    onItemDoubleClick,
    onItemClick,
    ...props
  }: ListViewProps<T>,
  ref: React.Ref<any>
) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(
        data.filter((item) => selectedItems.includes(extractKey(item)))
      )
    }
  }, [selectedItems, data, extractKey, onSelectionChange])

  const toggleSelectItem = useCallback(
    (item: T) => {
      const id = extractKey(item)
      const isSelected = selectedItems.includes(id)

      if (!isSelected && typeof onSelect === 'function') {
        onSelect(
          item,
          data.findIndex((item) => extractKey(item) === id)
        )
      } else if (isSelected && typeof onUnselect === 'function') {
        onUnselect(
          item,
          data.findIndex((item) => extractKey(item) === id)
        )
      }

      if (selectable) {
        setSelectedItems((prevSelected) =>
          isSelected
            ? prevSelected.filter((itemId) => itemId !== id)
            : [...prevSelected, id]
        )
      }
    },
    [selectedItems, selectable, extractKey, onSelect, onUnselect, data]
  )

  const selectAllItems = useCallback(() => {
    setSelectedItems((prevSelectedItems) => {
      const newSelection = new Set<string>(prevSelectedItems)

      if (newSelection.size === data.length) {
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

  const isAllSelected = React.useMemo(() => {
    return (
      data.length > 0 &&
      data.every((item) => selectedItems.includes(extractKey(item)))
    )
  }, [selectedItems, data, extractKey])

  useEffectAfterFirstUpdate(() => {
    if (multiple) {
      setSelectedItems(selectedIds)
    }
  }, [selectedIds])

  useImperativeHandle(
    ref,
    () => ({
      selectAllItems() {
        selectAllItems()
      },
      toggleSelectItem(item: T) {
        toggleSelectItem(item)
      },
      setSelectedItems(ids: string[]) {
        setSelectedItems(ids)
      },
      getSelectedItems() {
        return data.filter((item) => selectedItems.includes(extractKey(item)))
      },
    }),
    [selectAllItems, toggleSelectItem]
  )

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

      {data.map((item, index) => {
        const itemKey = extractKey(item)
        const isChecked = selectedItems.includes(itemKey)

        return (
          <div
            key={itemKey}
            className={[
              itemClassName ?? 'border-b',
              'flex flex-row items-center truncate py-2 hover:bg-muted/50',
              isChecked ? 'bg-muted/30' : '',
              selectable ? 'cursor-pointer' : '',
            ].join(' ')}
            onClick={(event) => {
              if (selectable) {
                toggleSelectItem(item)
              }
              if (typeof onItemClick === 'function') {
                onItemClick(item, index, event)
              }
            }}
            onDoubleClick={(event) => {
              if (typeof onItemDoubleClick === 'function') {
                onItemDoubleClick(item, index, event)
              }
            }}
            style={{ marginBottom: `${styleOptions.gap / 6}rem` }}
          >
            {selectable && (
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => toggleSelectItem(item)}
                className='mx-2'
              />
            )}
            {render ? render(item, index) : <div>{objectToString(item)}</div>}
          </div>
        )
      })}
    </div>
  )
}

const ListView = React.forwardRef(ListViewInner) as <T>(
  props: ListViewProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

export default ListView
