const mysql = require('mysql2');
const connexion = mysql.create({
    host:'localhost',
    user:'root',
    password:'Motdepasse123!',
    database: 'eval_back',
    namedPlaceholders: true
});

module.exports = connexion;