import * as React from 'react'
import PropTypes from 'prop-types'

import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

const COMPONENT_NAME = 'Counter'

export const Counter = ({ value }) => {
  useWhyDidYouRender(COMPONENT_NAME, {})

  return <span>Counter value: {value}</span>
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
}
