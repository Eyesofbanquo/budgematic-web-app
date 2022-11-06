import { Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST as string
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(
    "ktor_example", 
    "markimshaw", 
    "aE20400112!", {
    host: "localhost",
    dialect: "postgres"
})

export default sequelizeConnection