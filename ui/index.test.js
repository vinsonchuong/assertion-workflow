import test from 'ava'
import { withDOM } from '../test/fixtures'
import render from './'

withDOM(test)

test('rendering the React app', t => {
  const container = document.createElement('div')
  render(container)
  t.is(container.querySelector('button').textContent, 'Submit')
})
