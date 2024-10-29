import { RoleType } from '@/types/role'
import { forwardRef } from 'react'

export type RoleEditPanelProps = {
  data: RoleType
}

export const RoleEditPanel = forwardRef(({}: RoleEditPanelProps) => {
  return <div>RoleEditPanel</div>
})
