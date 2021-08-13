import * as React from 'react'

import { useComponentMount } from '../hooks/useComponentMount'

export const useLogRender = component => {
  const { isFirstMount } = useComponentMount()

  React.useEffect(() => {
    const label = `${component} (rendered)`
    console.group(label)
    if (isFirstMount) {
      console.log({ isFirstMount })
    }
    console.groupEnd(label)
  })
}
