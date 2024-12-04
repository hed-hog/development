import { ButtonProps } from '@/components/ui/button'

export type ITableAction<T> = ButtonProps & {
  icon: JSX.Element
  tooltip?: string
  handler: (
    item: T,
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

export type ITableColumn<T> =
  | {
      key: string
      header: string
      isLocale: boolean
      render?: (item: T, index: number) => JSX.Element
      width?: string | number
    }
  | {
      actions: ITableAction<T>[]
    }
