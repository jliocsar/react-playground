import * as React from 'react'
import PropTypes from 'prop-types'

import { useLogRender } from '../hooks/useLogRender'
import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

import { ClickCounter } from './ClickCounter'
import { DumbComponent, MemoizedDumbComponent } from './DumbComponent'

const COMPONENT_NAME = 'Button'

export const Button = React.memo(function Button({ children }) {
  const [clicks, setClicks] = React.useState(0)

  // If we don't memoized this, it'll create this object on each re-render of
  // the `Button` component (might be expensive if it renders a lot);
  // This is why we don't have to memoize simple strings, numbers or booleans:
  // Primitive values are stored in the stack rather than in the heap
  // (which might be faster -- static memory allocation vs dynamic memory allocation)
  // Keep in mind that `useMemo` should be used carefully -- see the `CorrectUsages` component
  // for more details about its pitfalls
  const dumbComponentProps = React.useMemo(
    () =>
      console.log(COMPONENT_NAME, '(calculated the text object again)') ?? {
        text: 'Some random text',
      },
    []
  )

  // `eslint-plugin-react-hooks` will complain if an arrow function is passed
  // as props directly, as it'll cause reconciliation issues
  // so we have to wrap this around an `useCallback` hook
  const onClick = React.useCallback(() => setClicks(prev => prev + 1), [])

  useLogRender(COMPONENT_NAME)
  useWhyDidYouRender(COMPONENT_NAME, { clicks, children })

  return (
    <>
      <button type="button" onClick={onClick}>
        <span>{children}</span>
      </button>{' '}
      <ClickCounter clicks={clicks} />
      {/*
        This renders again unless we wrap it around React.memo,
        like the `MemoizedDumbComponent` down there 👇
      */}
      <DumbComponent text={dumbComponentProps.text} />
      <MemoizedDumbComponent text={dumbComponentProps.text} />
    </>
  )
})

Button.propTypes = {
  children: PropTypes.node.isRequired,
}
