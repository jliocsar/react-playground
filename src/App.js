import * as React from 'react'

import { Button } from './components/Button'
// import { CorrectUsages } from './components/CorrectUsages'
import './styles/global.css'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <span>
          All components below use an <code>useWhyDidYouRender</code> hook{' '}
          <br />
          Every <code>DumbComponent</code> is being called inside the{' '}
          <code>{'<Button />'}</code> component, meaning that each click on the
          button will trigger a parent component re-render
        </span>{' '}
        <br />
        <br />
        <Button>Click me</Button> <br />
        {/* <CorrectUsages /> */}
      </header>
    </div>
  )
}

export default App
