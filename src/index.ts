/* eslint-disable import/first */
require('dotenv').config()

import Express, { json } from 'express'
import sequelizeConnection from './db/config'
import Article, { ArticleMap } from './models/Article'
import { router as BudgetLimitRouter } from './routes/budgetlimits'

const app = Express()
app.use(json())
app.use(BudgetLimitRouter)

app.get('/', (request, response) => {
  const testMessage = process.env.TEST_MESSAGE
  response.send(testMessage)
})

app.get('/articles', async (request, response) => {
  ArticleMap(sequelizeConnection)
  const result = await Article.findAll()
  response.status(200).json({ articles: result })
})

if (process.env.PORT !== undefined) {
  app.listen(process.env.PORT, () => {
    console.debug('Listening @ localhost:3000')
  })
} else {
  app.listen(3000, () => console.debug('Listening @ localhost:3000'))
}
