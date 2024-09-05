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

type DataPanelType = {
  layout?: 'table' | 'list' | 'grid'
  url: string
  id: string
  render?: (item: Record<string, any>, index: number) => JSX.Element
  paginationOptions?: IPaginationOption
  selectOptions?: ISelectOption
  styleOptions?: IStyleOption
  multipleSelect?: boolean
  hasSearch?: boolean
  onItemClick?: (
    row: Record<string, any>,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  onItemContextMenu?: (
    row: Record<string, any>,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void
  onSelectionChange?: (selectedItems: Array<Record<string, any>>) => void
} & React.HTMLAttributes<HTMLDivElement>

export type DataPanelProps = DataPanelType &
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
        columns: ITableColumn[]
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

export const DataPanel = ({
  layout = 'grid',
  url,
  id,
  hasSearch = false,
  paginationOptions = {
    pageSizeOptions: [10, 20, 30, 40],
    maxPages: 3,
  },
  selectOptions,
  styleOptions = {
    gap: 6,
    padding: 4,
  },
  render,
  columns,
  sortable = false,
  caption,
  onItemClick,
  onItemContextMenu,
  responsiveColumns,
  multipleSelect,
  onSelectionChange,
  ...props
}: DataPanelProps) => {
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
            <TableView
              columns={columns as ITableColumn[]}
              data={[]}
              sortable={sortable}
              caption={caption}
              onItemClick={onItemClick}
              isLoading={isLoading}
              {...props}
            />
          ) : (
            <TableView
              multipleSelect={multipleSelect}
              columns={columns as ITableColumn[]}
              data={items}
              sortable={sortable}
              caption={caption}
              onItemClick={onItemClick}
              onItemContextMenu={onItemContextMenu}
              isLoading={isLoading}
              onSelectionChange={onSelectionChange}
            />
          )}
        </>
      )}
      {layout === 'list' && (
        <>
          {isLoading ? (
            <ListView
              data={Array.from({
                length: paginationOptions?.pageSizeOptions[0] ?? 10,
              })}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={() => <SkeletonCard key={Math.random()} />}
              {...props}
            />
          ) : (
            <ListView
              multipleSelect={multipleSelect}
              data={items}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={render}
              onSelectionChange={onSelectionChange}
              {...props}
            />
          )}
        </>
      )}
      {layout === 'grid' && (
        <>
          {isLoading ? (
            <GridView
              data={Array.from({
                length: paginationOptions?.pageSizeOptions[0] ?? 10,
              })}
              responsiveColumns={responsiveColumns}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={() => <SkeletonCard key={Math.random()} />}
              {...props}
            />
          ) : (
            <GridView
              multipleSelect={multipleSelect}
              data={items}
              responsiveColumns={responsiveColumns}
              styleOptions={{
                gap: styleOptions.gap,
                padding: styleOptions.padding,
              }}
              render={render}
              onSelectionChange={onSelectionChange}
              {...props}
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
    </>
  )
}
