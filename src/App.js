import * as React from 'react'

import { Button } from './components/Button'
import { DumbComponent } from './components/DumbComponent'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Click me</Button>
        <DumbComponent />
      </header>
    </div>
  )
}

export default App
