import { Model } from 'sequelize'

export default class BudgetLimit extends Model {
  public limitId!: string
  public budgetId!: string
  public categoryId!: string
  public goalId?: string
  public userId!: string
}

export const createLimit = async (
  limit: Pick<BudgetLimit, 'budgetId' | 'categoryId' | 'goalId' | 'userId'>
) => {
  return await BudgetLimit.create({
    budgetId: limit.budgetId,
    categoryId: limit.categoryId,
    goalId: limit.goalId,
    userId: limit.userId,
  })
}
