import { useRef, useEffect } from 'react'

export default function usePrevious(value) {
  console.log('usePrevious', value)
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
