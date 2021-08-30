import * as React from 'react'

export const useMemoCompare = (next, compare) => {
  const previousRef = React.useRef(next)
  const previous = previousRef.current

  const isEqual = React.useMemo(
    () => compare?.(previous, next) ?? Object.is(previous, next),
    [compare, next, previous]
  )

  React.useEffect(() => {
    if (!isEqual) {
      previousRef.current = next
    }
  })

  return isEqual ? previous : next
}
