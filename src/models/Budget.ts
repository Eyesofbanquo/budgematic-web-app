import { Model } from 'sequelize'

export default class Budget extends Model {
  public id!: string
  public date!: Date
}
