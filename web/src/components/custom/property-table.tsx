import React, { useEffect, useState } from 'react'
import TableView from '@/components/custom/table-view'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface IUser {
  id: string
  name: string
  role: 'user' | 'admin'
}

interface IPropertyTableProps {
  users: IUser[]
}

const PropertyTable: React.FC<IPropertyTableProps> = ({ users }) => {
  const roles = ['user', 'admin']
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | null>(
    null
  )
  const [rolePermissions, setRolePermissions] = useState<{
    [key: string]: string[]
  }>({
    user: ['read'],
    admin: ['read', 'write', 'delete'],
  })

  // Estado para armazenar usuários filtrados
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users)

  useEffect(() => {
    if (selectedRole) {
      // Filtrar usuários com base no papel selecionado
      setFilteredUsers(users.filter((user) => user.role === selectedRole))
    } else {
      // Exibir todos os usuários se nenhum papel estiver selecionado
      setFilteredUsers(users)
    }
  }, [selectedRole, users])

  const handleRoleSelection = (role: 'user' | 'admin') => {
    setSelectedRole(role)
  }

  const handlePermissionToggle = (permission: string) => {
    if (selectedRole) {
      setRolePermissions((prev) => ({
        ...prev,
        [selectedRole]: prev[selectedRole].includes(permission)
          ? prev[selectedRole].filter((p) => p !== permission)
          : [...prev[selectedRole], permission],
      }))
    }
  }

  const handleRoleChange = (userId: string, newRole: 'user' | 'admin') => {
    // Atualizar o papel do usuário no estado
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    )
    setFilteredUsers(updatedUsers)
  }

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h2 className='text-lg font-semibold'>Gerenciar Permissões</h2>
        <Select
          value={selectedRole || ''}
          onValueChange={(value) =>
            handleRoleSelection(value as 'user' | 'admin')
          }
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Selecione um Papel' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedRole && (
          <div className='mt-4'>
            <h3 className='text-md font-medium'>Permissões</h3>
            {['read', 'write', 'delete'].map((permission) => (
              <div key={permission} className='flex items-center space-x-2'>
                <Checkbox
                  checked={
                    rolePermissions[selectedRole]?.includes(permission) || false
                  }
                  onChange={() => handlePermissionToggle(permission)}
                />
                <span>
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='mt-4'>
        <h2 className='text-lg font-semibold'>Usuários e Cargos</h2>
        <TableView
          data={filteredUsers.map((user) => ({
            id: user.id,
            name: user.name,
            role: (
              <Select
                value={user.role}
                onValueChange={(newRole) =>
                  handleRoleChange(user.id, newRole as 'user' | 'admin')
                }
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Selecionar papel' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ),
          }))}
          columns={[
            { header: 'Usuário', key: 'name' },
            { header: 'Cargo', key: 'role' },
          ]}
        />
      </div>
    </div>
  )
}

export default PropertyTable
