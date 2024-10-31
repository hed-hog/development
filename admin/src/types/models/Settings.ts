import { SettingGroups } from './SettingGroups'
import { SettingsTypeEnum } from './SettingsTypeEnum'
import { SettingTranslations } from './SettingTranslations'
import { SettingUsers } from './SettingUsers'

export type Settings = {
  id?: number
  group_id: number
  slug: string
  type?: SettingsTypeEnum
  value?: string
  user_override?: boolean
  created_at?: string
  updated_at?: string
  setting_groups?: SettingGroups
  setting_users?: SettingUsers[]
  setting_locale?: SettingTranslations[]
  description?: string
  name?: string
}
