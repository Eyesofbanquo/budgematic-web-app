import { Sequelize, DataTypes } from 'sequelize'
import Budget from './Budget'
import { uuidv4 } from 'uuid'
import BudgetLimit from './BudgetLimit'

export const Map = (sequelize: Sequelize) => {
  BudgetLimit.init(
    {
      limitId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      budgetId: {
        type: DataTypes.UUID,
      },
      categoryId: {
        type: DataTypes.UUID,
      },
      goalId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: 'limit',
      tableName: 'budget_limits',
      timestamps: false,
    }
  )

  Budget.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      limitId: {
        type: DataTypes.UUID,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'budget',
      tableName: 'budgets',
      timestamps: false,
    }
  )

  Budget.beforeCreate(budget => {
    budget.id = uuidv4()
  })

  BudgetLimit.beforeCreate(limit => {
    limit.limitId = uuidv4()
  })

  Budget.hasMany(BudgetLimit, { foreignKey: 'budgetId' })
  BudgetLimit.belongsTo(Budget, { foreignKey: 'budgetId', as: 'limits' })

  BudgetLimit.sync()
  Budget.sync()
}
