import * as React from 'react'
import PropTypes from 'prop-types'

import { useLogRender } from '../hooks/useLogRender'
import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

const COMPONENT_NAME = 'DumbComponent'

export const DumbComponent = React.memo(function DumbComponent({ text }) {
  useLogRender(COMPONENT_NAME)
  useWhyDidYouRender(COMPONENT_NAME, { text })

  return (
    <>
      <h1>Hello, i&apos;m dumb</h1>
      <span>{text}</span>
    </>
  )
})

DumbComponent.propTypes = {
  text: PropTypes.node.isRequired,
}
