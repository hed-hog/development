import { PersonCustomType } from './custom-type'

export type PersonCustom = {
  id: number
  type_id: number
  name: string
  value: string
  created_at?: string
  updated_at?: string
  person_custom_types?: PersonCustomType
}
