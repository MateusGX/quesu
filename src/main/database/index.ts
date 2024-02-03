import sqlite3 from 'better-sqlite3'
import { APP_DATA_PATH } from '../file'
import path from 'path'

const db = sqlite3(path.join(APP_DATA_PATH, 'database.db'), {
  verbose: console.log
})
