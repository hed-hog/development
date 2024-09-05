import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { IStyleOption } from '@/types/style-options'
import { v4 as uuidv4 } from 'uuid'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SelectableItem } from '@/types/selectable-item'
import { objectToString } from '@/lib/utils'
import SelectAll from './select-all'

type GridViewProps<T> = {
  responsiveColumns?: IResponsiveColumn
  data: T[]
  render?: (item: T, index: number) => JSX.Element
  styleOptions?: IStyleOption
  multipleSelect?: boolean
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
} & React.HTMLAttributes<HTMLDivElement>

const GridView = <T extends any>({
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
  multipleSelect,
  onSelectionChange,
  className,
  onItemClick,
  onItemContextMenu,
  itemClassName,
  ...props
}: GridViewProps<T>) => {
  const [gridColumns, setGridColumns] = useState<number>(
    responsiveColumns.default
  )
  const [_data, set_data] = useState<SelectableItem<T>[]>([])
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

  useEffect(() => {
    updateColumnsBasedOnScreenSize()
    window.addEventListener('resize', updateColumnsBasedOnScreenSize)
    return () => {
      window.removeEventListener('resize', updateColumnsBasedOnScreenSize)
    }
  }, [responsiveColumns])

  // Atualiza a lista de dados com IDs únicos
  useEffect(() => {
    set_data(
      data
        .map((item) => ({
          id: uuidv4(),
          data: item,
        }))
        .filter((item) => item.data !== undefined)
    )
  }, [data])

  // Função para alternar a seleção de um item
  const toggleSelectItem = useCallback(
    (item: SelectableItem<T>) => {
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

  // Atualiza a seleção completa quando o estado selectedItems muda
  useEffectAfterFirstUpdate(() => {
    if (onSelectionChange) {
      onSelectionChange(
        _data
          .filter((item) => selectedItems.includes(item.id))
          .map((item) => item.data)
      )
    }
  }, [selectedItems])

  if (!render) {
    render = (item: T) => <div>{objectToString(item)}</div>
  }

  // Renderizar os itens da grid com o Checkbox, se `multipleSelect` for boolean
  const gridItems = _data.map((item, index) => (
    <div
      key={item.id}
      style={{ marginBottom: `${styleOptions.gap / 4}rem` }}
      className={[
        itemClassName ?? 'border p-2',
        'relative min-h-10 truncate pl-10 hover:bg-muted/50',
        selectedItems.includes(item.id) && 'bg-muted/30',
        (typeof multipleSelect === 'boolean' ||
          typeof onItemClick === 'function') &&
          'cursor-pointer',
      ].join(' ')}
      onClick={(event) => {
        if (typeof multipleSelect === 'boolean') {
          toggleSelectItem(item)
        }
        if (typeof onItemClick === 'function') {
          onItemClick(item.data, index, event)
        }
      }}
    >
      {typeof multipleSelect === 'boolean' && (
        <Checkbox
          checked={selectedItems.includes(item.id)}
          className='absolute left-3 top-3'
        />
      )}
      {typeof render === 'function' ? (
        render(item.data, index)
      ) : (
        <div>{objectToString(item.data)}</div>
      )}
    </div>
  ))

  const selectAllItems = useCallback(() => {
    if (selectedItems.length === _data.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(_data.map((row) => row.id))
    }
  }, [_data, selectedItems])

  return (
    <div {...props}>
      <SelectAll
        checked={selectedItems.length === _data.length}
        onChange={selectAllItems}
        label='Selecionar tudo'
      />
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
