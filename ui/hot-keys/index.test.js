import test from 'ava'
import td from 'testdouble'
import * as React from 'react'
import { render } from 'react-dom'
import { withDOM } from '../../test/fixtures'
import HotKeys from './'

withDOM(test)

test('calling a callback whenever a user presses a key combination', t => {
  const onHotKey = td.func()

  const container = document.createElement('div')
  render(<HotKeys onHotKey={onHotKey} />, container)

  dispatchKeydown({ key: 'a' })
  td.verify(onHotKey('a'))

  dispatchKeydown({ key: 'v', ctrlKey: true })
  td.verify(onHotKey('ctrl-v'))

  dispatchKeydown({ key: 'a', ctrlKey: true })
  td.verify(onHotKey('ctrl-a'))

  dispatchKeydown({ key: 'k', altKey: true })
  td.verify(onHotKey('alt-k'))

  dispatchKeydown({ key: 'p', ctrlKey: true, altKey: true })
  td.verify(onHotKey('ctrl-alt-p'))

  dispatchKeydown({ key: 'j', ctrlKey: true, altKey: true, metaKey: true })
  td.verify(onHotKey('ctrl-alt-meta-j'))

  t.pass()
})

test('cleaning up the event handler when unmounting', t => {
  const onHotKey = td.func()

  const container = document.createElement('div')
  render(<HotKeys onHotKey={onHotKey} />, container)

  render(<div />, container)

  dispatchKeydown({ key: 'a' })
  td.verify(onHotKey('a'), { times: 0 })

  t.pass()
})

function dispatchKeydown(config) {
  document.dispatchEvent(new window.KeyboardEvent('keydown', config))
}
