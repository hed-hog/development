export type PersonAddress = {
  id: number
  person_id?: number
  country_id: number
  primary?: boolean
  street: string
  number: number
  complement?: string
  district: string
  city: string
  state: string
  postal_code: string
  reference?: string
  type_id: number
  created_at?: string
  updated_at?: string
}
