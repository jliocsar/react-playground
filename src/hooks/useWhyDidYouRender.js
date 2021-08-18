import React from 'react'

import { usePrevious } from './usePrevious'

export const useWhyDidYouRender = (componentName, props) => {
  const previousProps = usePrevious(props)

  React.useEffect(() => {
    const difference = props !== previousProps

    if (difference) {
      const label = `${componentName} (props difference)`
      console.group(label)
      console.log({
        previousProps,
        props,
      })
      console.groupEnd(label)
    }
  }, [previousProps, componentName, props])
}
