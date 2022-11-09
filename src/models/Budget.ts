import { Model } from 'sequelize'

export default class Budget extends Model {
  public id!: string
  public date!: string
  public userId!: string
}

export const createBudget = async (budget: Pick<Budget, 'date' | 'userId'>) => {
  return await Budget.create({ date: budget.date, userId: budget.userId })
}
