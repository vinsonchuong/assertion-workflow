import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Workflow from './workflow'

export default function(container) {
  const store = createStore((state, action) => state)

  render(
    <Provider store={store}>
      <Workflow />
    </Provider>,
    container
  )
}
