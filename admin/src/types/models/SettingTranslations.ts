import { Locales } from './Locales'
import { Settings } from './Settings'

export type SettingTranslations = {
  locale_id?: number
  setting_id?: number
  description?: string
  name?: string
  created_at?: string
  updated_at?: string
  locale?: Locales
  settings?: Settings
}
