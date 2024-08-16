const { Pool } = require('pg')

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: '93866080',
    port: '5432',
})

module.exports = pool
