import { Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME ?? ''
const dbUser = process.env.DB_USER ?? ''
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

console.log(`${dbName} - name`)
console.log(`${dbUser} - name`)

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
})

export default sequelizeConnection
