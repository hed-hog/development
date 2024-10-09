import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Checkbox } from '../ui/checkbox'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { IStyleOption } from '@/types/style-options'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { objectToString } from '@/lib/utils'
import { SelectAll } from './select-items'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import { Skeleton } from '../ui/skeleton'

type GridViewProps<T> = {
  isLoading?: boolean
  responsiveColumns?: IResponsiveColumn
  data: T[]
  render?: (item: T, index: number) => JSX.Element
  styleOptions?: IStyleOption
  selectable?: boolean
  multiple?: boolean
  checked?: (item: any) => boolean
  onSelectionChange?: (selectedItems: T[]) => void
  onItemClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  onItemDoubleClick?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  onItemContextMenu?: (
    row: T,
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void
  itemClassName?: string
  extractKey?: (item: T) => string
  onSelect?: (row: T, index: number) => void
  onUnselect?: (row: T, index: number) => void
  selectedIds?: string[]
} & React.HTMLAttributes<HTMLDivElement>

const GridViewInner = <T extends any>(
  {
    extractKey = (item: T) => {
      try {
        return 'id' in (item as any) ? String((item as any).id) : ''
      } catch (error) {
        return uuidv4()
      }
    },
    responsiveColumns = {
      default: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    },
    styleOptions = {
      gap: 0,
      padding: 0,
    },
    data = [],
    render,
    selectable = false,
    multiple = true,
    onSelectionChange,
    className,
    onItemClick,
    onItemDoubleClick,
    checked,
    onItemContextMenu,
    itemClassName,
    onSelect,
    onUnselect,
    selectedIds = [],
    isLoading = false,
    ...props
  }: GridViewProps<T>,
  ref: React.Ref<any>
) => {
  const gridViewId = uuidv4()
  const [gridColumns, setGridColumns] = useState<number>(
    responsiveColumns.default
  )
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedIds)
  const { t } = useTranslation('select', { useSuspense: false })

  // Atualiza o número de colunas baseado na largura da tela
  const updateColumnsBasedOnScreenSize = () => {
    if (window.innerWidth >= 1280) {
      setGridColumns(responsiveColumns.xl || responsiveColumns.default)
    } else if (window.innerWidth >= 1024) {
      setGridColumns(responsiveColumns.lg || responsiveColumns.default)
    } else if (window.innerWidth >= 768) {
      setGridColumns(responsiveColumns.md || responsiveColumns.default)
    } else if (window.innerWidth >= 640) {
      setGridColumns(responsiveColumns.sm || responsiveColumns.default)
    } else {
      setGridColumns(1)
    }
  }

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

  useEffect(() => {
    updateColumnsBasedOnScreenSize()
    window.addEventListener('resize', updateColumnsBasedOnScreenSize)
    return () => {
      window.removeEventListener('resize', updateColumnsBasedOnScreenSize)
    }
  }, [responsiveColumns])

  useEffectAfterFirstUpdate(() => {
    if (multiple) {
      setSelectedItems(selectedIds)
    }
  }, [selectedIds])

  // Atualiza a seleção completa quando o estado selectedItems muda
  useEffectAfterFirstUpdate(() => {
    if (onSelectionChange) {
      onSelectionChange(
        data
          .filter((item) => selectedItems.includes(extractKey(item)))
          .map((item) => item)
      )
    }
  }, [selectedItems])

  const isAllSelected = React.useMemo(() => {
    const selectedKeys = new Set(selectedItems)
    const itemsToCheck = Array.isArray(data) ? data : []
    return itemsToCheck.every((item) => selectedKeys.has(extractKey(item)))
  }, [selectedItems, data, extractKey])

  if (!render) {
    render = (item: T) => <div>{objectToString(item)}</div>
  }

  // Renderizar os itens da grid com o Checkbox, se `multipleSelect` for boolean
  const gridItems = data.map((item, index) => (
    <div
      key={extractKey(item)}
      style={{ marginBottom: `${styleOptions.gap / 4}rem` }}
      className={[
        itemClassName ?? 'border p-2',
        'relative min-h-10 truncate hover:bg-muted/50',
        selectedItems.includes(extractKey(item)) && 'bg-muted/30',
        selectable && 'pl-10',
        (selectable || typeof onItemClick === 'function') && 'cursor-pointer',
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
    >
      {selectable && (
        <Checkbox
          checked={selectedItems.includes(extractKey(item))}
          className='absolute left-3 top-3'
        />
      )}
      {typeof render === 'function' ? (
        render(item, index)
      ) : (
        <div>{objectToString(item)}</div>
      )}
    </div>
  ))

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
    <div {...props}>
      {selectable && multiple && (
        <SelectAll
          checked={isAllSelected}
          onChange={selectAllItems}
          label={t('selectAll')}
        />
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          gap: `${styleOptions.gap / 4}rem`,
        }}
        className={className}
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={`${gridViewId}-loading-${index}`}>
                <Skeleton className='h-8 w-full' />
              </div>
            ))
          : gridItems}
      </div>
    </div>
  )
}

const GridView = React.forwardRef(GridViewInner) as <T>(
  props: GridViewProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement

export default GridView
