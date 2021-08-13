import * as React from 'react'

export const useComponentMount = () => {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return {
    isFirstMount: !hasMounted,
    hasMounted,
  }
}
