import { Sequelize, Model, DataTypes } from 'sequelize'
import { APP_DATA_PATH } from '../file'
import path from 'path'

export const database = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(APP_DATA_PATH, 'database.sqlite')
})
