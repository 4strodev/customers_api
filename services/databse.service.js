const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    databse: process.env.MYSQL_DATABASE
})

module.exports = pool;