const mysql2=require('mysql2');
const { createConnection } = require('mysql2');
const database = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'galletas_y_hojaldres',
});
module.exports=database