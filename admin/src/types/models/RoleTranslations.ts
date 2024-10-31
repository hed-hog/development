import { Locales } from './Locales'
import { Roles } from './Roles'

export type RoleTranslations = {
  role_id?: number
  locale_id?: number
  name: string
  description: string
  created_at?: string
  updated_at?: string
  roles?: Roles
  locale?: Locales
}
