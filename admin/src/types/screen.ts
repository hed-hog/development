import { MenuScreenType } from './menu-screen'
import { RoleScreenType } from './role-screen'
import { RouteScreenType } from './route-screen'

export type ScreenType = {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  menu_screens: MenuScreenType[]
  role_screens: RoleScreenType[]
  route_screens: RouteScreenType[]
}
