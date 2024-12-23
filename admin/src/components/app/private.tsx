import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '@/hooks/use-app'

type PrivateProps = {
  children: ReactNode
}

const Private = ({ children }: PrivateProps) => {
  const { isValidSignature } = useApp()

  if (!isValidSignature) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export default Private
