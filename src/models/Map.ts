import { Sequelize, DataTypes } from 'sequelize'
import Budget from './Budget'
import { uuidv4 } from 'uuid'
import BudgetLimit from './BudgetLimit'
import User from './User'

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
      // userId: {
      //   type: DataTypes.UUID,
      // },
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

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      deviceId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'users',
      timestamps: false,
    }
  )

  Budget.beforeCreate(users => {
    users.id = uuidv4()
  })

  Budget.beforeCreate(budget => {
    budget.id = uuidv4()
  })

  BudgetLimit.beforeCreate(limit => {
    limit.limitId = uuidv4()
  })

  /* Create associations */
  User.hasMany(Budget, { foreignKey: 'userId' }) // user knows what budget it has by relating to budget's id
  Budget.belongsTo(User, { foreignKey: 'userId', as: 'users' })

  BudgetLimit.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  /* Add budget - budgetlimit relationship */
  Budget.hasMany(BudgetLimit, { foreignKey: 'budgetId' })
  BudgetLimit.belongsTo(Budget, { foreignKey: 'budgetId', as: 'limits' })

  Budget.sync()
  User.sync()
  BudgetLimit.sync()
}
