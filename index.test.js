import test from 'ava'
import {
  openElectron,
  closeBrowser,
  getTabs,
  findElement
} from 'puppet-strings'

test('shows "Hello World!"', async t => {
  const electron = await openElectron('.', { flags: ['-r', '@babel/register'] })
  const [browserWindow] = await getTabs(electron)

  const div = await findElement(browserWindow, 'div')
  t.is(div.innerText, 'Hello World!')

  await closeBrowser(electron)
  t.pass()
})
