import { Sequelize, Model, DataTypes, BelongsTo } from 'sequelize'
import { database } from '..'
import exp from 'constants'
import CollectionModel from './CollectionModel'

class PageModel extends Model {}
PageModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    collectionId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    sequelize: database,
    modelName: 'page'
  }
)
export default PageModel
