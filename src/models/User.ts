import { Model } from 'sequelize'

export default class User extends Model {
  public id!: string
  public categoryId!: string
  public budgetId!: string
  public goalId!: string
}
