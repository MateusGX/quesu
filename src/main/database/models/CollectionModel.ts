import { Sequelize, Model, DataTypes, HasMany } from 'sequelize'
import { database } from '..'
import PageModel from './PageModel'

export class CollectionModel extends Model {}
CollectionModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: database,
    modelName: 'collection'
  }
)

export default CollectionModel
