import * as React from 'react'
import PropTypes from 'prop-types'

import { useLogRender } from '../hooks/useLogRender'
import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

const COMPONENT_NAME = 'ClickCounter'

export const ClickCounter = React.memo(function ClickCounter({ clicks }) {
  useLogRender(COMPONENT_NAME)
  useWhyDidYouRender(COMPONENT_NAME, { clicks })

  return <span>Clicks: {clicks}</span>
})

ClickCounter.propTypes = {
  clicks: PropTypes.number,
}
