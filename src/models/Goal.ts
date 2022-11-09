import { Model } from 'sequelize'

export default class Goal extends Model {
  public id!: string
  public date!: string
  public name?: string
  public limitId!: string
  public userId!: string
}

export const createGoal = async (
  goal: Pick<Goal, 'date' | 'name' | 'limitId' | 'userId'>
) => {
  return await Goal.create({
    date: goal.date,
    limitId: goal.limitId,
    userId: goal.userId,
  })
}
