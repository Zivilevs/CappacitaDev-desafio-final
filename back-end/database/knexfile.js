
require('dotenv').config();
// .config({path: patth-to-.env, if not the same dir})


module.exports = {
  client: 'mysql2',
  connection: {
    host : `127.0.0.1`,
    user : 'root',
    password : process.env.MYSQLKEY,
    database : 'genresZVS',
    port : '3306',
    },
    debug: false,
  } 