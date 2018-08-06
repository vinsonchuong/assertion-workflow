import { app, BrowserWindow } from 'electron'

app.on('ready', () => {
  const window = new BrowserWindow()
  window.loadFile('index.html')
})
