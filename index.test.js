import test from 'ava'
import {
  openElectron,
  closeBrowser,
  getTabs,
  findElement
} from 'puppet-strings'

test('showing a Submit button', async t => {
  const electron = await openElectron('.', { flags: ['-r', '@babel/register'] })
  const [browserWindow] = await getTabs(electron)

  const button = await findElement(browserWindow, 'button')
  t.is(button.innerText, 'Submit')

  await closeBrowser(electron)
  t.pass()
})
