import { Setting } from './Setting'
import { User } from './User'

export type SettingUser = {
  id: number
  user_id?: number
  setting_id?: number
  value?: string
  created_at?: string
  updated_at?: string
  user?: User
  setting?: Setting
}
