import { RoleMenuType } from './role-menu'
import { RoleRouteType } from './role-route'
import { RoleScreenType } from './role-screen'
import { RoleUserType } from './role-user'

export type RoleType = {
  id: number
  name: string
  description: string
  role_menus: RoleMenuType[]
  role_users: RoleUserType[]
  role_routes: RoleRouteType[]
  role_screens: RoleScreenType[]
}
