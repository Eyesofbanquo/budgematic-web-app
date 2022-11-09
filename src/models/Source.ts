import { Model } from 'sequelize'

export default class Source extends Model {
  public id!: string
  public amount!: number
  public date!: string
  public type!: string
  public budgetId!: string
  public userId!: string
}

export const createSource = async (
  source: Pick<Source, 'amount' | 'date' | 'type' | 'budgetId' | 'userId'>
) => {
  await Source.create({
    amount: source.amount,
    date: source.date,
    type: source.type,
    budgetId: source.budgetId,
    userId: source.userId,
  })
}
