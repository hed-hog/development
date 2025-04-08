import { MenuLocale } from './MenuLocale'
import { MenuScreen } from './MenuScreen'
import { RoleMenu } from './RoleMenu'

export type Menu = {
  id?: number
  menu_id?: number
  slug: string
  url?: string
  order?: number
  icon?: string
  created_at?: string
  updated_at?: string
  menu?: Menu
  other_menu?: Menu[]
  menu_locale?: MenuLocale[]
  role_menu?: RoleMenu[]
  menu_screen?: MenuScreen[]
  other_menu?: Menu[]
  menu_locale?: MenuLocale[]
  name?: string
}
