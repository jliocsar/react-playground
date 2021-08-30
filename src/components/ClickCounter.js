import * as React from 'react'
import PropTypes from 'prop-types'

// import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

// const COMPONENT_NAME = 'ClickCounter'

export const ClickCounter = React.memo(function ClickCounter({ clicks }) {
  // useWhyDidYouRender(COMPONENT_NAME, { clicks })

  return <span>Clicks: {clicks}</span>
})

ClickCounter.propTypes = {
  clicks: PropTypes.number,
}
