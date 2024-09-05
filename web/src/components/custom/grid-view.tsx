import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { IStyleOption } from '@/types/style-options'
import { v4 as uuidv4 } from 'uuid'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SelectableItem } from '@/types/selectable-item'
import { objectToString } from '@/lib/utils'

type GridViewProps<T> = {
  responsiveColumns?: IResponsiveColumn
  data: T[]
  render?: (item: T, index: number) => JSX.Element
  styleOptions?: IStyleOption
  multipleSelect?: boolean
  onSelectionChange?: (selectedItems: T[]) => void
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
    gap: 6,
    padding: 4,
  },
  data = [],
  render,
  multipleSelect,
  onSelectionChange,
  className,
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

  // Renderizar os itens da grid com o Checkbox, se `multipleSelect` for boolean
  const gridItems = _data.map((item, index) => (
    <div
      key={item.id}
      style={{ marginBottom: `${styleOptions.gap / 4}rem` }}
      className='relative'
    >
      {typeof multipleSelect === 'boolean' && (
        <Checkbox
          checked={selectedItems.includes(item.id)}
          onCheckedChange={() => toggleSelectItem(item)}
          className='absolute left-2 top-2'
        />
      )}
      {typeof render === 'function' ? (
        render(item.data, index)
      ) : (
        <div>{objectToString(item.data)}</div>
      )}
    </div>
  ))

  return (
    <div {...props} className={`p-${styleOptions.padding}`}>
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
