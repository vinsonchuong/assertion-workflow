import { app, BrowserWindow } from 'electron'
import * as path from 'path'

app.on('ready', () => {
  const window = new BrowserWindow()
  window.loadFile(path.resolve(__dirname, 'index.html'))
})
