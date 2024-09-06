import { IPaginationOption } from '@/types/pagination-options'
import { ISelectOption } from '@/types/select-options'
import { ITableColumn } from '@/types/table-column'
import TableView from './table-view'
import ListView from './list-view'
import GridView from './grid-view'
import { usePagination } from '@/hooks/use-pagination'
import { IStyleOption } from '@/types/style-options'
import { IResponsiveColumn } from '@/types/responsive-columns'
import { SkeletonCard } from './skeleton-card'
import { PaginationView } from './pagination-view'
import { SearchField } from '../search-field'
import { useCallback, useState } from 'react'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SelectedItems } from './select-items'
import { useApp } from '@/hooks/use-app'
import { set } from 'react-hook-form'

type DataPanelTypeBase<T> = {
  url: string
  id: string
  render?: (item: T, index: number) => JSX.Element
  paginationOptions?: IPaginationOption
  selectOptions?: ISelectOption
  styleOptions?: IStyleOption
  selectable?: boolean
  multiple?: boolean
  hasSearch?: boolean
  itemClassName?: string
  extractKey?: (item: T) => string
  onSelectionChange?: (selectedItems: Array<T>) => void
}

type DataPanelType<T> = DataPanelTypeBase<T> &
  (
    | ({
        layout?: 'table'
        onItemClick?: (
          row: T,
          index: number,
          e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => void
        onItemContextMenu?: (
          row: T,
          index: number,
          e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
        ) => void
      } & React.HTMLAttributes<HTMLTableRowElement>)
    | ({
        layout?: 'list' | 'grid'
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
      } & React.HTMLAttributes<HTMLDivElement>)
  )

export type DataPanelProps<T> = DataPanelType<T> &
  (
    | {
        layout: 'list'
        columns?: never
        sortable?: never
        caption?: never
        responsiveColumns?: never
      }
    | {
        layout: 'table'
        columns: ITableColumn<T>[]
        sortable?: boolean
        caption?: string
        responsiveColumns?: never
      }
    | {
        layout?: 'grid'
        responsiveColumns?: IResponsiveColumn
        columns?: never
        sortable?: never
        caption?: never
      }
  )

export const DataPanel = <T extends any>({
  layout = 'grid',
  extractKey = (item: T) => {
    try {
      return 'id' in (item as any) ? String((item as any).id) : ''
    } catch (e) {
      return ''
    }
  },
  url,
  id,
  hasSearch = false,
  selectable = false,
  multiple = true,
  paginationOptions = {
    pageSizeOptions: [10, 20, 30, 40],
    maxPages: 3,
  },
  selectOptions,
  styleOptions = {
    gap: 1,
    padding: 0,
  },
  render,
  columns,
  sortable = false,
  caption,
  onItemClick,
  onItemContextMenu,
  responsiveColumns,
  itemClassName,
  onSelectionChange,
  ...props
}: DataPanelProps<T>) => {
  const {
    isLoading,
    items,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    totalItems,
  } = usePagination({
    url,
    id,
    paginationOptions,
    selectOptions,
  })

  const { openDialog, closeDialog } = useApp()

  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const handleSelect = useCallback((item: T, _index: number) => {
    setSelectedItems((value) => [...value, item])
  }, [])

  const handleUnselect = useCallback(
    (item: T, _index: number) => {
      setSelectedItems((value) =>
        value.filter((v) => extractKey(v) !== extractKey(item))
      )
    },
    [extractKey]
  )

  const getSelectedItemsPanelProps = useCallback(() => {
    switch (layout) {
      case 'table':
        return {
          columns: columns as ITableColumn<T>[],
          data: selectedItems,
          sortable,
          caption,
          isLoading,
          itemClassName,
          extractKey,
          render,
          selectable,
          multiple,
          selectedIds: selectedItems.map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            console.log('onSelectionChange', items)
            setSelectedItems(items)
          },
          ...(props as any),
        }
      case 'list':
        return {
          itemClassName,
          data: selectedItems,
          styleOptions,
          render,
          selectable,
          multiple,
          selectedIds: selectedItems.map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            console.log('onSelectionChange', items)
            setSelectedItems(items)
          },
          ...(props as any),
        }
      case 'grid':
        return {
          itemClassName,
          data: selectedItems,
          responsiveColumns,
          styleOptions,
          render,
          selectable,
          multiple,
          selectedIds: selectedItems.map((item) => extractKey(item)),
          onSelectionChange: (items: T[]) => {
            console.log('onSelectionChange', items)
            setSelectedItems(items)
          },
          ...(props as any),
        }
    }
  }, [selectedItems])

  const getSelectedItemsPanel = useCallback(() => {
    switch (layout) {
      case 'table':
        return TableView<T>
      case 'list':
        return ListView<T>
      case 'grid':
        return GridView<T>
    }
  }, [selectedItems, layout])

  const showSelectedItems = useCallback(() => {
    const id = openDialog({
      children: getSelectedItemsPanel(),
      props: getSelectedItemsPanelProps(),
      buttons: [
        {
          variant: 'secondary',
          text: 'Cancelar',
          onClick: () => {
            setSelectedItems(selectedItems)
            closeDialog(id)
          },
        },
        {
          text: 'Aplicar',
          onClick: () => {
            closeDialog(id)
          },
        },
      ],
      title: 'Itens selecionados',
      description: 'Confira ou remova os itens selecionados',
    })
  }, [selectedItems, getSelectedItemsPanel])

  useEffectAfterFirstUpdate(() => {
    console.log('selectedItems', selectedItems)
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(selectedItems)
    }
  }, [selectedItems])

  return (
    <>
      {hasSearch && (
        <div className='my-4 flex flex-col gap-4'>
          <SearchField
            placeholder='Buscar...'
            value={search}
            onSearch={(value) => {
              setSearch(value)
            }}
          />
        </div>
      )}

      {layout === 'table' && (
        <>
          {isLoading ? (
            <TableView<T>
              columns={columns as ITableColumn<T>[]}
              data={[]}
              sortable={sortable}
              caption={caption}
              isLoading={isLoading}
              itemClassName={itemClassName}
              extractKey={extractKey}
              {...(props as any)}
            />
          ) : (
            <TableView<T>
              itemClassName={itemClassName}
              selectable={selectable}
              multiple={multiple}
              columns={columns as ITableColumn<T>[]}
              data={items}
              sortable={sortable}
              caption={caption}
              onItemClick={onItemClick}
              onItemContextMenu={onItemContextMenu}
              isLoading={isLoading}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              extractKey={extractKey}
              selectedIds={selectedItems.map((item) => extractKey(item))}
            />
          )}
        </>
      )}
      {layout === 'list' && (
        <>
          {isLoading ? (
            <ListView<T>
              itemClassName={itemClassName}
              data={Array.from({
                length: paginationOptions?.pageSizeOptions[0] ?? 10,
              })}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={() => <SkeletonCard key={Math.random()} />}
              {...(props as any)}
            />
          ) : (
            <ListView<T>
              itemClassName={itemClassName}
              selectable={selectable}
              multiple={multiple}
              data={items}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={render}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              selectedIds={selectedItems.map((item) => extractKey(item))}
              {...(props as any)}
            />
          )}
        </>
      )}
      {layout === 'grid' && (
        <>
          {isLoading ? (
            <GridView<T>
              itemClassName={itemClassName}
              data={Array.from({
                length: paginationOptions?.pageSizeOptions[0] ?? 10,
              })}
              responsiveColumns={responsiveColumns}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={() => <SkeletonCard key={Math.random()} />}
              selectedIds={selectedItems.map((item) => extractKey(item))}
              {...(props as any)}
            />
          ) : (
            <GridView<T>
              itemClassName={itemClassName}
              selectable={selectable}
              multiple={multiple}
              data={items}
              responsiveColumns={responsiveColumns}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={render}
              onSelect={handleSelect}
              onUnselect={handleUnselect}
              {...(props as any)}
            />
          )}
        </>
      )}

      <PaginationView
        page={page}
        pageSize={pageSize}
        total={totalItems}
        variant='default'
        maxPages={paginationOptions?.maxPages}
        onPageChange={(page) => setPage(page)}
        pageSizeOptions={paginationOptions?.pageSizeOptions}
        onPageSizeChange={(value) => {
          setPageSize(Number(value))
          setPage(1)
        }}
        padding={0}
      />

      {selectable && multiple && (
        <SelectedItems
          selectedItems={selectedItems}
          onClick={() => showSelectedItems()}
        />
      )}
    </>
  )
}
