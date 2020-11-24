import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.HOST
const port = process.env.PORT
const db = process.env.DATABASE
const user = process.env.USER
const password = process.env.PASSWORD

const connectionString = `mysql://${user}:${password}@${host}:${port}/${db}`

const sequelize = new Sequelize(connectionString)

export default sequelize