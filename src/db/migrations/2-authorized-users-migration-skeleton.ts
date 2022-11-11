import { QueryInterface, Sequelize } from 'sequelize'

const tableName = 'budgets'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    // logic for transforming into the new state
    return await queryInterface.sequelize.query(
      `ALTER TABLE ${tableName} ADD COLUMN authorizedUsers UUID[]`
    )
  },
  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    // logic for reverting the changes
    return await queryInterface.sequelize.query(
      `ALTER TABLE ${tableName} DROP COLUMN authorizedUsers`
    )
  },
}
