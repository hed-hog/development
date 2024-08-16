import { useCreateUser, useUsers } from '@/features/users'

export function BlockView() {
  const { data: users, isLoading, error } = useUsers()
  const { mutate: createUser } = useCreateUser()

  console.log(users)

  if (isLoading) return <>Carregando...</>

  if (!isLoading && error) return <>Erro</>

  return (
    <>
      {users[0].name}
      <button onClick={() => createUser({ name: 'Mateus' })}>
        Criar usuário
      </button>
    </>
  )
}
