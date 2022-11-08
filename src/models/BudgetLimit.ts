import { Model, Sequelize, DataTypes } from 'sequelize'

export default class BudgetLimit extends Model {
  public id!: string
  public categoryId!: string
  public budgetId!: string
  public goalId!: string
}

export const BudgetLimitMap = (sequelize: Sequelize) => {
  BudgetLimit.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.UUID,
      },
      budgetId: {
        type: DataTypes.UUID,
      },
      goalId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      tableName: 'budget_limits',
      timestamps: false,
    }
  )
  BudgetLimit.sync()
}
