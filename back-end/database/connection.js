const Knex = require('knex')
const databaseConfig = require('./knexfile')

const databaseConnection = Knex(databaseConfig)

module.exports = { databaseConnection }
