import { Router, json } from 'express'
import BudgetLimit from '../models/BudgetLimit'

export const router = Router()
router.use(json())

router.get('/limits', async (request, response) => {
  const result = await BudgetLimit.findAll({
    attributes: ['limitId', 'categoryId'],
    include: ['budget', 'user', 'goal'],
  })

  /* fetch category using id */
  /* fetch budget using id */
  /* fetch goal using id if available */
  response.status(200).json({ success: true, data: result })
})

router.get('/limits/:id', async (request, response) => {
  response.status(200).json({ success: true, data: 'Found me' })
})
