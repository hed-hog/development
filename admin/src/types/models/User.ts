import { DashboardUser } from './DashboardUser'
import { Multifactor } from './Multifactor'
import { PersonUser } from './PersonUser'
import { RoleUser } from './RoleUser'
import { UserActivity } from './UserActivity'

export type User = {
  id?: number
  multifactor_id?: number
  name: string
  email: string
  password: string
  code?: string
  created_at?: string
  updated_at?: string
  multifactor?: Multifactor
  role_user?: RoleUser[]
  user_activity?: UserActivity[]
  dashboard_user?: DashboardUser[]
  person_user?: PersonUser[]
}
