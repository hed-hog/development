import { useEffect, useRef } from 'react'

function useEffectAfterFirstUpdate(callback: () => void, dependencies: any[]) {
  const hasUpdated = useRef(false)

  useEffect(() => {
    if (hasUpdated.current) {
      callback()
    } else {
      hasUpdated.current = true
    }
  }, dependencies)
}

export default useEffectAfterFirstUpdate
