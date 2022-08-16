const mysql = require('mysql2'); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'olly123',
    database: 'employees_db'
});

connection.connect(function (err) {
    if (err) throw err;
    connectionMessage();
});

module.exports = connection; 