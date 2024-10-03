import { TimeStamp } from './timestamp'

export type PersonType = {
  id: number
  name: string
  type_id: number
  birth_at: string
} & TimeStamp
