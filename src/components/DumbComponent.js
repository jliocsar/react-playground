import * as React from 'react'
import PropTypes from 'prop-types'

import { useLogRender } from '../hooks/useLogRender'
import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

const MEMOIZED_COMPONENT_NAME = 'MemoizedDumbComponent'
const COMPONENT_NAME = 'DumbComponent'

export const MemoizedDumbComponent = React.memo(function MemoizedDumbComponent({
  text,
}) {
  useLogRender(MEMOIZED_COMPONENT_NAME)
  useWhyDidYouRender(MEMOIZED_COMPONENT_NAME, { text })

  return (
    <>
      <h1>Hello, i&apos;m dumb</h1>
      <span>{text}</span>
    </>
  )
})

// This component renders whenever you click the `Button` component
// (even though the props won't change),
// so we have to wrap it around React.memo (`MemoizedDumbComponent` 👆).
// This means that we're memoizing the component props and
// shallowly comparing it on each re-render of its parent component
export const DumbComponent = ({ text }) => {
  useLogRender(COMPONENT_NAME)
  useWhyDidYouRender(COMPONENT_NAME, { text })

  return (
    <>
      <h1>Hello, i&apos;m dumb</h1>
      <span>{text}</span>
    </>
  )
}

MemoizedDumbComponent.propTypes = {
  text: PropTypes.node.isRequired,
}

DumbComponent.propTypes = {
  text: PropTypes.node.isRequired,
}
