import { Model } from 'sequelize'

export default class BudgetLimit extends Model {
  public limitId!: string
  public budgetId!: string
  public categoryId!: string
  public goalId!: string
  public userId!: string
}
