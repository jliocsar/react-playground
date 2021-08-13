import React from 'react'
import * as R from 'ramda'

import { getEntriesList } from '../utils/helpers'

import { usePrevious } from './usePrevious'

export const useWhyDidYouRender = (component, props) => {
  const previousProps = usePrevious(props)

  React.useEffect(() => {
    const [difference] = R.difference(
      getEntriesList(props),
      getEntriesList(previousProps)
    )

    if (difference) {
      const label = `${component} (props difference)`
      console.group(label)
      console.log({
        difference,
        previousProps,
        props,
      })
      console.groupEnd(label)
    }
  }, [previousProps, component, props])
}
