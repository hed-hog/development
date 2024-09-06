import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { OpenSheetType, SheetType } from '@/types/sheet'

export const useSheet = (
  sheets: SheetType[],
  setSheets: React.Dispatch<React.SetStateAction<SheetType[]>>
) => {
  const openSheet = useCallback(
    (sheet: OpenSheetType) => {
      const id = uuidv4()
      const data: SheetType = {
        id,
        open: true,
        sheet,
      }
      setSheets([...sheets, data])
      return id
    },
    [sheets, setSheets]
  )

  const closeSheet = useCallback(
    (id: string) => {
      setSheets((prevSheets) => prevSheets.filter((sheet) => sheet.id !== id))
    },
    [setSheets]
  )

  return { openSheet, closeSheet }
}
