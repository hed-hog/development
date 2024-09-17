import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DialogType, OpenDialogType } from '@/types/dialog'

export const useDialog = (
  dialogs: DialogType[],
  setDialogs: React.Dispatch<React.SetStateAction<DialogType[]>>
) => {
  const openDialog = useCallback(
    (dialog: OpenDialogType) => {
      const id = uuidv4()
      const data: DialogType = {
        id,
        open: true,
        dialog,
      }
      setDialogs([...dialogs, data])
      return id
    },
    [dialogs, setDialogs]
  )

  const closeDialog = useCallback(
    (id: string) => {
      setDialogs((prevDialogs) =>
        prevDialogs.filter((dialog) => dialog.id !== id)
      )
    },
    [setDialogs]
  )

  return { openDialog, closeDialog }
}
