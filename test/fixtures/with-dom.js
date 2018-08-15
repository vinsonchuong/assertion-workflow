import { JSDOM } from 'jsdom'

export default function(test) {
  test.before(() => {
    const { window } = new JSDOM('<!doctype html><div id="container"></div>')
    global.window = window
    global.document = window.document
    global.navigator = window.navigator
    global.requestAnimationFrame = setImmediate
  })

  test.after(() => {
    Reflect.deleteProperty(global, 'window')
    Reflect.deleteProperty(global, 'document')
    Reflect.deleteProperty(global, 'navigator')
    Reflect.deleteProperty(global, 'requestAnimationFrame')
  })
}
