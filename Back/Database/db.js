const mysql = require('mysql2/promise');
const connexion = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Motdepasse123!',
    database: 'eval_back',
    namedPlaceholders: true
});

module.exports = connexion;