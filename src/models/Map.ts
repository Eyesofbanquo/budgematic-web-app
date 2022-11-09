import { Sequelize, DataTypes } from 'sequelize'
import Budget from './Budget'
import { uuid } from 'uuidv4'
import BudgetLimit from './BudgetLimit'
import User from './User'
import Goal from './Goal'
import Source from './Source'

export const Map = async (sequelize: Sequelize) => {
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
        type: DataTypes.STRING,
      },
      goalId: {
        type: DataTypes.UUID,
      },
      userId: {
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
      userId: {
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

  Goal.init(
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
      limitId: {
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: 'goal',
      tableName: 'goals',
      timestamps: false,
    }
  )

  Source.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DOUBLE,
      },
      date: {
        type: DataTypes.DATE,
      },
      type: {
        type: DataTypes.STRING,
      },
      budgetId: {
        type: DataTypes.UUID,
      },
      userId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: 'source',
      tableName: 'sources',
      timestamps: false,
    }
  )

  User.beforeCreate(item => {
    item.id = uuid()
  })

  Budget.beforeCreate(item => {
    item.id = uuid()
  })

  Goal.beforeCreate(item => {
    item.id = uuid()
  })

  Source.beforeCreate(item => {
    item.id = uuid()
  })

  BudgetLimit.beforeCreate(item => {
    item.limitId = uuid()
  })

  await Budget.sync()
  await User.sync()
  await BudgetLimit.sync()
  await Goal.sync()
  await Source.sync()

  /* Create associations */
  User.hasMany(Budget, { foreignKey: 'userId' }) // user knows what budget it has by relating to budget's id
  Budget.belongsTo(User, { foreignKey: 'userId', as: 'users' })

  BudgetLimit.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  Source.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  Goal.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  BudgetLimit.hasOne(Goal, { foreignKey: 'limitId', as: 'goal' })
  Goal.belongsTo(BudgetLimit, { foreignKey: 'limitId', as: 'limit' })

  Budget.hasMany(Source, { foreignKey: 'budgetId', as: 'sources' })
  Source.belongsTo(Budget, { foreignKey: 'budgetId', as: 'budget' })

  /* Add budget - budgetlimit relationship */
  Budget.hasMany(BudgetLimit, { foreignKey: 'budgetId', as: 'limits' })
  BudgetLimit.belongsTo(Budget, { foreignKey: 'budgetId', as: 'budget' })
}
