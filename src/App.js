import * as React from 'react'

import { Button } from './components/Button'
import { CorrectUsages } from './components/CorrectUsages'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Click me</Button> <br />
        <CorrectUsages />
      </header>
    </div>
  )
}

export default App
