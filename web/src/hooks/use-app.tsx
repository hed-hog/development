import { AppContext } from '@/lib/app-provider'
import { useContext } from 'react'

export const useApp = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }

  return context
}
