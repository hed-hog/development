import { Locales } from './Locales'
import { Menus } from './Menus'

export type MenuTranslations = {
  menu_id?: number
  locale_id?: number
  name: string
  created_at?: string
  updated_at?: string
  menus?: Menus
  locale?: Locales
}
