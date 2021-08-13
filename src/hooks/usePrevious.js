import * as React from 'react'

export const usePrevious = value => {
  const previousRef = React.useRef(value)

  React.useEffect(() => {
    previousRef.current = value
  }, [value])

  return previousRef.current
}
