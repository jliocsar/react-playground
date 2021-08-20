import * as React from 'react'

import { useWhyDidYouRender } from '../hooks/useWhyDidYouRender'

const COMPONENT_NAME = 'CorrectUsages'

export const CorrectUsages = () => {
  const [renders, setRenders] = React.useState(0)

  // `objectToPassAsProps` will be re-created on each re-render of the `CorrectUsages` component:
  // It doesn't matter because if we used `React.useMemo()`, 2 things would happen:
  //  * React would create a reference to:
  //    * the first argument (value returned by the function passed to `useMemo` as first argument)
  //    * the array of dependencies (second argument passed to `useMemo`)
  // ---
  // Besides that, memoization works with caching (which means that'll store both references for future comparison)
  // This impacts memory allocation (a lot) since it'll cache all the different dependencies and values,
  // so it can return a cached value given the same dependencies in the future;
  // The hook `useMemo` (and `memo()`) was created to work with references, meaning that if we have a parent component
  // passing an object as props to the child (which can be updated by an `useEffect`, for example) can will be used
  // for an expensive calculation, it might be worth to store that reference in the dependencies array of the `useMemo`,
  // so it uses the previous references everytime they're passed again.
  // This also means that a value that's not memoized will be garbage collected in the next re-render, which might
  // be a good thing in certain cases (e.g. an object that might be `null` depending on a certain condition)
  // https://kentcdodds.com/blog/usememo-and-usecallback
  // ---
  // "Write your code so that it still works without useMemo — and then add it to optimize performance."
  // https://reactjs.org/docs/hooks-reference.html#usememo
  // TODO: Check more about reconciliation and how it affects cases like this one 👇
  // (if this was passed as props to another component in here)
  const objectToPassAsProps = {
    a: 10,
    b: 20,
    c: 30,
  }

  // A perfect use case of `useMemo` would be for expensive calculations, for example:
  //  const filteredAndSortedAndSlicedList = React.useMemo(() =>
  //    props.list.filter().sort().slice()
  // , [props])
  // This way we're avoiding to re-do the whole filtering/sorting/slicing on each re-render,
  // meaning that'll only re-calculate when the dependencies array change
  // (that's why it's better to write everything without `useMemo` first, and then pass it where it's really necessary)

  React.useEffect(() => {
    // Many times you'll see an `eslint-disable-next-line` before an `useEffect` deps array
    // to run the hook only in the component's first render
    // (so we can pass an empty array without caring about deps)
    // This is due to the fact that many times we have to check for a state and update it inside
    // the same `useEffect`, meaning that we'll have to pass that state to the deps array of the `useEffect`
    // (which will cause an infinite render loop 🐛)
    // This is where using the arrow function syntax on the setter for the state is great!
    setRenders(prev => {
      // If we have to use a state inside an `useEffect` without updating it, that means we can pass it
      // to the deps array without a problem; if we have to use it to check some condition before dispatching
      // a Redux action or calling an API while updating the state, we can do that in here 😄
      if (prev < 1) {
        return prev + 1
      }
    })
    // If we still need to dispatch an action that its result might set a state that's used in here,
    // we might be able to change that inside an `useMemo` or `useCallback` without needing an `useEffect`
    // (just need to pass such state in the deps array of the hook used)

    // Don't have to pass any deps here, and this `useEffect` will now only run in the component's first render
  }, [])

  useWhyDidYouRender(COMPONENT_NAME, { objectToPassAsProps })

  return (
    <>
      <span>Renders: {renders}</span> <br />
      <code>objectToPassAsProps: {JSON.stringify(objectToPassAsProps)}</code>
    </>
  )
}
