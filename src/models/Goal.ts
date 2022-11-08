import { Model } from 'sequelize'

export default class Goal extends Model {
  public id!: string
  public categoryId!: string
  public budgetId!: string
  public goalId!: string
}
