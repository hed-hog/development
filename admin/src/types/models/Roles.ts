import { RoleMenus } from './RoleMenus'
import { RoleRoutes } from './RoleRoutes'
import { RoleScreens } from './RoleScreens'
import { RoleTranslations } from './RoleTranslations'
import { RoleUsers } from './RoleUsers'

export type Roles = {
  id?: number
  slug: string
  created_at?: string
  updated_at?: string
  role_screens?: RoleScreens[]
  role_users?: RoleUsers[]
  role_locale?: RoleTranslations[]
  role_routes?: RoleRoutes[]
  role_menus?: RoleMenus[]
  name?: string
  description?: string
}
