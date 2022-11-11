/* eslint-disable import/first */
require('dotenv').config()

import Express, { json } from 'express'
import sequelizeConnection from './db/config'
import Budget, { createBudget } from './models/Budget'
import { Map } from './models/Map'
import User from './models/User'
import { uuid } from 'uuidv4'
import { router as BudgetLimitRouter } from './routes/budgetlimits'
import BudgetLimit, { createLimit } from './models/BudgetLimit'
import Source, { createSource } from './models/Source'
import Goal, { createGoal } from './models/Goal'

Map(sequelizeConnection).then()

console.log('Database intiialized...')

const app = Express()
app.use(json())
app.use(BudgetLimitRouter)

app.get('/', (request, response) => {
  const testMessage = process.env.TEST_MESSAGE
  response.send(testMessage)
})

app.get('/budgets', async (request, response) => {
  const results = await Budget.findAll({
    attributes: ['id', 'date'],
    include: ['limits', 'users', 'sources'],
  })

  response.status(200).json({ success: true, data: results })
})

app.get('/users', async (request, response) => {
  const results = await User.findAll({
    attributes: ['deviceId'],
    include: ['budgets'],
  })

  response.status(200).json({ success: true, data: results })
})

app.get('/limits', async (request, response) => {
  const results = await BudgetLimit.findAll({
    attributes: ['limitId', 'categoryId'],
    include: ['budget', 'user', 'goal'],
  })

  response.status(200).json({ success: true, data: results })
})

app.get('/sources', async (request, response) => {
  const results = await Source.findAll({
    attributes: ['id', 'amount', 'date', 'type'],
    include: ['budget', 'user'],
  })

  response.status(200).json({ success: true, data: results })
})

app.get('/goals', async (request, response) => {
  const results = await Goal.findAll({
    attributes: ['id', 'date', 'name'],
    include: ['limit', 'user'],
  })

  response.status(200).json({ success: true, data: results })
})

app.get('/build-test-database', async (request, response) => {
  const deviceId = uuid()
  /* Create users */
  await User.create({ deviceId }).then(async user => {
    /* Create budget */
    await createBudget({
      date: Date(),
      userId: user.id,
    }).then(async budget => {
      /* Create source */
      await createSource({
        amount: 500,
        type: 'income',
        date: Date(),
        budgetId: budget.id,
        userId: user.id,
      })
      /* Create limit */
      await createLimit({
        budgetId: budget.id,
        categoryId: 'numbers',
        goalId: undefined,
        userId: user.id,
      }).then(async limit => {
        await createGoal({
          date: Date(),
          userId: user.id,
          limitId: limit.limitId,
        })
      })
    })
  })
})

if (process.env.PORT !== undefined) {
  app.listen(process.env.PORT, () => {
    console.debug('Listening @ localhost:3000')
  })
} else {
  app.listen(3000, () => console.debug('Listening @ localhost:3000'))
}
