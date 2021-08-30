import * as React from 'react'
import PropTypes from 'prop-types'

// import { useLogRender } from '../hooks/useLogRender'
import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

export const MemoizedDumbComponent = React.memo(function MemoizedDumbComponent({
  componentName,
  text,
}) {
  // useLogRender(MEMOIZED_COMPONENT_NAME)
  useWhyDidYouRender(componentName, { text })

  return (
    <>
      <h1>Hello, I&apos;m a dumb component and this is my text: {text}</h1>
    </>
  )
})

export const MemoizedDumbComponentWithObjectProps = React.memo(
  function MemoizedDumbComponentWithObjectProps({
    componentName,
    someObject: { text },
  }) {
    // useLogRender(MEMOIZED_COMPONENT_NAME)
    useWhyDidYouRender(componentName, { text })

    return (
      <>
        <h1>Hello, I&apos;m a dumb component and this is my text: {text}</h1>
      </>
    )
  }
)

// This component renders whenever you click the `Button` component
// (even though the props won't change),
// so we have to wrap it around React.memo (`MemoizedDumbComponent` 👆).
// This means that we're memoizing the component props and
// shallowly comparing it on each re-render of its parent component
export const DumbComponent = ({ componentName, text }) => {
  // useLogRender(COMPONENT_NAME)
  useWhyDidYouRender(componentName, { text })

  return (
    <>
      <h1>Hello, I&apos;m a dumb component and this is my text: {text}</h1>
    </>
  )
}

MemoizedDumbComponent.propTypes = {
  componentName: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
}

MemoizedDumbComponentWithObjectProps.propTypes = {
  componentName: PropTypes.string.isRequired,
  someObject: PropTypes.shape({
    text: PropTypes.node.isRequired,
  }),
}

DumbComponent.propTypes = {
  componentName: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
}
