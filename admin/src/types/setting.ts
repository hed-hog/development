export type SettingType = {
  id: number
  slug: string
  group_id: number
  type: 'string' | 'number' | 'boolean' | 'json'
  value: string
}
