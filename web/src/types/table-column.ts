import { ButtonProps } from '@/components/custom/button'

export interface ITableAction extends ButtonProps {
  icon: JSX.Element
  tooltip?: string
  handler: (
    item: Record<string, any>,
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

export type ITableColumn =
  | {
      key: string
      header: string
      render?: (item: Record<string, any>, index: number) => JSX.Element
    }
  | {
      actions: ITableAction[]
    }
