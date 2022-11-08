import { Model } from 'sequelize'

export default class Source extends Model {
  public id!: string
  public amount!: number
  public date!: Date
  public type!: string
  public budgetId!: string
  public userId!: string
}
