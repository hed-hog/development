import { Locales } from './Locales'
import { SettingGroups } from './SettingGroups'

export type SettingGroupTranslations = {
  locale_id?: number
  group_id?: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
  locale?: Locales
  setting_groups?: SettingGroups
}
