import { SettingGroupTranslations } from './SettingGroupTranslations'
import { Settings } from './Settings'

export type SettingGroups = {
  id?: number
  icon: string
  slug: string
  created_at?: string
  updated_at?: string
  setting_group_locale?: SettingGroupTranslations[]
  settings?: Settings[]
  name?: string
  description?: string
}
