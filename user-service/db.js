const { Pool } = require('pg');

const pool = new Pool({
    user: 'microservice_user',
    host: 'localhost',
    database: 'user_service_db',
    password: 'strongpassword',
    port: 5432,
});

module.exports = pool;

