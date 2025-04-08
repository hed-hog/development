import { MenuScreen } from './MenuScreen'
import { RoleScreen } from './RoleScreen'
import { RouteScreen } from './RouteScreen'
import { ScreenLocale } from './ScreenLocale'

export type Screen = {
  id?: number
  slug: string
  icon?: string
  created_at?: string
  updated_at?: string
  menu_screen?: MenuScreen[]
  route_screen?: RouteScreen[]
  screen_locale?: ScreenLocale[]
  role_screen?: RoleScreen[]
  name?: string
  description?: string
}
