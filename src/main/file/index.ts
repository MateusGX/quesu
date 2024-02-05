import { app } from 'electron'
import fs from 'fs'
import path from 'path'

export const APP_DATA_PATH = path.join(app.getPath('userData'), 'app-data')
export const APP_PAGES_PATH = path.join(APP_DATA_PATH, 'pages')

export const initializePaths = () => {
  console.log('Initializing paths')
  console.log(APP_DATA_PATH)
  console.log(APP_PAGES_PATH)
  if (!fs.existsSync(APP_DATA_PATH)) {
    fs.mkdirSync(APP_DATA_PATH)
  }
  if (!fs.existsSync(APP_PAGES_PATH)) {
    fs.mkdirSync(APP_PAGES_PATH)
  }
}
