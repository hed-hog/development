import { RoleMenuType } from './role-menu'

export type MenuType = {
  id: number
  name: string
  url: string
  order: number
  menu_id: number | null
  icon: string
  role_menus: RoleMenuType[]
}
