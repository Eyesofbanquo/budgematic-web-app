/* eslint-disable import/first */
require('dotenv').config()

import { expect } from 'chai'
import 'mocha'
import { Sequelize } from 'sequelize'
import * as sinon from 'sinon'
import User from '../models/User'
import sequelizeConnection from '../db/config'
import { Map } from '../models/Map'
import Budget from '../models/Budget'
import BudgetLimit from '../models/BudgetLimit'
import Source from '../models/Source'
import Goal from '../models/Goal'
import { uuid } from 'uuidv4'

describe('This', () => {
  describe('Should', () => {
    it('always pass', () => {
      expect(true).to.equal(true)
    })
  })
})

if (process.env.NODE_ENV === 'test') {
  describe('CI test', () => {
    before(async () => {
      await Map(sequelizeConnection)
    })

    describe('Build CD tables', () => {
      it('should build ci tables and test user', async () => {
        const deviceId = uuid()
        await User.create({ deviceId }).then(user => {
          expect(user.deviceId).to.equal(deviceId)
        })
      })
    })
  })
}

describe('Database init', () => {
  let mSequelize
  let mUser: sinon.SinonMock
  let mBudget: sinon.SinonMock
  let mLimit: sinon.SinonMock
  let mGoal: sinon.SinonMock
  let mSource: sinon.SinonMock
  beforeEach(() => {
    mSequelize = sinon.mock(Sequelize)
    mUser = sinon.mock(User)
    mBudget = sinon.mock(Budget)
    mLimit = sinon.mock(BudgetLimit)
    mGoal = sinon.mock(Source)
    mSource = sinon.mock(Goal)
  })
  afterEach(() => {
    mSequelize.restore()
    mUser.restore()
    mBudget.restore()
    mLimit.restore()
    mGoal.restore()
    mSource.restore()
  })
  describe('initialization', () => {
    it('should init db', () => {
      mUser.expects('init').once()
      mBudget.expects('init').once()
      mLimit.expects('init').once()
      mGoal.expects('init').once()
      mSource.expects('init').once()

      Map(sequelizeConnection).then()

      mUser.verify()
      mBudget.verify()
      mLimit.verify()
      mGoal.verify()
      mSource.verify()
    })
  })
})
