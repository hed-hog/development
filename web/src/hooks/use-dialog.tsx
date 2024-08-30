// usePickerPanel.ts
import { useState } from 'react'

interface IUseDialogReturn {
  isOpen: boolean
  open: () => void
  close: () => void
}

export function useDialog(): IUseDialogReturn {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close,
  }
}
