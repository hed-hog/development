import { useGetUserRoles } from '@/features/users'
import { useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'

type Role = {
  id: string
  name: string
  role_users: UserRole[]
}

type UserRole = {
  role_id: number
  user_id: number
}

type RoleBoxProps = {
  userId: string
}

export default function RoleBox({ userId }: RoleBoxProps) {
  const { data: rolesData, isLoading } = useGetUserRoles(userId)
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

  useEffect(() => {
    console.log({ rolesData })
  }, [rolesData])

  const roles: Role[] = rolesData !== undefined ? (rolesData as any).data : []

  const handleRoleChange = (role: Role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    )
  }

  return (
    <div className='mb-4 mt-1 flex-1'>
      {isLoading ? (
        <p>Loading roles...</p>
      ) : roles.length > 0 ? (
        <ul>
          {roles &&
            roles.map((role) => (
              <li key={role.id}>
                <label>
                  <Checkbox
                    checked={
                      Boolean(role.role_users.length) ||
                      selectedRoles.includes(role)
                    }
                    onCheckedChange={() => {
                      handleRoleChange(role)
                    }}
                    className='m-2'
                  />
                  {role.name}
                </label>
              </li>
            ))}
        </ul>
      ) : (
        <p>No roles available.</p>
      )}
    </div>
  )
}
