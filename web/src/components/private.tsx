import { Navigate } from 'react-router-dom'
import { useApp } from '../hooks/use-app'
import { ReactNode } from 'react'

type PrivateProps = {
  children: ReactNode
}

const Private = ({ children }: PrivateProps) => {
  const { user } = useApp()

  if (!user?.id) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export default Private
