import { RoleLocale } from './RoleLocale'
import { RoleMenu } from './RoleMenu'
import { RoleRoute } from './RoleRoute'
import { RoleUser } from './RoleUser'

export type Role = {
  id?: number
  slug: string
  created_at?: string
  updated_at?: string
  role_menu?: RoleMenu[]
  role_user?: RoleUser[]
  role_route?: RoleRoute[]
  role_locale?: RoleLocale[]
  role_screen?: RoleScreen[]
  name?: string
  description?: string
}
