import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { IStyleOption } from '@/types/style-options'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { objectToString } from '@/lib/utils'
import { SelectAll } from './select-items'

type GridViewProps<T> = {
  responsiveColumns?: IResponsiveColumn
  data: T[]
  render?: (item: T, index: number) => JSX.Element
  styleOptions?: IStyleOption
  selectable?: boolean
  multiple?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
  onItemClick?: (
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
} & React.HTMLAttributes<HTMLDivElement>

const GridView = <T extends any>({
  extractKey = (item: T) => {
    try {
      return 'id' in (item as any) ? String((item as any).id) : ''
    } catch (e) {
      return ''
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
  onItemContextMenu,
  itemClassName,
  onSelect,
  onUnselect,
  ...props
}: GridViewProps<T>) => {
  const [gridColumns, setGridColumns] = useState<number>(
    responsiveColumns.default
  )
  const [selectedItems, setSelectedItems] = useState<string[]>([])

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

      const updateSelectedItems = (newSelectedItems: any[]) => {
        setSelectedItems(newSelectedItems)
      }

      if (selectable && multiple) {
        updateSelectedItems(
          isSelected
            ? selectedItems.filter((item) => item !== id)
            : [...selectedItems, id]
        )
      } else {
        updateSelectedItems(isSelected ? [] : [id])
      }
    },
    [selectedItems, selectable, extractKey]
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

  useEffect(() => {
    updateColumnsBasedOnScreenSize()
    window.addEventListener('resize', updateColumnsBasedOnScreenSize)
    return () => {
      window.removeEventListener('resize', updateColumnsBasedOnScreenSize)
    }
  }, [responsiveColumns])

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

  return (
    <div {...props}>
      {selectable && multiple && (
        <SelectAll
          checked={selectedItems.length === data.length}
          onChange={selectAllItems}
          label='Selecionar tudo'
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
        {gridItems}
      </div>
    </div>
  )
}

export default GridView
