/* eslint-disable quotes */
import * as React from 'react'
import PropTypes from 'prop-types'

// import { useLogRender } from '../hooks/useLogRender'
import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

import { ClickCounter } from './ClickCounter'
import {
  DumbComponent,
  MemoizedDumbComponent,
  MemoizedDumbComponentWithObjectProps,
} from './DumbComponent'

const COMPONENT_NAME = 'Button'

export const Button = ({ children }) => {
  const [clicks, setClicks] = React.useState(0)

  // If we don't memoized this, it'll create this object on each re-render of
  // the `Button` component (might be expensive if it renders a lot);
  // This is why we don't have to memoize simple strings, numbers or booleans:
  // Primitive values are stored in the stack rather than in the heap
  // (which might be faster -- static memory allocation vs dynamic memory allocation)
  // Keep in mind that `useMemo` should be used carefully -- see the `CorrectUsages` component
  // for more details about its pitfalls
  const memoizedDumbComponentProps = React.useMemo(
    () => ({
      text: "Memoized object prop key 'text'",
    }),
    []
  )

  const someMemoizedObject = React.useMemo(
    () => ({
      text: "Memoized object with prop key 'text'",
    }),
    []
  )

  const dumbComponentProps = {
    text: "Non-memoized object prop key 'text'",
  }

  const someObject = {
    text: "Non-memoized object with prop key 'text'",
  }

  // `eslint-plugin-react-hooks` will complain if an arrow function is passed
  // as props directly, as it'll cause reconciliation issues
  // so we have to wrap this around an `useCallback` hook
  const onClick = React.useCallback(() => setClicks(prev => prev + 1), [])

  // useLogRender(COMPONENT_NAME)
  useWhyDidYouRender(COMPONENT_NAME, { clicks, children })

  return (
    <>
      <button type="button" onClick={onClick}>
        <span>{children}</span>
      </button>{' '}
      <ClickCounter clicks={clicks} /> <br /> <br />
      <hr />
      {/*
        This renders again unless we wrap it around React.memo,
        like the `MemoizedDumbComponent` down there 👇
      */}
      <span>
        The component below is not memoized, and it&apos;s receiving a{' '}
        <code>text=&quot;text&quot;</code> prop
      </span>
      <DumbComponent
        componentName="DumbComponent | Primite value"
        text="Primitive value prop"
      />
      <hr />
      <span>
        The component below is memoized, but it&apos;s receiving a{' '}
        <code>{'text={dumbComponentProps.text}'}</code> prop, which is not
        memoized by <code>useMemo</code>
      </span>
      <MemoizedDumbComponent
        componentName="DumbComponent | Primite value as an object key"
        text={dumbComponentProps.text}
      />
      <hr />
      <span>
        The component below is memoized and it&apos;s receiving a{' '}
        <code>{'text={memoizedDumbComponentProps.text}'}</code> prop, which is
        memoized by <code>useMemo</code>
      </span>
      <MemoizedDumbComponent
        componentName="MemoizedDumbComponent | Primitive value as an object key (object is memoized)"
        text={memoizedDumbComponentProps.text}
      />
      <hr />
      <span>
        The component below is memoized and it&apos;s receiving a{' '}
        <code>{'someObject={someObject}'}</code> prop, which is not memoized by{' '}
        <code>useMemo</code>
      </span>
      <MemoizedDumbComponentWithObjectProps
        componentName="MemoizedDumbComponentWithObjectProps | Non-memoized object"
        someObject={someObject}
      />
      <hr />
      <span>
        The component below is memoized and it&apos;s receiving a{' '}
        <code>{'someObject={someMemoizedObject}'}</code> prop, which is memoized
        by <code>useMemo</code>
      </span>
      <MemoizedDumbComponentWithObjectProps
        componentName="MemoizedDumbComponentWithObjectProps | Memoized object"
        someObject={someMemoizedObject}
      />
    </>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}
