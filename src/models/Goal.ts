import { Model } from 'sequelize'

export default class Goal extends Model {
  public id!: string
  public date!: Date
  public name!: string
  public limitId!: string
  public userId!: string
}
