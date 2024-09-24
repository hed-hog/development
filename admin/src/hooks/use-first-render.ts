import { useRef } from 'react'

function useFirstRender() {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false
    return true
  }

  return false
}

export default useFirstRender
