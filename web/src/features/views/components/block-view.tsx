import { useCreateUser, useUsers } from '@/features/users'

export function BlockView() {
  const { data: users, isLoading, error } = useUsers()
  const { mutate: createUser } = useCreateUser()

  if (isLoading) return <>Carregando...</>

  if (!isLoading && error) return <>Erro</>

  return (
    <>
      <button onClick={() => createUser({ name: 'Mateus' })}>
        Criar usuário
      </button>
    </>
  )
}
