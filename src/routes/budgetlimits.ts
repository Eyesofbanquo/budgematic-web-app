import { Router, json } from 'express'
import sequelizeConnection from '../db/config'
import BudgetLimit, { BudgetLimitMap } from '../models/BudgetLimit'

export const router = Router()
router.use(json())

BudgetLimitMap(sequelizeConnection)

router.get('/limits', async (request, response) => {
  const result = await BudgetLimit.findAll()

  /* fetch category using id */
  /* fetch budget using id */
  /* fetch goal using id if available */
  response.status(200).json({ success: true, data: result })
})

router.get('/limits/:id', async (request, response) => {
  response.status(200).json({ success: true, data: 'Found me' })
})
