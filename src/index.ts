/* eslint-disable import/first */
require('dotenv').config()

import Express, { json } from 'express'
import sequelizeConnection from './db/config'
import Budget from './models/Budget'
import { Map } from './models/Map'
import { router as BudgetLimitRouter } from './routes/budgetlimits'

Map(sequelizeConnection)

const app = Express()
app.use(json())
app.use(BudgetLimitRouter)

app.get('/', (request, response) => {
  const testMessage = process.env.TEST_MESSAGE
  response.send(testMessage)
})

app.get('/budgets', async (request, response) => {
  const results = await Budget.findAll({ include: ['limits'] })

  response.status(200).json({ success: true, data: results })
})

if (process.env.PORT !== undefined) {
  app.listen(process.env.PORT, () => {
    console.debug('Listening @ localhost:3000')
  })
} else {
  app.listen(3000, () => console.debug('Listening @ localhost:3000'))
}
