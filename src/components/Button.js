import * as React from 'react'
import PropTypes from 'prop-types'

// import { useLogRender } from '../hooks/useLogRender'
// import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

import { ClickCounter } from './ClickCounter'
import { DumbComponent } from './DumbComponent'

// const COMPONENT_NAME = 'Button'

export const Button = React.memo(function Button({ children }) {
  const [clicks, setClicks] = React.useState(0)

  const onClick = React.useCallback(() => setClicks(prev => prev + 1), [])

  // useLogRender(COMPONENT_NAME)
  // useWhyDidYouRender(COMPONENT_NAME, { clicks, children })

  return (
    <>
      <button type="button" onClick={onClick}>
        <span>{children}</span>
      </button>{' '}
      <ClickCounter clicks={clicks} />
      <DumbComponent text="Some random text" />
    </>
  )
})

Button.propTypes = {
  children: PropTypes.node.isRequired,
}
