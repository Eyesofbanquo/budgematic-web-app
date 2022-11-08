import { Model } from 'sequelize'

export default class Source extends Model {
  public id!: string
  public categoryId!: string
  public budgetId!: string
  public goalId!: string
}
